/**
 * Created by sabir on 06.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var ArticleMixin = require('../../mixins/ArticleMixin');

var SelfLoadingArticlePanel = React.createClass({
    getDefaultProps: function () {
        return {
            articleId: undefined
        }
    },

    getInitialState: function () {
        return {
            article: undefined,
            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            width: 625,
            backgroundColor: 'white',
            margin: '0 auto',
            minHeight: 100
        },

        main: {

        },

        content: {

        },

        name: {
            borderBottom: '1px solid #EFF0F1',
            marginBottom: 10,
            padding: 10,
            fontSize: 18,
            fontWeight: 'bold'
        },

        dateSpan: {

        }
    },

    load: function(){
        var id = this.props.articleId;
        if (id == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        ArticleMixin.loadArticle(id, function(a){
            this.setState({
                loading: false,
                article: a
            });
        }.bind(this));

    },

    render: function () {
        var a = this.state.article;

        return (
            <div style={this.componentStyle.placeholder}>

                {a == undefined ? null :
                    <div style={this.componentStyle.main}>

                        <div style={this.componentStyle.name}>
                            {a.name}
                        </div>

                        <div style={this.componentStyle.content} className={'patientArticle'} >
                            <div dangerouslySetInnerHTML={{__html: a.content}} ></div>
                        </div>

                    </div>
                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingArticlePanel;