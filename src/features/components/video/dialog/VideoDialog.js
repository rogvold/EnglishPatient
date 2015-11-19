/**
 * Created by sabir on 17.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var VideoPanel = require('./VideoPanel');

var VideoDialog = React.createClass({
    getDefaultProps: function () {
        return {
            videoId: undefined,
            videoType: 'vimeo',
            transcript: undefined,
            content: undefined,

            additionalContent: undefined,

            onClose: function(){

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

        },

        dialogPanelStyle: {
            width: 800
        }
    },

    getDialogContent: function(){
        return (
          <div>
                <VideoPanel videoType={this.props.videoType}
                            content={this.props.content}
                            videoId={this.props.videoId}
                            trascript={this.props.transcript} />

              {this.props.additionalContent == undefined ? null :

                <div>
                    {this.props.additionalContent}
                </div>
              }

          </div>
        );
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <Dialog
                    dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                    visible={true}
                    onClose={this.props.onClose}
                    content={this.getDialogContent()} />
            </div>
        );
    }

});

module.exports = VideoDialog;