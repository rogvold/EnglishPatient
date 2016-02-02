/**
 * Created by sabir on 12.10.15.
 */

var React = require('react/addons');
var assign = require('object-assign');

var LoginMixin = require('../../mixins/LoginMixin');

var ParseMixin = require('../../../react/mixins/commonMixins/ParseMixin');
var CommonMixin = require('../../../react/mixins/commonMixins/CommonMixin');

var ClassMixin = require('../../mixins/ClassMixin');

var LeftSidebarTemplate = require('../../components/templates/LeftSidebarTemplate');
var SelfLoadingLeftSidebarClassesList = require('../../components/class/list/SelfLoadingLeftSidebarClassesList');
var LoadingSegment = require('../../components/segment/LoadingSegment');

var LoginApp = require('./LoginApp');

var TeacherHeader = require('../../components/header/teacher/TeacherHeader');

var GrammarPanel = require('../../components/grammar/GrammarPanel');

var TeacherSidebarButtons = require('../../components/sidebar/TeacherSidebarButtons');

var Fluxxor = require('fluxxor');

var MaterialsStore = require('../../flux/stores/MaterialsStore');

var stores = {
    MaterialsStore: new MaterialsStore()
};

var MaterialsActions = require('../../flux/actions/MaterialsActions');
var actions = assign({}, MaterialsActions);

var flux = new Fluxxor.Flux(stores, actions);
flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);
    }
});

var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var FluxMixin = Fluxxor.FluxMixin(React);

var FluxApp = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('MaterialsStore')],

    getDefaultProps: function () {
        return {

        }
    },

    getInitialState: function () {
        return {
            loading: false,
            users: [],
            selectedTabName: 'users',
            loggedIn: false,
            user: (LoginMixin.getCurrentUser() == undefined ) ? {} : LoginMixin.getCurrentUser()
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        if (flux == undefined){
            return;
        }
        var store = flux.store('MaterialsStore');
        var state = store.getState();
        return state;
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        console.log('FluxApp: componentDidMount: props = ', this.props);
        ParseMixin.initParse();
        if (LoginMixin.isLoggedIn() == false){
            return false;
        }else{
            this.setState({
                loggedIn: true
            });
        }
        document.title = 'Flux';
        console.log('Flux App mounted');
        console.log(this.props.params);


        var flux = this.getFlux();
        flux.actions.loadMaterialsAndGroups();
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

                <TeacherSidebarButtons />

                <SelfLoadingLeftSidebarClassesList  teacherId={this.state.user.id}
                                                    addClassMode={true} selectedClassId={this.props.params.classId} />
            </div>
        );
    },

    onLogout: function(){
        CommonMixin.forceTransitionTo('/#/');
    },

    getHeader: function(){
        var userId = this.state.user.id;
        return (
            <TeacherHeader userId={userId} activeTab={'flux'} onLogout={this.onLogout}  />
        );
    },

    logChange: function(val, b){
        console.log(val, b);
        console.log(typeof val);
    },

    getContent: function(){
        var materialsLoading = this.state.materialsLoading;
        var groupsFactoryList = this.state.groupsFactoryList;
        console.log('groupsFactoryList = ', groupsFactoryList);
        return (
            <div>

                {materialsLoading == false ? null :
                    <div>
                        materials are loading...
                    </div>
                }

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

module.exports = FluxApp;