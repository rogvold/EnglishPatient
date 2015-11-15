/**
 * Created by sabir on 11.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var moment = require('moment');

var ProfileUpdateButton = require('../profile/ProfileUpdateButton');

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
        return (
            <div style={this.componentStyle.placeholder} className={'ui card'} onClick={this.onClick} >

                <div className="content">
                        <img className="right floated mini ui image" src={this.props.avatar} />
                        <div className="header" style={this.componentStyle.header} >
                            {this.props.name}
                        </div>
                        {formattedDate == undefined ? null :
                            <div className="meta" style={this.componentStyle.date} >
                                {formattedDate}
                            </div>
                        }

                        {this.props.stasiMode == false ? null :
                            <div>
                                <ProfileUpdateButton userId={this.props.userId}
                                                     email={this.props.email}
                                                     name={this.props.name}
                                                     avatar={this.props.avatar}
                                                     timestamp={this.props.timestamp}
                                                     onUserDelete={this.onUserDelete} />
                            </div>
                        }



                </div>
            </div>

        );
    }

});

module.exports = UserCard;