/**
 * Created by sabir on 30.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingNote = require('../note/SelfLoadingNote');

var Dialog = require('../dialog/Dialog');

var NoteLink = React.createClass({
    getDefaultProps: function () {
        return {
            noteId: undefined,
            name: undefined,

            style: {

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

        linkStyle: {
            display: 'inline-block',
            cursor: 'pointer'
        },

        dialogPanelStyle: {
            width: 800,
            padding: 10
        }
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    show: function(){
        this.setState({
            dialogVisible: true
        });
    },

    getDialogContent: function(){
        return (
            <SelfLoadingNote noteId={this.props.noteId} />
        );
    },

    render: function () {
        var st = assign({}, this.props.linkStyle, this.props.style);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={st} onClick={this.show} >
                    {this.props.name}
                </div>


                {this.state.dialogVisible == false ? null :
                    <Dialog visible={true}
                            content={this.getDialogContent()}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                            onClose={this.onClose} />
                }


            </div>
        );
    }

});

module.exports = NoteLink;