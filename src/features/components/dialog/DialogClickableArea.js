/**
 * Created by sabir on 10.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../dialog/Dialog');



var DialogClickableArea = React.createClass({
    getDefaultProps: function () {
        return {
            componentStyle: {

            },
            header: undefined,
            headerText: undefined,
            footer: undefined,
            content: undefined,
            dialogPanelStyle:{

            }
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps){

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        }
    },

    onClose: function(){
        console.log('DialogClickableArea: onClose');
        setTimeout(function(){
            this.setState({
                dialogVisible: false
            });
        }.bind(this), 50);
    },

    onClick: function(){
        this.setState({
            dialogVisible: true
        });
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.componentStyle);

        console.log(' -- rendering DialogClickableArea -- content = ', this.props.content);

        return (
            <div style={st} onClick={this.onClick} >
                <div style={st}>
                    {this.props.children}
                </div>

                <Dialog dialogPanelStyle={this.props.dialogPanelStyle} headerText={this.props.headerText} content={this.props.content}
                        footer={this.props.footer} header={this.props.header} visible={this.state.dialogVisible} onClose={this.onClose} />

            </div>
        );
    }

});

module.exports = DialogClickableArea;