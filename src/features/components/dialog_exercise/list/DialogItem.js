/**
 * Created by sabir on 19.12.15.
 */

var React = require('react');
var assign = require('object-assign');
var DialogCard = require('../card/DialogCard');

var DialogItem = React.createClass({
    getDefaultProps: function () {
        return {
            dialog: {},
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
            margin: 5,
            display: 'inline-block'
        },

        cardPlaceholder: {
            width: 200,
            cursor: 'pointer',
            height: 150
        }
    },

    onClick: function(){
        this.props.onItemClick();
    },

    render: function () {
        var dialog = this.props.dialog;

        return (
            <div style={this.componentStyle.placeholder} onClick={this.onClick} >


                <div style={this.componentStyle.cardPlaceholder}>
                    <DialogCard avatar={dialog.avatar} name={dialog.name} />
                </div>


            </div>
        );
    }

});

module.exports = DialogItem;