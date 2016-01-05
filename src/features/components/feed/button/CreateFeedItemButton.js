/**
 * Created by sabir on 01.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingUpdateFeedItem = require('../SelfLoadingUpdateFeedItem');
var Dialog = require('../../dialog/Dialog');

var CreateFeedItemButton = React.createClass({
    getDefaultProps: function () {
        return {
            feedItemId: undefined,
            feedId: undefined,
            teacherId: undefined,
            buttonClassName: 'ui basic grey mini button',
            buttonName: 'добавить задание',
            buttonIcon: 'icon plus',

            onFeedItemCreated: function(item){

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

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        dialogPanelStyle: {
            width: 720,
            paddingTop: 10,
            textAlign: 'left'
        }

    },


    showDialog: function(){
        this.setState({
            dialogVisible: true
        });
    },

    hideDialog: function(){
        this.setState({
            dialogVisible: false
        });
    },

    onFeedItemCreated: function(item){
        this.props.onFeedItemCreated(item);
        this.hideDialog();
    },

    getDialogContent: function(){
        console.log('CreateFeedButton: getDialogContent occured ');
        var itemId = this.props.feedItemId;
        console.log('itemId = ', itemId);

        return (
            <div>
                <SelfLoadingUpdateFeedItem teacherId={this.props.teacherId}
                                           onFeedItemCreated={this.onFeedItemCreated}
                                           feedId={this.props.feedId} userId={this.props.teacherId}  />
            </div>
        );
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} onClick={this.showDialog} >
                    <i className={this.props.buttonIcon} ></i> {this.props.buttonName}
                </button>

                <Dialog content={this.getDialogContent()} visible={this.state.dialogVisible}
                        onClose={this.hideDialog} dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                    />

            </div>
        );
    }

});

module.exports = CreateFeedItemButton;