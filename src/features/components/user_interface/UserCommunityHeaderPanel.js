/**
 * Created by sabir on 28.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BackgroundImageContainer = require('../image/BackgroundImageContainer');

var CoolPreloader = require('../preloader/CoolPreloader');

var UserCommunityHeaderPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],

    getDefaultProps: function () {
        return {
            userId: undefined,
            customName: undefined,
            customInfoHtml: undefined,
            customInfo: undefined,
            style: {

            },

            infoStyle:{
                fontSize: 12,
                opacity: 0.6
            },

            userNameStyle: {
                color: '#2E3C54',
                fontSize: 14,
                fontWeight: 'bold'
            }
        }
    },

    getInitialState: function () {
        return {

        }
    },

    getStateFromFlux: function(){
        var store = this.getFlux().store('UsersStore');
        var userId = this.props.userId;
        var user = store.getUserById(userId);
        var loading = store.loading;
        return {
            user: user,
            loading: loading
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        var userId = this.props.userId;
        var width = React.findDOMNode(this).offsetWidth;
        this.setState({
            width: width
        });

        if (userId != undefined){
            var user = this.getFlux().store('UsersStore').getUserById(userId);
            if (user != undefined){
                return;
            }
            try{
                this.getFlux().actions.loadUser(userId);
            }catch(exc){
                setTimeout(function(){
                    this.getFlux().actions.loadUser(userId);
                }.bind(this), 300);
            }
        }
    },

    componentStyle: {
        placeholder: {
            //padding: 5,
            //borderBottom: '1px solid #EFF0F1',
            //width: '100%',
            display: 'inline-block',
            verticalAlign: 'top',
            position: 'relative'
        },

        avatarPlaceholder: {
            width: 40,
            height: 40,
            backgroundColor: 'whitesmoke',
            borderRadius: 4,
            display: 'inline-block',
            verticalAlign: 'top',
            marginRight: 10
        },

        userInfoRightBlockPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top'
        },

        userNamePlaceholder: {
            //color: '#2E3C54',
            //fontSize: 14,
            //fontWeight: 'bold'
        },

        userTopicsInfoPlaceholder: {

        }
    },

    render: function () {
        var userId = this.props.userId;
        var user = this.getFlux().store('UsersStore').getUserById(userId);
        var st = assign({}, this.componentStyle.placeholder, this.props.style);
        var infoStyle = assign({}, this.componentStyle.userTopicsInfoPlaceholder, this.props.infoStyle);

        var w = this.state.width;
        var rightStyle = assign({}, this.componentStyle.userInfoRightBlockPlaceholder);
        if (w != undefined){
            rightStyle = assign({}, rightStyle, {width: w - 50});
        }
        var userNameStyle = assign({}, this.componentStyle.userNamePlaceholder, this.props.userNameStyle);

        return (
            <div style={st}>

                {user == undefined ? null :
                    <div>

                        <div style={this.componentStyle.avatarPlaceholder}>
                            <BackgroundImageContainer image={user.avatar} />
                        </div>

                        <div style={rightStyle}>
                            <div style={userNameStyle}>
                                {this.props.customName == undefined ?
                                    <span>{user.name}</span> : <span>{this.props.customName}</span>
                                }
                            </div>

                            {this.props.customInfoHtml == undefined ? null :
                                <div style={infoStyle}>
                                    <div dangerouslySetInnerHTML={{__html: this.props.customInfoHtml}}></div>
                                </div>
                            }

                            {this.props.customInfo == undefined ? null :
                                <div style={infoStyle}>
                                    {this.props.customInfo}
                                </div>
                            }

                        </div>

                    </div>
                }


                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = UserCommunityHeaderPanel;