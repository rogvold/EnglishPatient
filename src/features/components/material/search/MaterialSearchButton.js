/**
 * Created by sabir on 30.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');
var MaterialSearchPanel = require('./MaterialsSearchPanel');

//var Fluxxor = require('fluxxor');
//var FluxMixin = Fluxxor.FluxMixin(React);

var MaterialSearchButton = React.createClass({
    //mixins: [FluxMixin],

    getDefaultProps: function () {
        return {

            teacherId: undefined,

            buttonName: 'Поиск',
            buttonIcon: 'icon search',
            buttonClassName: 'ui button basic grey ',

            buttonStyle: {

            },

            multipleSelect: true,

            selectedMaterialIds: [],

            onSelect: function(selectedMaterialIds){
                console.log('onSelect: ', selectedMaterialIds);
            },

            dialogLevel: 2

        }
    },

    getInitialState: function() {
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

    onSelect: function(selectedMaterialIds){
        this.props.onSelect(selectedMaterialIds);
        this.hideDialog();
    },

    getDialogContent: function(){
        var level = this.props.dialogLevel + 1;
        return (
            <MaterialSearchPanel selectedMaterialIds={this.props.selectedMaterialIds}
                                 teacherId={this.props.teacherId}
                                 dialogLevel={level}
                                 multipleSelect={this.props.multipleSelect}
                                 onSelect={this.onSelect} />
        );
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        dialogPanelStyle: {
            width: 820
        },

        buttonStyle: {

        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.buttonStyle, this.props.buttonStyle);

        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} style={st} onClick={this.showDialog}>
                    <i className={this.props.buttonIcon} ></i>
                    {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <Dialog visible={this.state.dialogVisible} onClick={this.showDialog}
                            content={this.getDialogContent()} level={this.props.dialogLevel}
                            onClose={this.hideDialog} dialogPanelStyle={this.componentStyle.dialogPanelStyle} />
                }


            </div>
        );
    }

});

module.exports = MaterialSearchButton;