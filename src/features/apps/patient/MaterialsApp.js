/**
 * Created by sabir on 12.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var LoginMixin = require('../../mixins/LoginMixin');

var ParseMixin = require('../../../react/mixins/commonMixins/ParseMixin');
var CommonMixin = require('../../../react/mixins/commonMixins/CommonMixin');

var MaterialsMixin = require('../../mixins/MaterialsMixin');

var LeftSidebarTemplate = require('../../components/templates/LeftSidebarTemplate');
var SelfLoadingLeftSidebarClassesList = require('../../components/class/list/SelfLoadingLeftSidebarClassesList');
var LoadingSegment = require('../../components/segment/LoadingSegment');

var LoginApp = require('./LoginApp');

var TeacherHeader = require('../../components/header/teacher/TeacherHeader');

var MaterialCard = require('../../components/material/list/MaterialCard');
var PagedCardsList = require('../../components/material/list/PagedCardsList');

var SelfLoadingMaterialsList = require('../../components/material/list/SelfLoadingMaterialsList');

var IndexApp = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: 'jnM2pCK62I'
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            loggedIn: false,
            materials: [],
            user: (LoginMixin.getCurrentUser() == undefined ) ? {} : LoginMixin.getCurrentUser()
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        ParseMixin.initParse();
        if (LoginMixin.isLoggedIn() == false){
            return false;
        }else{
            this.setState({
                loggedIn: true
            });
        }
        console.log('Exercises App mounted');
        console.log(this.props.params);
        //this.loadMaterials(this.state.user.id);
    },

    componentStyle: {
        placeholder: {}
    },

    updateAuth: function(){
        ParseMixin.initParse();
        if (LoginMixin.isLoggedIn() == false){
            this.setState({
                loggedIn: false
            });
        }else{
            this.setState({
                loggedIn: true
            });
        }
    },


    getSidebar: function(){
        return (
            <div>
                <SelfLoadingLeftSidebarClassesList  teacherId={this.state.user.id}
                    selectedClassId={this.props.params.classId} />
            </div>
        );
    },

    onLogout: function(){
        var url = '/#/';
        CommonMixin.forceTransitionTo(url);
    },

    getHeader: function(){
        var userId = this.state.user.id;
        return (
            <TeacherHeader userId={userId} activeTab={'materials'} onLogout={this.onLogout}  />
        );
    },

    loadMaterials: function(teacherId){
          this.setState({
              loading: true
          });
        MaterialsMixin.loadTeacherMaterials(teacherId, function(materials){
            this.setState({
                loading: false,
                materials: materials
            });
            console.log('--->>> materials loaded: ', materials);
        }.bind(this));
    },

    logChange: function(val, b){
        console.log(val, b);
        console.log(typeof val);
    },

    getContent: function(){
        var teacherId = this.state.user.id;
        return (
            <div>
                <SelfLoadingMaterialsList
                    searchMode={true}
                    teacherId={teacherId} />
            </div>
        );
    },

    getFooter: function(){

    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                {this.state.loggedIn == false ?
                    <div>
                        <LoginApp />
                    </div> :
                    <LeftSidebarTemplate sidebar={this.getSidebar()} header={this.getHeader()} footer={this.getFooter()} content={this.getContent()} />
                }
            </div>
        );
    }

});

module.exports = IndexApp;