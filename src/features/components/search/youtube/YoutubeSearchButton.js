/**
 * Created by sabir on 03.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var YoutubeSearchPanel = require('./YoutubeSearchPanel');

var YoutubeSearchButton = React.createClass({
    getDefaultProps: function () {
        return {
            icon: 'icon youtube',
            buttonName: 'Поиск на Youtube',
            buttonClassName: 'ui button mini basic',
            style: {

            },

            disabled: false,

            onSubmit: function(data){

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
            width: 870,
            padding: 10
        },

        buttonStyle: {
            display: 'inline-block'
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

    onSubmit: function(data){
        console.log('onSubmit: ', data);
        this.onClose();
        this.props.onSubmit(data);
    },

    getDialogContent: function(){
        return(
            <div>
                <YoutubeSearchPanel submitMode={true} onSubmit={this.onSubmit} />
            </div>
        );
    },

    render: function () {
        var st = assign({}, this.componentStyle.buttonStyle, this.props.style);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={st} >
                    <button disabled={this.props.disabled} className={this.props.buttonClassName} onClick={this.show} >
                        {this.props.icon == undefined ? null :
                            <span>
                                <i className={this.props.icon} ></i> {this.props.buttonName}
                            </span>
                        }
                    </button>
                </div>


                {this.state.dialogVisible == false ? null :
                    <Dialog
                        visible={true}
                        onClose={this.onClose}
                        content={this.getDialogContent()}
                        level={500}
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        />
                }


            </div>
        );
    }

});

module.exports = YoutubeSearchButton;