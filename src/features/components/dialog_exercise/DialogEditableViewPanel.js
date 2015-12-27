/**
 * Created by sabir on 19.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogViewPanel = require('./DialogViewPanel');

var SelfLoadingDialogViewPanel = require('./SelfLoadingDialogViewPanel');

var SelfLoadingDialogEditPanel = require('./edit/SelfLoadingDialogEditPanel');

var DialogEditableViewPanel = React.createClass({
    getDefaultProps: function () {
        return {
            dialog: {},
            editable: true,
            userId: undefined,

            onDelete: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            mode: 'view'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        panelsPlaceholder: {
            marginBottom: 70
        },

        footerPlaceholder: {
            height: 47,
            position: 'absolute',
            padding: 5,
            zIndex: 100,
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: 'left',
            borderTop: '1px solid #EFF0F1',
            backgroundColor: 'white'
        }
    },


    getContent: function(){
        var mode = this.state.mode;


        if (mode == 'view'){
            return (
                <SelfLoadingDialogViewPanel userId={this.props.userId} dialogId={this.props.dialog.id} />
            );
        }
        if (mode == 'edit'){
            return (
                <SelfLoadingDialogEditPanel onDelete={this.onDelete} dialogId={this.props.dialog.id} />
            );
        }

        return null;

    },

    onDelete: function(){
        this.props.onDelete();
    },

    switchMode: function(mode){
        this.setState({
            mode: mode
        });
    },

    render: function () {
        var mode = this.state.mode;
        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.panelsPlaceholder}>

                    {this.getContent()}

                </div>

                {this.props.editable == false ? null :

                    <div style={this.componentStyle.footerPlaceholder}>
                        {mode == 'edit' ?
                            <div>
                                <button className={'ui button primary'} onClick={this.switchMode.bind(this, 'view')} >
                                    <i className={'icon reply'} ></i>
                                    просмотр
                                </button>
                            </div>
                            :
                            <div>
                                <button className={'ui button primary'} onClick={this.switchMode.bind(this, 'edit')} >
                                    <i className={'icon pencil'} ></i>
                                    редактировать
                                </button>
                            </div>
                        }
                    </div>
                }



            </div>
        );
    }

});

module.exports = DialogEditableViewPanel;