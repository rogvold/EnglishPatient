/**
 * Created by sabir on 10.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var TopbarSettingsMenu = require('./TopbarSettingsMenu');


var CurrentUserMenuItem = React.createClass({
    getDefaultProps: function () {
        return {
            userName: 'Test User',
            avatar: 'http://searchlightoffashion.com/templates/Shab/dleimages/noavatar.png',
            onUserClick: function(){

            },
            dropdownItems: [{
                name: 'Settings',
                icon: 'icon settings',
                onClick: function(){
                    console.log('Settings clicked');
                }
            },{
                name: 'Log Out',
                icon: 'icon sign out',
                onClick: function(){
                    console.log('LogOut clicked');
                },
                content: undefined
            }]
        }
    },

    getInitialState: function () {
        return {
            dropdownVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onClick: function(){
        if (this.state.dropdownVisible == false){
            this.setState({
                dropdownVisible: true
            });
        }
        this.props.onUserClick();
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block',
            cursor: 'pointer'
        },

        avatarPlaceholder: {
            height: '100%',
            padding: 5,
            display: 'inline-block'
        },

        userNamePlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            marginTop: 10,
            fontSize: '14px',
            color: '#898E95'
        },

        avatarDiv: {
            backgroundColor: '#CDCFD2',
            width: 30,
            height: 30,
            verticalAlign: 'top',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid #CDCFD2',
            verticalAlign: 'middle',
            borderRadius: '100px'
        }
    },

    onTopbarClose: function(){
        this.setState({
            dropdownVisible: false
        });
    },

    render: function () {
        var avaStyle = assign({}, this.componentStyle.avatarDiv);
        var avaStyle = assign({}, avaStyle, {backgroundImage: 'url(\'' + this.props.avatar + '\')'});

        return (
            <div style={this.componentStyle.placeholder} onClick={this.onClick} >
                <div style={this.componentStyle.userNamePlaceholder} >
                    {this.props.userName}
                </div>

                <div style={this.componentStyle.avatarPlaceholder} >
                    <div style={avaStyle}></div>
                </div>

                {this.state.dropdownVisible == false ? null :
                    <TopbarSettingsMenu items={this.props.dropdownItems} onClose={this.onTopbarClose} />
                }

            </div>
        );
    }

});


module.exports = CurrentUserMenuItem;