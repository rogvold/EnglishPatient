/**
 * Created by sabir on 27.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingMosesEditor = require('./SelfLoadingMosesEditor');

var Dialog = require('../../dialog/Dialog');


var MosesEditorButton = React.createClass({
    getDefaultProps: function () {
        return {
            materialId: undefined,
            buttonName: 'Разбить',
            buttonClassName: 'ui basic button',
            //icon: 'icon connectdevelop',
            icon: 'icon wizard',
            style: {

            },
            level: 100,
            onUpdated: function(m){

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
            padding: 5
        },

        buttonStyle: {

        }
    },

    show: function(){
        this.setState({
            dialogVisible: true
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    onUpdated: function(m){
        this.props.onUpdate(m);
        this.onClose();
    },

    getContent: function(){
        var materialId = this.props.materialId;
        if (materialId == undefined){
            return null;
        }
        return (
            <div>
                <SelfLoadingMosesEditor materialId={materialId} onUpdated={this.onUpdated} />
            </div>
        );
    },

    render: function () {
        var st = assign({}, this.componentStyle.buttonStyle, this.props.style);
        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} style={st} onClick={this.show} >
                    <i className={this.props.icon} ></i> {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <Dialog content={this.getContent()} visible={true} onClose={this.onClose}
                            level={this.props.level}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle} />
                }

            </div>
        );
    }

});

module.exports = MosesEditorButton;