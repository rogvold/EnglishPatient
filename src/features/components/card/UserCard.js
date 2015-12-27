/**
 * Created by sabir on 11.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var moment = require('moment');

var ProfileUpdateButton = require('../profile/ProfileUpdateButton');
var ProfileStatButton = require('../profile/ProfileStatButton');

var ChatButton = require('../chat/ChatButton');

var UserCard = React.createClass({
    getDefaultProps: function () {
        return {
            name: '',
            email: undefined,
            userId: undefined,
            avatar: 'http://beta.englishpatient.org/img/profile.png',
            timestamp: undefined,
            onClick: function(){
                console.log('user clicked');
            },

            onUserDelete: function(){

            },

            stasiMode: false
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        moment.locale('ru');
    },

    componentStyle: {
        placeholder: {
            //padding: 10
        },

        header: {
            fontSize: '14px',
            fontWeight: 'normal'
        },

        date:{
            color: '#A1A4AA'
        },

        buttonStyle: {
            fontSize: '12px',
            padding: '5px',
            paddingLeft: '7px'

        },

        avaDiv: {
            width: 36,
            height: 36,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
        }
    },

    onClick: function(){
        this.props.onClick();
    },

    onUserDelete: function(){
        this.props.onUserDelete();
    },

    render: function () {
        var formattedDate = (this.props.timestamp == undefined) ? undefined : moment(this.props.timestamp).format('LL');
        if (formattedDate != undefined){
            formattedDate = ' ' + formattedDate;
        }

        var avaSt = assign({}, this.componentStyle.avaDiv, {backgroundImage: 'url(\'' + this.props.avatar + '\')'});

        return (
            <div style={this.componentStyle.placeholder} className={'ui card'} onClick={this.onClick} >

                <div className="content" style={{padding: 10}} >

                        <div className={'right floated'} style={avaSt}></div>


                        <div className="header" style={this.componentStyle.header} >
                            {this.props.name}
                        </div>
                        {formattedDate == undefined ? null :
                            <div className="meta" style={this.componentStyle.date} >
                                {formattedDate}
                            </div>
                        }

                    <div style={{marginTop: 8}} >
                        {this.props.stasiMode == false ? null :

                                <ProfileUpdateButton userId={this.props.userId}
                                                     email={this.props.email}
                                                     name={this.props.name}
                                                     avatar={this.props.avatar}
                                                     timestamp={this.props.timestamp}
                                                     buttonName={'инфо'}
                                                     onUserDelete={this.onUserDelete} />

                        }

                        <ProfileStatButton userId={this.props.userId} name={this.props.name} />

                        <ChatButton
                            friendId={this.props.userId}
                            style={this.componentStyle.buttonStyle}
                            buttonClassName={'ui button mini grey basic'}
                            icon={'icon comments'}
                            buttonName={'сообщения'} />



                    </div>





                </div>
            </div>

        );
    }

});

module.exports = UserCard;