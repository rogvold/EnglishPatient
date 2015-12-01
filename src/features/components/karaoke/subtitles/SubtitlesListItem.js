/**
 * Created by sabir on 01.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var TranslatableText = require('../../text/translatable/TranslatableText');

var SubtitlesListItem = React.createClass({
    getDefaultProps: function () {
        return {
            active: false,
            text: undefined,

            onItemClick: function(){

            }
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
            padding: 5,
            fontSize: 16,
            width: '100%',
            borderBottom: '1px solid #EFF0F1',
            overflowY: 'auto',
            cursor: 'pointer',
            paddingLeft: 20
        },

        active: {
            //color: 'white',
            //color: '#8897A3',
            color: 'whitesmoke',
            backgroundColor: '#2E3C54',
            fontWeight: 'bold'
        }
    },

    onClick: function(){
        this.props.onItemClick();
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder);
        if (this.props.active == true){
            assign(st, this.componentStyle.active);
            //console.log('ACTIVE: ' + this.props.text);
        }
        return (
            <div className={'subtitlesListItem'} style={st} onClick={this.onClick} >
                {this.props.text}
            </div>
        );
    }

});

module.exports = SubtitlesListItem;