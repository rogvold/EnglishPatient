/**
 * Created by sabir on 02.12.15.
 */


//var React = require('react/addons');
var React = require('react');
var assign = require('object-assign');

var LoginMixin = require('../../../mixins/LoginMixin');

var SharedClassPanel = require('../../../components/class/share/SharedClassPanel');


var SharedClassApp = React.createClass({
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
        var classId = this.props.params.classId;
        return (
            <div style={this.componentStyle.placeholder}>
                <SharedClassPanel classId={classId} user={this.state.user} />
            </div>
        );
    }

});

module.exports = SharedClassApp;