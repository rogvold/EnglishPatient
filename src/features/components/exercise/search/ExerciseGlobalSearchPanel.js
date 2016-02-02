/**
 * Created by sabir on 02.02.16.
 */

var React = require('react');
var assign = require('object-assign');


var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var UserCommunityHeaderPanel = require('../../user_interface/UserCommunityHeaderPanel');

var ExercisesGroupsList = require('../../bunch/exercise/ExercisesGroupsList');

var ExerciseGlobalSearchPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ExercisesStore')],
    getDefaultProps: function () {
        return {

            onSelect: function(ex){

            }

        }
    },

    getInitialState: function () {
        return {
            text: undefined
        }
    },

    getStateFromFlux: function(){
        var store = this.getFlux().store('ExercisesStore');
        var text = (this.state == undefined) ? undefined : this.state.text;
        var teacherGroupsList = store.getSearchTeachersGroupsFactoryList(text);
        return {
            loading: store.loading,
            teacherGroupsList: teacherGroupsList
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        var store = this.getFlux().store('ExercisesStore');
        var teacherGroupsList = store.getSearchTeachersGroupsFactoryList(this.state.text);
        this.setState({
            teachersGroupsList: teacherGroupsList
        });
    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            width: 900,
            margin: '0 auto'
        },

        inputPlaceholder: {
            //padding: 10
        },

        listPlaceholder: {

        },

        itemPlaceholder: {
            marginTop: 5,
            marginBottom: 5,
            backgroundColor: 'white'
        },

        userHeadPlaceholder: {
            padding: 5
        },

        userGroupsPlaceholder: {

        }

    },

    search: function(text){
        var store = this.getFlux().store('ExercisesStore');
        var teacherGroupsList = store.getSearchTeachersGroupsFactoryList(text);
        this.setState({
            text: text,
            teacherGroupsList: teacherGroupsList
        });
    },

    onQueryChange: function(evt){
        var val = evt.target.value;
        if (val == undefined){
            val = '';
        }
        this.search(val);
    },

    onExerciseSelect: function(ex){
        this.props.onSelect(ex);
    },

    getFoundNumbersOfTeacher: function(teacherId){
        var list = (this.state.teacherGroupsList == undefined) ? [] : this.state.teacherGroupsList;
        var n = 0;
        for (var i in list){
            if ((teacherId != undefined) && (list[i].userId != teacherId)){
                continue;
            }
            var groups = list[i].groups;
            for (var j in groups){
                var exercises = groups[j].exercises;
                var k = (exercises == undefined) ? 0 : exercises.length;
                n = n + k;
            }
        }
        return n;
    },

    render: function () {
        var list = (this.state.teacherGroupsList == undefined) ? [] : this.state.teacherGroupsList;
        var totalFoundNumber = this.getFoundNumbersOfTeacher();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.inputPlaceholder}>
                    <div className={'ui form'} >
                        <input onChange={this.onQueryChange}
                            value={this.state.text} placeholder={'Поиск...'} />
                    </div>
                </div>

                <div style={{marginTop: 5, marginBottom: 5}}>
                    Найдено: <b>{totalFoundNumber}</b>
                </div>

                <div style={this.componentStyle.listPlaceholder}>

                    {list.map(function(g, k){
                        var groups = g.groups;
                        var userId = g.userId;
                        var key = 'key_' + k + '_' + userId;
                        var foundNumber = this.getFoundNumbersOfTeacher(userId);
                        var customInfoHtml = 'Найдено <b>' + foundNumber + '</b> упражнений';
                        var st = assign({}, this.componentStyle.itemPlaceholder);
                        if (foundNumber == 0){
                            st = assign({}, {display: 'none'});
                        }

                        return (
                            <div style={st}>

                                <div style={this.componentStyle.userHeadPlaceholder}>
                                    <UserCommunityHeaderPanel
                                        customInfoHtml={customInfoHtml}
                                        userId={userId} />
                                </div>

                                <div style={this.componentStyle.userGroupsPlaceholder}>

                                    <ExercisesGroupsList pageSize={6} groups={groups} editMode={false}
                                                         userId={userId} hoverMode={true} showEmptyGroups={false}
                                                         editMode={false} onExerciseSelect={this.onExerciseSelect} />

                                </div>

                            </div>
                        );
                    }, this)}

                </div>

            </div>
        );
    }

});

module.exports = ExerciseGlobalSearchPanel;