/**
 * Created by sabir on 29.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var LoginMixin = require('../../mixins/LoginMixin');

var CoolPreloader = require('../preloader/CoolPreloader');

var ExerciseGroupsCardsList = require('./group/ExerciseGroupsCardsList');
var ExercisesGroupsList = require('../bunch/exercise/ExercisesGroupsList');

var UserCommunityHeaderPanel = require('../user_interface/UserCommunityHeaderPanel');

var ExerciseMixin = require('../../mixins/ExerciseMixin');

var CreateNewExerciseButton = require('./create/button/CreateNewExerciseButton');
var CreateNewExerciseGroupButton = require('../bunch/exercise/CreateNewExerciseGroupButton');


var ExercisesRegistryPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ExercisesStore')],

    getDefaultProps: function(){
        return {
            teacherId: undefined,

            searchQuery: ''
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ExercisesStore');
        var loading = store.loading;
        var teacherId = this.props.teacherId;
        var groups = store.getTeacherGroupsWithExercises(teacherId);

        return {
            loading: loading,
            groups: groups
        }
    },

    getInitialState: function(){
        return {
            mode: 'compact'
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },



    componentStyle: {
        placeholder: {
            width: 900,
            //width: 890,
            position: 'relative',
            margin: '0 auto',
            minHeight: 100
        },

        headerPlaceholder: {
            backgroundColor: 'white'  ,
            padding: 10,
            borderBottom: '1px solid #EFF0F1'
        },

        exercisesListPlaceholder: {
            maxHeight: '100%',
            overflowY: 'auto'
        },

        createExerciseButtonPlaceholder: {
            paddingTop: 5,
            paddingBottom: 5,
            height: 46,
            backgroundColor: 'white',
            width: 900,
            paddingRight: 8,
            paddingLeft: 10,
            margin: '0 auto',
            borderLeft: '1px solid #EFF0F1',
            borderRight: '1px solid #EFF0F1',
            position: 'relative'
            //borderLeft: '1px solid '
        },

        contentPlaceholder: {
            margin: '0 auto'
        },

        switchPanel: {
            width: '100%',
            padding: 5
        },

        searchPlaceholder: {
            display: 'inline-block',
            width: 300
        },

        createButtonsPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            float: 'right',
            marginLeft: 5
        }
    },

    switchMode: function(mode){
        this.setState({
            mode: mode
        });
    },




    getFilteredGroups: function(){
        var groups = this.state.groups;
        var text = (this.props.searchQuery == undefined) ? '' : this.props.searchQuery;
        if (text == ''){
            return groups;
        }

        var searchGroups = ExerciseMixin.searchInGroupsFactoryList(groups, text);
        var arr = [];

        for (var i in searchGroups){
            var gr = searchGroups[i];
            if (gr.exercises == undefined || gr.exercises.length == 0){
                continue;
            }
            arr.push(gr);
        }

        return arr;
    },

    onGroupCreate: function(g){
        if (g == undefined){
            return;
        }
        this.getFlux().actions.loadExercisesGroupsByIds([g.id]);
    },

    onExerciseCreate: function(ex){
        if (ex == undefined){
            return;
        }
        this.getFlux().actions.loadExercise(ex.id);
    },

    render: function(){
        var teacherId = this.props.teacherId;
        var user = (teacherId == undefined) ? undefined : this.getFlux().store('UsersStore').usersMap[teacherId];
        var currentUser = LoginMixin.getCurrentUser();
        var currentUserId = (currentUser == undefined) ? undefined : currentUser.id;
        var groups = this.getFilteredGroups();

        var sq = this.props.searchQuery;
        var searchingMode = (sq != undefined && sq.trim()!= '');

        var exercises = this.getFlux().store('ExercisesStore').getTeacherExercises(teacherId);
        var exercisesNumber = exercises.length;
        var editMode = (teacherId == currentUserId);
        var customInfoHtml = 'Создано упражнений: <b>' + exercisesNumber + '</b>';
        if (editMode == true){
            customInfoHtml = 'Мои упражнения. Создано: <b>' + exercisesNumber + '</b>';
        }

        var mode = this.state.mode;
        if (searchingMode == true){
            mode = 'extended';
        }

        var st = assign({}, this.componentStyle.placeholder);
        if (groups.length == 0 && (currentUserId != teacherId)){
            st = assign({}, st, {display: 'none'});
        }


        return (
            <div style={st} >

                <div style={this.componentStyle.headerPlaceholder}>

                    <UserCommunityHeaderPanel
                        customInfoHtml={customInfoHtml}
                        userId={teacherId} />



                    {searchingMode == true ? null :
                        <div style={{display: 'inline-block', float: 'right'}} >
                            {this.state.mode == 'extended' ?
                                <div className={'ui basic button'} style={{float: 'right'}} onClick={this.switchMode.bind(this, 'compact')} >
                                    <i className={'icon grid layout'} style={{marginRight: 0}} ></i>
                                </div> : null }

                            {this.state.mode == 'compact' ?
                                <div className={'ui basic button'} style={{float: 'right'}}  onClick={this.switchMode.bind(this, 'extended')} >
                                    <i className={'icon list layout'} style={{marginRight: 0}} ></i>
                                </div> : null }
                        </div>
                    }

                    {editMode == false ? null :
                        <div style={this.componentStyle.createButtonsPlaceholder}>

                            <span>
                                <CreateNewExerciseGroupButton
                                    teacherId={teacherId}
                                    buttonClassName={'ui basic button'}
                                    onGroupCreate={this.onGroupCreate} />
                            </span>

                            <span>
                                <CreateNewExerciseButton
                                    teacherId={this.props.teacherId}
                                    onExerciseCreate={this.onExerciseCreate}
                                    buttonClassName={'ui basic button'} />
                            </span>

                        </div>
                    }

                </div>



                <div style={this.componentStyle.contentPlaceholder}>
                    {mode == 'extended' ?
                        <div>
                            <ExercisesGroupsList
                                                 pageSize={6} userId={this.props.teacherId}
                                                 groups={groups} />
                        </div>: null
                    }

                    {mode == 'compact' ?
                        <div>
                            <ExerciseGroupsCardsList
                                userId={this.props.teacherId}
                                groups={groups}/>
                        </div> : null
                    }
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = ExercisesRegistryPanel;