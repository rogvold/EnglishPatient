/**
 * Created by sabir on 25.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var SoundItem = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'TH',
            description: 'th sound pronounciation',
            avatar: 'http://beta.englishpatient.org/img/pablo.jpg',
            style: {

            },
            onClick: function(){

            },
            selected: false
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            display: 'inline-block',
            borderRadius: '5px',
            border: '1px solid #EFF0F1',
            width: 70,
            height: 70,
            margin: 4,
            color: 'white',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            cursor: 'pointer',
            boxSizing: 'borderBox',
            backgroundColor: 'grey'
        },

        infoPlaceholder: {
            display: 'table',
            //position: 'absolute',
            width: '100%',
            height: '100%',
            textAlign: 'center'
        },

        namePlaceholder: {
            display: 'table-cell',
            verticalAlign: 'middle',
            fontSize: '32px'
        },

        descriptionPlaceholder: {

        },

        selected: {
            border: '3px solid #179DBA'
        }

    },


    onClick: function(){
        this.props.onClick();
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.style,  {backgroundImage: 'url(\'' + this.props.avatar + '\')'});

        if (this.props.selected == true){
            st = assign(st, this.componentStyle.selected);
        }

        return (
            <div style={st} onClick={this.onClick} >

                <div style={this.componentStyle.infoPlaceholder}  >

                    <div style={this.componentStyle.namePlaceholder}>

                        <div>
                            {this.props.name}
                        </div>

                        <div style={this.componentStyle.descriptionPlaceholder}>

                        </div>

                    </div>

                </div>
                

            </div>
        );
    }

});

module.exports = SoundItem;