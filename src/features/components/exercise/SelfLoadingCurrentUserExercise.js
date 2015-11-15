/**
 * Created by sabir on 02.10.15.
 */
var React = require('react');
var SelfLoadingUserExercise = require('./SelfLoadingUserExercise');
var ParseMixin = require('../../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;

var SelfLoadingCurrentUserExercise = React.createClass({
    getDefaultProps: function () {
        return {
            exerciseId: undefined,
            onLoad: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            userId: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        ParseMixin.initParse();
        var currentUser = Parse.User.current();
        if (currentUser != undefined){
            this.setState({
                userId: currentUser.id
            });
        }
    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <SelfLoadingUserExercise onLoad={this.props.onLoad} userId={this.state.userId} exerciseId={this.props.exerciseId} />
            </div>
        );
    }

});

module.exports = SelfLoadingCurrentUserExercise;