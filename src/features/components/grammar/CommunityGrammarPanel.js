/**
 * Created by sabir on 06.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var LoginMixin = require('../../mixins/LoginMixin');

var CommunityTopicsList = require('../topics/CommunityTopicsList');

var CommunityGrammarPanel = React.createClass({
    getDefaultProps: function(){
        return {

        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        }
    },

    render: function(){
        var teacherId = LoginMixin.getCurrentUserId();

        return (
            <div style={this.componentStyle.placeholder} >

                <CommunityTopicsList teacherId={teacherId} topicType={'grammar'} />

            </div>
        );
    }

});

module.exports = CommunityGrammarPanel;