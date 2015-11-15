/**
 * Created by sabir on 13.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var DeleteButton = require('../buttons/DeleteButton');

var UpdateTopicDialog = require('./dialog/UpdateTopicDialog');

var EditTopicButton = React.createClass({
    getDefaultProps: function () {
        return {

            topicId: undefined,
            teacherId: undefined,

            buttonName: 'редактировать',
            buttonIcon: 'icon pencil',
            buttonClassName: 'ui grey small inverted button',

            dialogLevel: 10,

            onTopicUpdated: function(topic){
                console.log('onTopicUpdated: ', topic);
            },

            onTopicDeleted: function(){
                console.log('EditTopicButton: default onTopicDeleted occured');
            }

        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onTopicUpdated: function(topic){
        this.setState({
            dialogVisible: false
        });
        this.props.onTopicUpdated(topic);
    },

    onEditClick: function(){
        this.setState({
            dialogVisible: true
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    onTopicDeleted: function(){
        console.log('EditTopicButton: onTopicDeleted occured');
        this.onClose();
        this.props.onTopicDeleted();
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
            //textAlign: 'left'
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <button className={this.props.buttonClassName} onClick={this.onEditClick} >
                    <i className={this.props.buttonIcon} ></i> {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <UpdateTopicDialog
                        dialogLevel={this.props.dialogLevel + 10000}
                        topicId={this.props.topicId}
                        teacherId={this.props.teacherId}
                        onTopicDeleted={this.onTopicDeleted}
                        onClose={this.onClose}
                        onTopicUpdated={this.onTopicUpdated} />
                }

            </div>
        );
    }

});

module.exports = EditTopicButton;