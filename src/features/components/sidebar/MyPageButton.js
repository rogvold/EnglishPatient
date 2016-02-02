/**
 * Created by sabir on 16.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var LoginMixin = require('../../mixins/LoginMixin');
var Link = require('react-router').Link;

var MyPageButton = React.createClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            paddingBottom: 5,
            fontSize: 14,
            lineHeight: '16px',
            color: '#B3BCC4',
            borderBottom: '1px dotted rgba(103, 109, 118, 0.18)',
            cursor: 'pointer',
            height: 22
        }
    },

    render: function () {
        var currentUserId = (LoginMixin.getCurrentUser() == undefined) ? '' : LoginMixin.getCurrentUser().id;
        var url = '/profile/' + currentUserId;
        var isActive = false;
        if (window.location.href.indexOf(url) > -1){
            isActive = true;
        }
        var st = assign({}, {marginBottom: 0, paddingLeft: 10,
                                            paddingRight: 10,
            paddingTop: 6, height: 30, color: 'white', paddingBottom: 4});

        var linkStyle = assign({}, this.componentStyle.placeholder);

        if (isActive == true){
            st = assign({}, st, {backgroundColor: '#1B2432', color: 'white'});
            linkStyle = assign({}, linkStyle, {color: 'white'});
        }


        return (
            <div style={st} >
                <Link className={''}
                      style={linkStyle} to={'/profile/' + currentUserId} >
                    Моя страница
                </Link>
            </div>
        );
    }

});

module.exports = MyPageButton;