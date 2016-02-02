/**
 * Created by sabir on 15.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var TopUserProfileBlock = require('./TopUserProfileBlock');

var UserMixin = require('../../../mixins/UserMixin');

var CoolPreloader = require('../../preloader/CoolPreloader');

var SelfLoadingPostsList = require('../feed/SelfLoadingPostsList');

var moment = require('moment');

var UserInfoCredentialsPanel = require('./UserCredentialsInfoPanel');

var UpdatingPanel = require('../../panel/UpdatingPanel');

var Parse = require('parse').Parse;

var LoginMixin = require('../../../mixins/LoginMixin');

var UserProfilePanel = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,

            avatar: undefined,
            backgroundImage: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            name: undefined,
            avatar: undefined,
            timestamp: undefined,
            backgroundImage: 'https://www.englishpatientdrive.pw/dropzone/uploads/uRZztZjeHPGuPQ4Q9VSe.jpg'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    load: function(){
        var userId = this.props.userId;
        if (userId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        UserMixin.loadUser(userId, function(u){
            document.title = u.name;
            this.setState({
                avatar: u.avatar,
                name: u.name,
                timestamp: u.timestamp,
                loading: false
            });
        }.bind(this));
    },

    loadMoreInfo: function(){

    },

    componentStyle: {
        placeholder: {
            width: 851,
            minHeight: 450,
            margin: '0 auto',
            position: 'relative'
        },

        topBlock: {

        },

        mainBlock: {
            marginTop: 10
        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 339,
            marginRight: 10
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 500
        },

        infoBlock: {
            border: '1px solid #EFF0F1',
            padding: 10,
            backgroundColor: 'white',
            width: '100%'
        }

    },

    render: function () {
        var sDate = moment(this.state.timestamp).format('DD/MM/YYYY');
        var currentUserId = (LoginMixin.getCurrentUser() == undefined) ? undefined : LoginMixin.getCurrentUser().id;
        var editMode = (currentUserId == this.props.userId);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.topBlock}>
                    <TopUserProfileBlock
                        avatar={this.state.avatar}
                        backgroundImage={this.state.backgroundImage}
                        name={this.state.name} />
                </div>

                <div style={this.componentStyle.mainBlock}>


                    <div style={this.componentStyle.left}>

                        <div style={this.componentStyle.infoBlock}>
                            <i className={'icon wait'} ></i> в системе с {sDate}
                        </div>

                        <div style={{marginTop: 10}} >
                            <UserInfoCredentialsPanel teacherId={this.props.userId} />
                        </div>

                        <div style={assign({}, {marginTop: 10})}>
                            <UpdatingPanel
                                    name={'О себе'}
                                    editMode={editMode}
                                    objectId={this.props.userId} fieldName={'aboutMe'}
                                    fieldNamePlaceholder={'Обо мне'}
                                    contentType={'textarea'}
                                    parseClass={Parse.User}
                                    />
                        </div>


                    </div>



                    <div style={this.componentStyle.right}>

                        <SelfLoadingPostsList teacherId={this.props.userId} />

                    </div>

                </div>


                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = UserProfilePanel;