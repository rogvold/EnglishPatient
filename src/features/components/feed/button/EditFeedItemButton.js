/**
 * Created by sabir on 28.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var SelfLoadingUpdateFeedItem = require('../SelfLoadingUpdateFeedItem');

var EditFeedItemButton = React.createClass({
    getDefaultProps: function () {
        return {
            feedItemId: undefined,
            feedId: undefined,
            teacherId: undefined,
            buttonClassName: 'ui basic grey mini button',
            buttonName: 'редактировать',

            onFeedItemUpdated: function(item){

            },

            onFeedItemDeleted: function(itemId){

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

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        dialogPanelStyle: {
            width: 720,
            paddingTop: 10
        }
    },

    onFeedItemUpdated: function(item){
        this.props.onFeedItemUpdated(item);
        this.hideDialog();
    },

    onFeedItemDeleted: function(itemId){
        this.props.onFeedItemDeleted(itemId);
        this.hideDialog();
    },

    getDialogContent: function(){

        console.log('EditFeedButton: getDialogContent occured ');

        var itemId = this.props.feedItemId;

        console.log('itemId = ', itemId);

        if (itemId == undefined){
            return null;
        }
        console.log('RENDERING DIALOG: feedItemId =' + itemId);

        return (
            <div>
                <SelfLoadingUpdateFeedItem teacherId={this.props.teacherId}
                                           onFeedItemDeleted={this.onFeedItemDeleted}
                                           onFeedItemUpdated={this.onFeedItemUpdated}
                    feedItemId={this.props.feedItemId} feedId={this.props.feedId} userId={this.props.teacherId}  />
            </div>

        );
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <button className={'ui basic grey mini button'} onClick={this.showDialog} >
                    <i className={'pencil icon'} ></i> редактировать
                </button>

                <Dialog content={this.getDialogContent()} visible={this.state.dialogVisible}
                        onClose={this.hideDialog} dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                    />

            </div>
        );
    }

});

module.exports = EditFeedItemButton;