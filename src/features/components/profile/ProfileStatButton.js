/**
 * Created by sabir on 15.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../dialog/Dialog');

var SelfLoadingUserProgressPanel = require('../chart/SelfLoadingUserProgressPanel');

var ProfileStatButton = React.createClass({
    getDefaultProps: function () {
        return {
            buttonName: 'статистика',
            buttonClassName: 'ui basic grey button',
            icon: 'icon line chart',
            style: {
                fontSize: 11,
                padding: 5,
                paddingLeft: 7
            },
            userId: undefined,
            name: undefined
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
            display: 'inline-block',
            verticalAlign: 'top'
        },

        dialogPanelStyle: {
            width: 630,
            backgroundColor: 'transparent'
        },

        statHeadPanel: {
            backgroundColor: 'white',
            padding: 5,
            textAlign: 'center'
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

    getDialogContent: function(){
        var userId = this.props.userId;
        if (userId == undefined){
            return null;
        }
        return (
            <div>

                <div style={this.componentStyle.statHeadPanel}>
                    Активность пользователя <b>{this.props.name}</b>
                </div>

                <SelfLoadingUserProgressPanel userId={userId} />
            </div>
        );

    },

    render: function () {
        var buttonStyle = assign({}, this.componentStyle.placeholder, this.props.style);

        return (
            <div style={this.componentStyle.placeholder} >

                <button className={this.props.buttonClassName} style={buttonStyle} onClick={this.showDialog} >
                    <i className={this.props.icon} ></i>
                    {this.props.buttonName}
                </button>


                {this.state.dialogVisible == false ? null :
                    <Dialog dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                            visible={this.state.dialogVisible} onClose={this.hideDialog}
                            content={this.getDialogContent()}
                        />
                }

            </div>
        );
    }

});

module.exports = ProfileStatButton;