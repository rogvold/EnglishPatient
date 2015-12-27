/**
 * Created by sabir on 19.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogItem = require('./DialogItem');

var DialogsList = React.createClass({
    getDefaultProps: function () {
        return {
            dialogs: [],
            onItemClick: function(dialog){

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
            width: 850,
            padding: 5,
            margin: '0 auto',
            backgroundColor: 'white'
        }
    },


    onClick: function(dialog){
        this.props.onItemClick(dialog);
    },

    render: function (){

        var list = this.props.dialogs;

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(dialog, k){
                    var key = 'dialog_' + dialog.id + '_' + k;
                    var bClick = this.onClick.bind(this, dialog);
                    return (
                        <DialogItem dialog={dialog} key={key} onItemClick={bClick} />
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = DialogsList;