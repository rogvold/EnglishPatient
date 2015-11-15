/**
 * Created by sabir on 21.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var NotesGroupListItem = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            onGroupClick: function(){

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

    onClick: function(){
        this.props.onGroupClick();
    },

    componentStyle: {
        placeholder: {
            borderBottom: '1px solid #EFF0F1',
            width: '100%',
            //height: 60,
            padding: 10,
            cursor: 'pointer'
        },

        selected: {
            backgroundColor: '#2E3C54',
            color: 'white'
        },

        namePlaceholder:{
            display: 'block',
            width: '99%',
            //whiteSpace: 'nowrap',
            //overflow: 'hidden',
            //textOverflow: 'ellipsis',
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: 5
        },

        descriptionPlaceholder: {

        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder);
        if (this.props.selected == true){
            st = assign(st, this.componentStyle.selected);
        }

        return (
            <div style={st} onClick={this.onClick} >
                <div style={this.componentStyle.namePlaceholder}>
                    {this.props.name}
                </div>
            </div>
        );
    }

});

module.exports = NotesGroupListItem;