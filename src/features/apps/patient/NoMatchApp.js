/**
 * Created by sabir on 02.12.15.
 */

//var React = require('react/addons'); // it works with that
var React = require('react');
var assign = require('object-assign');

var LeftSidebarTemplate = require('../../components/templates/LeftSidebarTemplate');

var LoginMixin = require('../../mixins/LoginMixin');

var NoMatchApp = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: 'jnM2pCK62I'
        }
    },

    getInitialState: function () {
        return {
            text: 'color',
            start: 0,
            end: 0,
            //url: 'http://www.youtube.com/watch?v=e-ORhEE9VVg',
            url: 'http://www.youtube.com/watch?v=fOdOw_Dsf54',
            loading: false,
            users: [],
            selectedTabName: 'users',
            loggedIn: false,
            user: (LoginMixin.getCurrentUser() == undefined ) ? {} : LoginMixin.getCurrentUser()
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        }
    },


    getFooter: function(){

    },



    onPause: function(){
        this.setState({

        });
    },


    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                404 <br/>
                Not found


            </div>
        );
    }

});

module.exports = NoMatchApp;