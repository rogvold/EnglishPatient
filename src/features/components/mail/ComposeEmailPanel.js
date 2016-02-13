/**
 * Created by sabir on 10.02.16.
 */

var React = require('react');
var assign = require('object-assign');


var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var PatientEditor = require('../editor/PatientEditor');

var CoolPreloader = require('../preloader/CoolPreloader');

var MailAPI = require('../../api/MailAPI');

var ComposeEmailPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore', 'MailStore')],
    getDefaultProps: function () {
        return {

        }
    },

    getInitialState: function () {
        return {
            //defaultMessage: this.state.message
        }
    },

    getStateFromFlux: function(){
        var store = this.getFlux().store('UsersStore');
        var mailStore = this.getFlux().store('MailStore');

        return {
            loading: store.loading,
            sending: mailStore.sending,
            message: mailStore.message,
            subject: mailStore.subject,
            toUsersIds: mailStore.toUsersIds
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    needToLoadUsers: function(){
        console.log('need to load users occured');
        var ids = this.state.toUsersIds;
        var arr = [];
        var map = this.getFlux().store('UsersStore').usersMap;
        var f = false;
        for (var i in ids){
            if (map[ids[i]] == undefined){
                console.log('returning true');
                f = true;
            }
        }
        console.log('returning ', f);
        return f;
    },

    loadUsers: function(){
        var ids = this.state.toUsersIds;
        var f = this.needToLoadUsers();
        if (f == true){
            try{
                this.getFlux().actions.loadUsersByIds(ids);
            }catch(err){
                setTimeout(function(){
                    this.getFlux().actions.loadUsersByIds(ids);
                }.bind(this), 3000);
            }
        }
    },

    componentDidMount: function () {
        this.loadUsers();
        //this.setState({
        //    defaultMessage: this.state.message
        //});
        setTimeout(function(){
            this.setState({
                defaultMessage: this.state.message
            });
        }.bind(this), 500);
    },


    componentStyle: {
        placeholder: {
            backgroundColor: 'white',
            position: 'relative'
        },

        toEmailPlaceholder: {
            padding: 10,
            borderBottom: '1px solid #EFF0F1'
        },

        subjectPlaceholder: {
            padding: 10,
            borderBottom: '1px solid #EFF0F1'
        },

        composePanel: {
            //padding: 10,
            borderTop: '1px solid #EFF0F1'
        },

        toUserItem: {
            margin: 10,
            marginTop: 4,
            marginBottom: 4,
            //backgroundColor: '#C6C9D0',
            backgroundColor: '#2E3C54',
            borderRadius: 3,
            color: 'white',
            //border: '1px solid #EFF0F1',
            padding: 2,
            fontWeight: 'bold',
            paddingLeft: 5,
            paddingRight: 5
        },

        buttonsPlaceholder: {
            marginTop: 10,
            textAlign: 'right'
        }

    },

    getToComponentsList: function(){
        var map = this.getFlux().store('UsersStore').usersMap;
        var needToLoadUsers = this.needToLoadUsers();
        if (needToLoadUsers == true){
            return null;
        }
        var list = (this.state.toUsersIds == undefined) ? [] : this.state.toUsersIds;
        var arr = list.map(function(id){return map[id]});
        return (
            <div style={{display: 'inline-block'}} >
                {arr.map(function(user, k){
                    var key = 'user_to_' + k;
                    var name = user.name;
                    var email = user.email;
                    return (
                        <span key={key} style={this.componentStyle.toUserItem}>
                            <span title={email} >
                                {name + ' <' + email + '>'}
                            </span>
                        </span>
                    );
                }, this)}
            </div>
        );
    },

    getToEmails: function(){
        var map = this.getFlux().store('UsersStore').usersMap;
        var needToLoadUsers = this.needToLoadUsers();
        if (needToLoadUsers == true){
            return [];
        }
        var list = (this.state.toUsersIds == undefined) ? [] : this.state.toUsersIds;
        var arr = list.map(function(id){return map[id].email});
        return arr;
    },

    canSend: function(){
        var content = this.state.message;
        var subject = this.state.subject;
        var toEmails = this.getToEmails();

        console.log('canSend occured: content, subject, toEmails = ', content, subject, toEmails);

        if (toEmails.length == 0){
            return false;
        }
        if (content == undefined || content.trim().length == 0){
            return false;
        }
        return true;
    },

    send: function(){
        var canSend = this.canSend();
        if (canSend == false){
            return;
        }
        this.getFlux().actions.sendMail();
    },

    onSubjectChange: function(evt){
        var val = evt.target.value;
        this.getFlux().actions.mailDataChanged({
            subject: val
        });
    },

    onTextChange: function(html){
        this.getFlux().actions.mailDataChanged({
            message: html
        });
    },

    render: function () {
        var needToLoadUsers = this.needToLoadUsers();
        var componentsList = this.getToComponentsList();
        var subject = this.state.subject;
        if (subject == undefined){
            subject = 'Без темы'
        }
        var loading = this.state.loading || this.state.sending;
        var canSend = this.canSend();

        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.toEmailPlaceholder}>
                    Кому:
                    {needToLoadUsers == true ? <span> загрузка... </span> :
                        <span>{componentsList}</span>
                    }
                </div>

                <div style={this.componentStyle.subjectPlaceholder}>
                    Тема:
                    <span style={{marginLeft: 10, fontWeight: 'bold'}} >
                        <div className="ui transparent input" style={{display: 'inline-block', width: 500}} >
                            <input type="text" value={subject} style={{width: '100%'}} onChange={this.onSubjectChange} placeholder="Subject..." />
                        </div>
                    </span>

                </div>

                <div style={this.componentStyle.composePanel}>
                    <PatientEditor onContentChange={this.onTextChange} value={this.state.defaultMessage} />
                </div>

                <div style={this.componentStyle.buttonsPlaceholder}>

                    <button disabled={!canSend} className={'ui button patientPrimary'} onClick={this.send} >
                        <i className={(this.state.sending == true ? 'icon spinner' : 'icon send outline')} ></i>
                        {this.state.sending == true ? <span>Идет отравка...</span> : <span>Отправить</span>}
                    </button>

                </div>


                {this.state.sending == true ?
                    <div>
                        <CoolPreloader text={'Отправка'} />
                    </div>
                    :
                    <div>
                        {loading == true ?
                            <CoolPreloader />
                            : null
                        }
                    </div>
                }


            </div>
        );
    }

});

module.exports = ComposeEmailPanel;