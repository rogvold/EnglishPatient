/**
 * Created by sabir on 23.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingMaterialPanel = require('./SelfLoadingMaterialPanel');
var SelfLoadingMaterialUpdatePanel = require('./SelfLoadingMaterialUpdatePanel');

var Dialog = require('../../dialog/Dialog');

var MaterialDialog = React.createClass({
    getDefaultProps: function () {
        return {
            materialId: undefined,
            //materialId: 'WpHOn84UpQ',
            //materialId: 'DKosKcNsOh',

            visible: false,
            editMode: true,
            allGroupsList: [],

            level: 10,

            onClose: function(){

            },
            onMaterialUpdated: function(data){

            },
            onMaterialDeleted: function(){

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
        dialogPanelStyle: {
            width: 800
        },

        footerPlaceholder: {
            padding: 5,
            textAlign: 'right'
        },

        footerStyle: {
            height: 50,
            minHeight: 40
        }

    },

    switchMode: function(){
        var mode = this.state.mode;
        if (mode == 'view'){
            this.setState({
                mode: 'edit'
            });
        }else{
            this.setState({
                mode: 'view'
            });
        }
    },

    onMaterialUpdated: function(data){
        this.props.onMaterialUpdated(data);
        this.setState({
            mode: 'view'
        });
    },

    onMaterialDeleted: function(){
        this.props.onMaterialDeleted();
    },

    getDialogContent: function(){
        if (this.props.visible == false){
            return null;
        }

        return (
            <div>
                {this.state.mode == 'view' ?
                    <div>
                        <SelfLoadingMaterialPanel materialId={this.props.materialId} />
                    </div>
                    :
                    <div>
                        <SelfLoadingMaterialUpdatePanel onMaterialUpdated={this.onMaterialUpdated}
                                                        onMaterialDeleted={this.onMaterialDeleted}
                                                        materialId={this.props.materialId}
                                                        allGroupsList={this.props.allGroupsList}
                            />
                    </div>
                }
            </div>
        );
    },

    getFooter: function(){
      if (this.props.visible == false || this.props.editMode == false){
          return null;
      }

        return (
            <div style={this.componentStyle.footerPlaceholder} >
                <button className={'ui default button'} onClick={this.switchMode} >
                    {this.state.mode == 'view' ?
                        <span>
                            <i className={'pencil icon'} ></i> Редактировать
                        </span> :
                        <span>
                            <i className={'reply icon'} ></i> Вернуться к просмотру
                        </span>
                    }
                </button>
            </div>
        );
    },

    render: function () {
        console.log('rendering material dialog');
        return (
            <div style={this.componentStyle.placeholder}>
                <Dialog footerStyle={this.componentStyle.footerStyle} dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        visible={this.props.visible} onClose={this.props.onClose}
                        level={this.props.level}
                        content={this.getDialogContent()} footer={this.getFooter()}  />
            </div>
        );
    }

});

module.exports = MaterialDialog;