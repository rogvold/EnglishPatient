/**
 * Created by sabir on 20.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogViewButton = require('../view/DialogViewButton');

var DialogCard = require('../card/DialogCard');

var DialogMixin = require('../../../mixins/DialogMixin');

var SelectableDialogsList = require('./SelectableDialogsList');

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

                    <SelectableDialogsList dialogs={list} onSelect={this.onSelect} />

                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate loader"></div>
                </div>


            </div>
        );
    }

});

module.exports = SelfLoadingDialogsSearchList;