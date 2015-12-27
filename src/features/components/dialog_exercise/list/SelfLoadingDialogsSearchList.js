/**
 * Created by sabir on 20.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogViewButton = require('../view/DialogViewButton');

var DialogCard = require('../card/DialogCard');

var DialogMixin = require('../../../mixins/DialogMixin');

var SelfLoadingDialogsSearchList = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            onSelect: function(dialog){
                console.log('default: onSelect: ', dialog);
            }
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            dialogs: []
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {
            width: 720,
            backgroundColor: 'white',
            margin: '0 auto'
        },

        dialogItem: {
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            padding: 5,
            borderBottom: 5
        },

        dialogItemAvatar: {
            width: 100,
            height: 70,
            marginRight: 5,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        dialogItemContent: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 500
        },

        dialogName: {
            fontWeight: 'bold'
        },

        dialogDescription: {

        },

        dialogControls: {
            display: 'inline-block',
            verticalAlign: 'top'
        },

        listPlaceholder: {

        }

    },

    load: function(){
        this.setState({
            loading: true
        });
        DialogMixin.loadTeacherDialogs(this.props.teacherId, function(dialogs){
            this.setState({
                loading: false,
                dialogs: dialogs
            });
        }.bind(this));
    },

    onSelect: function(dialog){
        this.props.onSelect(dialog);
    },

    render: function () {
        var list = this.state.dialogs;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>

                    {list.map(function(dialog, k){
                        var key = 'dialog_' + k + '_' + dialog.id;
                        var onSelect = this.onSelect.bind(this, dialog);

                        return (
                            <div style={this.componentStyle.dialogItem} key={key} >
                                <div style={this.componentStyle.dialogItemAvatar}>
                                    <DialogCard avatar={dialog.avatar} />
                                </div>

                                <div style={this.componentStyle.dialogItemContent}>

                                    <div style={this.componentStyle.dialogName}>
                                        {dialog.name}
                                    </div>
                                    {dialog.description == undefined ? null :
                                        <div style={this.componentStyle.dialogDescription}>
                                            {dialog.description}
                                        </div>
                                    }
                                </div>

                                <div style={this.componentStyle.dialogControls}>
                                    <DialogViewButton dialogId={dialog.id} userId={this.props.teacherId} />

                                    <button style={{marginTop: 5}} className={'ui basic button mini'} onClick={onSelect} >
                                        <i className={'icon checkmark'} ></i> выбрать
                                    </button>

                                </div>

                            </div>
                        );

                    }, this)}

                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate loader"></div>
                </div>


            </div>
        );
    }

});

module.exports = SelfLoadingDialogsSearchList;