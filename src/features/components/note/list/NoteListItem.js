/**
 * Created by sabir on 20.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var moment = require('moment');

var NoteListItem = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            timestamp: undefined,
            selected: false,
            onNoteClick: function(){

            }
        }
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            borderBottom: '1px solid #EFF0F1',
            padding: 5,
            width: '100%',
            height: 60,
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
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: 5
        },

        descriptionPlaceholder: {

        },

        datePlaceholder: {
            fontSize: '12px',
            opacity: 0.7
        }
    },

    onClick: function(){
        this.props.onNoteClick();
    },

    render: function () {
        var dateString = moment(this.props.timestamp).format('LLL');
        var st = assign({}, this.componentStyle.placeholder);
        if (this.props.selected == true){
            st = assign(st, this.componentStyle.selected);
        }

        return (
            <div style={st} onClick={this.onClick} className={'noteListItem'} >

                <div style={this.componentStyle.namePlaceholder}>
                    {this.props.name}
                </div>

                <div style={this.componentStyle.datePlaceholder}>
                    <b>{dateString}</b>
                </div>

            </div>
        );
    }

});

module.exports = NoteListItem;