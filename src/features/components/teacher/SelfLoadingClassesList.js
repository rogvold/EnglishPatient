/**
 * Created by sabir on 06.10.15.
 */
var React = require('react');
var ClassMixin = require('../../mixins/ClassMixin');
var ParseMixin = require('../../../react/mixins/commonMixins/ParseMixin');

var ClassesList = require('./ClassesList');

var SelfLoadingClassesList = React.createClass({
    getDefaultProps: function () {
        return {
            classId: undefined,
            onLoad: function(classes){

            },
            onClassSelect: function(classId){

            }
        }
    },

    getInitialState: function () {
        return {
            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        ParseMixin.initParse();
        this.loadClasses(function(classes){
            this.props.onLoad(classes);
        }.bind(this));
    },

    loadClasses: function(callback){
        this.setState({
            loading: true
        });
        ClassMixin.loadTeacherClasses(this.props.teacherId, function(classes){
            this.setState({
                classes: classes,
                loading: false
            });
            callback(classes);
        }.bind(this));
    },


    componentStyle: {
        placeholder: {}
    },

    onItemClick: function(classId){
        this.props.onClassSelect(classId);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <ClassesList classes={this.state.classes} onItemClick={this.onItemClick} />
            </div>
        );
    }

});

module.exports = SelfLoadingClassesList;