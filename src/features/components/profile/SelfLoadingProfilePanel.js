/**
 * Created by sabir on 26.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var ProfilePanel = require('./ProfilePanel');

var ProfileMixin = require('../../mixins/ProfileMixin');

var SelfLoadingProfilePanel = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,

            music: undefined,
            video: undefined,
            politics: undefined,
            moreInfo: undefined,

            profileId: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var userId = nextProps.userId;
        if (userId == undefined){
            return;
        }
        this.load(userId, function(data){
            console.log('user loaded: ', data);
        });

    },

    componentDidMount: function () {
        var self = this;
        this.load(this.props.userId, function(data){
            console.log('profile loaded');
        });
    },

    load: function(userId, callback){
        if (userId == undefined){
            console.log('userId is not defined');
            return;
        }
        this.setState({
            loading: true
        });
        var self = this;
        ProfileMixin.loadUserProfile(userId, function(data){
            self.setState({
                loading: false,

                music: data.music,
                video: data.video,
                politics: data.politics,
                moreInfo: data.moreInfo,

                userId: self.props.userId,
                profileId: data.profileId
            });
        });
    },

    onSave: function(data){
        console.log('onSave occured');
        this.setState({
            loading: true
        });
        var self = this;
        ProfileMixin.updateProfile(data, function(data){
            console.log('profile updated: data = ', data);
            self.setState({
                loading: false,

                music: data.music,
                video: data.video,
                politics: data.politics,
                moreInfo: data.moreInfo

            });
        });
    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <ProfilePanel
                              music={this.state.music}
                              video={this.state.video}
                              politics={this.state.politics}
                              moreInfo={this.state.moreInfo}

                              userId={this.props.userId}
                              profileId={this.state.profileId}

                              onSave={this.onSave}
                />

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingProfilePanel;