/**
 * Created by sabir on 26.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var LoginMixin = require('../../mixins/LoginMixin');

var BootstrapComponent = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function () {
        return {

        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.bootstrap();
    },

    bootstrap: function(){
        var flux = this.getFlux();
        if (flux == undefined){
            return;
        }
        var user = LoginMixin.getCurrentUser();
        var role = (user == undefined) ? undefined : user.role;
        //flux.actions.loadMaterialsAndGroups();

        if (user != undefined){
            flux.actions.loadUser(user.id);
            flux.actions.loadExtraMaterialsGroups();
        }

        if (role == 'teacher'){
            flux.actions.loadTeacherMaterialsAndGroups();
            flux.actions.loadAllTopics();
            flux.actions.loadAllAvailableExercises();
            flux.actions.loadAllDialogs();
            flux.actions.loadTeacherClasses(user.id);

            flux.actions.loadTeacherCourses(user.id);
            flux.actions.loadCommunityCourses(user.id);

            setTimeout(function(){
                flux.actions.loadPublicCommunityMaterials();
            }.bind(this), 1000);
        }

    },

    componentStyle: {
        placeholder: {
            display: 'none'
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

            </div>
        );
    }

});

module.exports = BootstrapComponent;