/**
 * Created by sabir on 28.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var IdiomsMixin = require('../../mixins/IdiomsMixin');

var CardsList = require('../material/list/CardsList');

var IdiomsPanel = React.createClass({
    getDefaultProps: function () {
        return {
            searchInputVisible: true
        }
    },

    getInitialState: function () {
        return {
            idioms: [],
            searchIdioms: [],
            loading: false,
            text: ''
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load(function(idioms){
            console.log('idioms loaded');
        });
    },

    load: function(callback){
        this.setState({
            loading: true
        });
        IdiomsMixin.loadIdioms(function(idioms){
            this.setState({
                loading: false,
                idioms: idioms,
                searchIdioms: idioms
            });
            callback(idioms);
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            margin: '0 auto',
            width: 782,
            marginTop: 10,
            paddingTop: 5,
            borderRadius: 4
        },

        idiomsPlaceholder: {

        },

        idiom: {
            padding: 5,
            paddingRight: 0,
            borderTop: '1px solid #EFF0F1'
        },

        idiomName: {
            fontWeight: 'bold',
            fontSize: 18,
            color: '#2E3C54'
        },

        idiomDescription: {
            marginTop: 15
        },

        idiomContent: {

        },

        left: {
            width: 535,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        right: {
            //width: 240,
            width: 230,
            marginLeft: 10,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        materialItemStyle: {
            width: 110,
            height: 80,
            marginLefT: 5,
            marginRight: 5,
            fontSize: 13
        },

        inputBlock: {
            paddingLeft: 5,
            paddingRight: 5,
            marginBottom: 10
        },

        topText: {
            padding: 10,
            marginBottom: 15
        }
    },

    search: function(text){
        if (text == undefined || text.trim() == ''){
            this.setState({
                searchIdioms: this.state.idioms,
                text: text
            });
            return;
        }
        var arr = [];
        var list = this.state.idioms;
        text = text.toLowerCase();
        for (var i in list){
            var w = list[i];
            if (w.name.toLowerCase().indexOf(text) > -1){
                arr.push(w);
            }
        }
        this.setState({
            searchIdioms: arr,
            text: text
        });
    },

    onTextChange: function(evt){
        var text = evt.target.value;
        if (text == undefined){
            text = '';
        }
        this.search(text);
    },

    render: function () {

        var list = this.state.searchIdioms;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.topText}>
                    Не удивляйтесь, встретив здесь фразовые глаголы,коллоквиализмы и т.д.
                    Мы решили не выделять их в отдельные категории. Материал доступен также по ссылке idiophrases.com и в Appstore (idiophrases).
                    Вы можете включать любые видео в упражнения для своих учеников.

                </div>


                {this.props.searchInputVisible == false ? null :
                    <div style={this.componentStyle.inputBlock}>
                        <div className={'ui form'} >
                            <div className="ui input">
                                <input type="text" placeholder={'Поиск ...'}
                                       value={this.state.text} onChange={this.onTextChange}  />
                            </div>
                        </div>
                    </div>
                }


                {list.length == 0 ?
                    <div style={{padding: 10}} >
                        По запросу "<b>{this.state.text}</b>" ничего не найдено
                    </div>
                    :
                    <div style={this.componentStyle.idiomsPlaceholder}>
                        {list.map(function(idiom, k){
                            var key = 'idiom_' + k + '_' + idiom.name;
                            var st = assign({}, this.componentStyle.idiom);
                            if (k == 0){
                                st = assign(st, {border: 'none'});
                            }
                            var materials = idiom.materials;

                            return (
                                <div style={st} key={key}>

                                    <div style={this.componentStyle.idiomName}>
                                        {idiom.name}
                                    </div>

                                    <div style={this.componentStyle.idiomContent}>

                                        <div style={this.componentStyle.left}>

                                            <div style={this.componentStyle.idiomDescription}>
                                                <div dangerouslySetInnerHTML={{__html: idiom.description}}></div>
                                            </div>

                                        </div>

                                        <div style={this.componentStyle.right}>

                                            <CardsList itemStyle={this.componentStyle.materialItemStyle} cards={materials} />

                                        </div>

                                    </div>

                                </div>
                            );

                        }, this)}
                    </div>
                }






                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = IdiomsPanel;