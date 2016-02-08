/**
 * Created by sabir on 06.02.16.
 */


var React = require('react');
var assign = require('object-assign');


var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var UpdateTopicPanel = require('./panels/UpdateTopicPanel');

var TopicDialog = require('./dialog/TopicDialog');


var EditTopicButton3 = React.createClass({
    mixins: [FluxMixin],
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
        this.props.onTopicDeleted();
        this.onClose();
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
            //textAlign: 'left'
        }
    },

    getDialogContent: function(){
        return (

            <div >
                <UpdateTopicPanel
                    onClose={this.onClose}
                    onTopicDeleted={this.onTopicDeleted}
                    topicId={this.props.topicId} />
            </div>

        );
    },


    render: function () {

        var dialogLevel = (this.props.dialogLevel == undefined) ? 0 : this.props.dialogLevel;
        dialogLevel = dialogLevel + 10000;

        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} onClick={this.onEditClick} >
                    <i className={this.props.buttonIcon} ></i> {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <TopicDialog
                        content={this.getDialogContent()}
                        onClose={this.onClose}
                        dialogLevel={dialogLevel} />
                }
            </div>
        );
    }

});

module.exports = EditTopicButton3;