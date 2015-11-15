/**
 * Created by sabir on 31.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var ExercisesGroupsList = require('../../bunch/exercise/ExercisesGroupsList');
var ExerciseMixin = require('../../../mixins/ExerciseMixin');

var ExercisesSearchPanel = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,

            onSelect: function(ex){

            }

        }
    },

    getInitialState: function () {
        return {
            loading: false,
            groups: [],
            searchGroups: [],
            query: ''
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var teacherId = nextProps.teacherId;
        this.load(teacherId, function(groups){
            console.log('groups loaded: ', groups);
        });
    },

    componentDidMount: function () {
        var teacherId = this.props.teacherId;
        this.load(teacherId, function(groups){
            console.log('groups loaded: ', groups);
        });
    },


    load: function(teacherId, callback){
        this.setState({
            loading: true,
            groups: []
        });
        console.log('loading groups !! -- !!');
        var self = this;
        ExerciseMixin.loadGroupsWithExercises(teacherId, function(list){
            console.log('loaded groups: ', list);
            self.setState({
                loading: false,
                groups: list,
                searchGroups: list
            });

            callback(list);
        });
    },

    componentStyle: {
        placeholder: {
            width: 900,
            margin: '0 auto'
        },

        searchFieldPlaceholder: {
            marginBottom: 10
        }
    },

    onExerciseSelect: function(ex){
        console.log('onExerciseSelect occured: ex = ', ex);
        this.props.onSelect(ex);
    },

    search: function(text){
        var searchGroups = ExerciseMixin.searchInGroupsFactoryList(this.state.groups, text);
        var arr = [];
        for (var i in searchGroups){
            var gr = searchGroups[i];
            if (gr.exercises == undefined || gr.exercises.length == 0){
                continue;
            }
            arr.push(gr);
        }
        console.log('search results: ', arr);
        this.setState({
            searchGroups: arr,
            query: text
        });
    },

    onQueryChange: function(evt){
        var val = evt.target.value;
        if (val == undefined){
            val = '';
        }
        this.search(val);
    },

    getSearchNumber: function(){
        var list = this.state.searchGroups;
        var n = 0;
        var map = {};
        for (var i in list){
            var gr = list[i];
            var exercises = (gr.exercises == undefined) ? [] : gr.exercises;
            for (var j in exercises){
                var ex = exercises[j];
                map[ex.id] = ex;
            }
        }
        for (var key in map){
            n++;
        }
        return n;
    },

    render: function () {
        var groups = this.state.searchGroups;
        var searchNumber = this.getSearchNumber();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.searchFieldPlaceholder} className={'ui form'}>
                    <div className="field">
                        <input type="text" value={this.state.query} placeholder={'Введите поисковый запрос'} onChange={this.onQueryChange} />
                    </div>
                </div>


                {groups.length == 0 ?
                    <div>
                        По вашему запросу ничего не найдено
                    </div>
                    :
                    <div>

                        Результатов: <b>{searchNumber}</b>

                        <ExercisesGroupsList pageSize={6} groups={groups} editMode={false}
                                             userId={this.props.teacherId} hoverMode={true}
                                             exitMode={false} onExerciseSelect={this.onExerciseSelect}
                            />
                    </div>

                }


                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>


            </div>
        );
    }

});

module.exports = ExercisesSearchPanel;