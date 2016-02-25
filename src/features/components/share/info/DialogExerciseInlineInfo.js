/**
 * Created by sabir on 16.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../preloader/CoolPreloader');
var UserCommunityHeaderPanel = require('../../user_interface/UserCommunityHeaderPanel');

var DialogExerciseInlineInfo = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('DialogsStore')],
    getDefaultProps: function(){
        return {
            dialogId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('DialogsStore');
        return {
            loading: store.loading,
            dialog: store.dialogsMap[this.props.dialogId]
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        var dialogId = this.props.dialogId;
        var dialog = this.getFlux().store('DialogsStore').dialogsMap[dialogId];
        if (dialog == undefined){
            this.getFlux().actions.loadDialog(dialogId);
        }
    },

    componentStyle: {
        placeholder: {
            position: 'relative'
        },

        userHeaderPlaceholder: {

        },

        dialogInfoPlaceholder: {
            paddingTop: 5,
            paddingBottom: 5,
            opacity: 0.8
        }
    },

    render: function(){
        var dialog = this.state.dialog;
        var userId = (dialog == undefined) ? undefined : dialog.creatorId;
        var name = (dialog == undefined) ? undefined : dialog.name;

        return (
            <div style={this.componentStyle.placeholder} >


                {userId == undefined ? null :
                    <div style={this.componentStyle.userHeaderPlaceholder}>
                        <UserCommunityHeaderPanel
                            profileLinkEnabled={true}
                            style={{minWidth: 250}}
                            infoStyle={{opacity: 0.95, fontSize: 14}}
                            customInfoHtml={name}
                            userId={userId}/>
                    </div>
                }

                {dialog == undefined ? null :
                    <div style={this.componentStyle.dialogInfoPlaceholder}>

                        {(dialog.description == undefined || dialog.description.trim() == '' ) ? null :
                            <div>
                                {dialog.description}
                            </div>
                        }
                        {(dialog.task == undefined || dialog.task.trim() == '' ) ? null :
                            <div>
                                <i>Задание: </i>
                                {dialog.task}
                            </div>
                        }

                    </div>
                }


                {this.state.loading == false ? null :
                    <CoolPreloader />
                }
            </div>
        );
    }

});

module.exports = DialogExerciseInlineInfo;