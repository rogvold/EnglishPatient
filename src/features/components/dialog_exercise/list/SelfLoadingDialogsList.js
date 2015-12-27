/**
 * Created by sabir on 19.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogMixin = require('../../../mixins/DialogMixin');

var DialogsList = require('./DialogsList');

var Dialog = require('../../dialog/Dialog');

var SelfLoadingDialogPanel = require('../view/SelfLoadingDialogPanel');

var DialogViewPanel = require('../DialogViewPanel');

var DialogEditableViewPanel = require('../DialogEditableViewPanel');

var CreateDialogButton = require('../edit/CreateDialogButton');


var SelfLoadingDialogsList = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            createButtonVisible: true
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            dialogs: [],
            selectedDialog: undefined,
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {

        },

        listPlaceholder: {

        },

        dialogPanelStyle: {
            width: 900,
            textAlign: 'left'
        },

        createButtonPlaceholder: {
            paddingTop: 10,
            paddingRight: 10,
            backgroundColor: 'white',
            margin: '0 auto',
            width: 850,
            textAlign: 'right'
        }
    },

    load: function(){
        var userId = this.props.teacherId;
        this.setState({
            loading: true
        });

        DialogMixin.loadTeacherDialogs(userId, function(dialogs){
            this.setState({
                dialogs: dialogs,
                loading: false
            });
        }.bind(this));

    },

    onItemClick: function(dialog){
        this.setState({
            selectedDialog: dialog,
            dialogVisible: true
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    getDialogContent: function(){
        var dialog = this.state.selectedDialog;
        //var userId =

        return (
            <div>
                {dialog == undefined ? null :
                    <DialogEditableViewPanel userId={this.props.teacherId} onDelete={this.onDelete} dialog={dialog} />
                }
            </div>
        );
    },

    onDialogCreated: function(dialog){
        var dialogs = this.state.dialogs;
        dialogs.push(dialog);
        this.setState({
            dialogs: dialogs
        });
    },

    onDelete: function(){
        this.load();
        this.setState({
            dialogVisible: false
        });
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.createButtonPlaceholder}>

                    <CreateDialogButton onDialogCreated={this.onDialogCreated} />

                </div>

                <div style={this.componentStyle.listPlaceholder}>

                    <DialogsList onItemClick={this.onItemClick} dialogs={this.state.dialogs} />

                </div>


                {this.state.dialogVisible == false ? null :
                    <Dialog visible={true}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                            content={this.getDialogContent()}
                            onClose={this.onClose} />
                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate loader"></div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingDialogsList;