/**
 * Created by sabir on 18.12.15.
 */

var React = require('react');
var assign = require('object-assign');
var DialogMixin = require('../../../mixins/DialogMixin');
var DialogEditInfoPanel = require('./DialogEditInfoPanel');


var SelfLoadingDialogEditPanel = React.createClass({
    getDefaultProps: function () {
        return {
            dialogId: undefined,

            onDelete: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            dialog: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    load: function(){
        var dialogId = this.props.dialogId;
        if (dialogId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        DialogMixin.loadDialog(dialogId, function(dialog){
            this.setState({
                dialog: dialog,
                cards: dialog.cards,
                loading: false
            });
        }.bind(this));
    },

    componentStyle: {
        placeholder: {

        }

    },

    saveCards: function(){
        var cards = this.state.cards;
        this.setState({
            loading: true
        });
        DialogMixin.saveCards(cards, this.props.dialogId, function(crds){
            this.setState({
                cards: crds,
                loading: false
            });
        }.bind(this));
    },

    onUpdate: function(data){
        console.log('onUpdate occured: data = ', data);
        this.setState({
            loading: true
        });
        DialogMixin.updateDialog(this.props.dialogId, data, function(dialog){
            this.setState({
                loading: false,
                dialog: dialog,
                cards: dialog.cards
            });
        }.bind(this));
    },

    onDelete: function(){
        this.setState({
            loading: true
        });
        DialogMixin.deleteDialog(this.props.dialogId, function(){
            this.setState({
                loading: false
            });
            this.props.onDelete();
        }.bind(this))
    },


    render: function () {
        var dialog = this.state.dialog;
        var cards = this.state.cards;

        return (
            <div style={this.componentStyle.placeholder}>


                    {dialog == undefined ? null :
                        <div>
                            <DialogEditInfoPanel
                                dialogId={this.props.dialogId}
                                avatar={dialog.avatar}
                                name={dialog.name}
                                task={dialog.task}
                                description={dialog.description}
                                firstRoleImg={dialog.firstRoleImg}
                                secondRoleImg={dialog.secondRoleImg}
                                firstRoleName={dialog.firstRoleName}
                                secondRoleName={dialog.secondRoleName}
                                vimeoId={dialog.vimeoId}
                                cards={cards}
                                onUpdate={this.onUpdate}
                                onDelete={this.onDelete}
                                />
                        </div>
                    }



                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate loader"></div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingDialogEditPanel;