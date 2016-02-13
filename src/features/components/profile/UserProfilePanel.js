/**
 * Created by sabir on 26.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var UserMixin = require('../../mixins/UserMixin');

var FileUploader = require('../file/FileUploader');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var UserProfilePanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],

    getDefaultProps: function () {
        return {
            defaultAvatar: 'http://www.thejasperlocal.com/uploads/1/3/4/6/13461048/5515515_orig.jpg',
            userId: undefined,
            userUpdated: function(u){

            }
        }
    },

    getInitialState: function () {
        return {
            firstName: undefined,
            lastName: undefined,
            avatar: undefined
        }
    },

    getStateFromFlux: function(){
        var store = this.getFlux().store('UsersStore');
        return {
            loading: store.loading
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {
            width: 871,
            margin: '0 auto',
            border: '1px solid #EFF0F1',
            padding: 5,
            marginTop: 15,
            backgroundColor: 'white',
            borderRadius: 4
        },

        leftBlock: {
            width: 200,
            verticalAlign: 'top',
            display: 'inline-block',
            marginRight: 10
        },

        rightBlock: {
            width: 640,
            verticalAlign: 'top',
            display: 'inline-block'
        },

        avatarPlaceholder: {
            width: 195,
            height: 195,
            margin: '0 auto',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            borderRadius: 4
        },

        bottomPlaceholder: {
            textAlign: 'right',
            marginTop: 10
        },

        deleteImageBlock: {
            padding: 8,
            cursor: 'pointer'
        }
    },

    onImageDeleted: function(){
        this.setState({
            avatar: undefined
        });
    },

    load: function(userId){
        var user = this.getFlux().store('UsersStore').getCurrentUser();
        if (user == undefined){
            return;
        }
        this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar
        });
        //if (userId == undefined){
        //    return;
        //}
        //this.setState({
        //    loading: true
        //});
        //UserMixin.loadUser(userId, function(user){
        //    this.setState({
        //        firstName: user.firstName,
        //        lastName: user.lastName,
        //        avatar: user.avatar,
        //        loading: false
        //    });
        //    if (callback != undefined){
        //        callback(user);
        //    }
        //}.bind(this));
    },

    update: function(callback){
        var firstName = this.state.firstName;
        var lastName = this.state.lastName;
        var avatar = this.state.avatar;

        this.getFlux().actions.updateUser({
            firstName: firstName,
            lastName: lastName,
            avatar: avatar
        });

        //this.setState({
        //    loading: true
        //});
        //UserMixin.updateUser(this.props.userId, firstName, lastName, avatar, function(user){
        //    this.setState({
        //        firstName: user.firstName,
        //        lastName: user.lastName,
        //        avatar: user.avatar,
        //        loading: false
        //    });
        //    this.props.userUpdated(user);
        //    if (callback != undefined){
        //        callback(user);
        //    }
        //}.bind(this));
    },

    getValFromEvt: function(evt){
        if (evt == undefined){
            return undefined;
        }
        return evt.target.value;
    },


    onFirstNameChange: function(evt){
        this.setState({
            firstName: this.getValFromEvt(evt)
        });
    },

    onLastNameChange: function(evt){
        this.setState({
            lastName: this.getValFromEvt(evt)
        });
    },

    onAvatarChange: function(url){
        this.setState({
            avatar: url
        });
    },

    save: function(){
        this.update();
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder);
        var left = assign({}, this.componentStyle.leftBlock);
        var right = assign({}, this.componentStyle.rightBlock);
        var avatar = (this.state.avatar == undefined) ? this.props.defaultAvatar : this.state.avatar;
        var avatarStyle = assign({}, this.componentStyle.avatarPlaceholder, {backgroundImage: 'url(\'' + avatar + '\')'});

        return (
            <div style={st}>
                <div style={left}>
                    <div style={avatarStyle}></div>

                    {this.state.avatar != undefined ?
                        <div style={this.componentStyle.deleteImageBlock} className={'ui red message'} onClick={this.onImageDeleted} >
                            <i className={'remove icon'} ></i>
                            Удалить аватар
                        </div>
                        :
                        <div>
                            <label>
                                Загрузить аватар
                            </label>
                            <FileUploader containerClassName={'ui message'} onFileUploaded={this.onAvatarChange} />
                        </div>

                    }

                </div>

                <div style={right}>

                    <div className={'ui form'} >

                        <div className={'field'}>
                            <label>Имя</label>
                            <input value={this.state.firstName} placeholder={'Имя'} onChange={this.onFirstNameChange} />
                        </div>

                        <div className={'field'}>
                            <label>Фамилия</label>
                            <input value={this.state.lastName} placeholder={'Фамилия'} onChange={this.onLastNameChange} />
                        </div>


                    </div>

                    <div style={this.componentStyle.bottomPlaceholder}>
                        <button className={'ui primary button'} onClick={this.save} >
                            <i className={'icon save'} ></i> Сохранить
                        </button>
                    </div>

                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = UserProfilePanel;