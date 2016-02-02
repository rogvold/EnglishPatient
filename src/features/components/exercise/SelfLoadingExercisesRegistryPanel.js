/**
 * Created by sabir on 07.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var ExerciseMixin = require('../../mixins/ExerciseMixin');

var CreateNewExerciseButton = require('./create/button/CreateNewExerciseButton');
var CreateNewExerciseGroupButton = require('../bunch/exercise/CreateNewExerciseGroupButton');

var ExercisesGroupsList = require('../bunch/exercise/ExercisesGroupsList');

var ExerciseGroupsCardsList = require('./group/ExerciseGroupsCardsList');

var SelfLoadingExercisesRegistryPanel = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            groups: [],
            searchGroups: [],
            mode: 'compact',
            searchingMode: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        var teacherId = this.props.teacherId;
        this.load(teacherId, function(results){
            console.log('loaded: ', results);
        });
    },

    load: function(teacherId, callback){
        console.log('SelfLoadingExercisesRegistryPanel: load occured: teacherId = ', teacherId);
        if (teacherId == undefined){
            return;
        }
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
            if (callback != undefined){
                callback(list);
            }
        });
    },

    componentStyle: {
        placeholder: {
            width: 900,
            position: 'relative',
            margin: '0 auto'
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
        }

    },

    switchMode: function(mode){
        this.setState({
            mode: mode
        });
    },

    onQueryChange: function(evt){
        var val = evt.target.value;
        if (val == undefined){
            val = '';
        }
        var mode = 'extended';
        var searchGroups = this.state.searchGroups;
        if (val == ''){
            mode = 'compact';
            searchGroups = this.state.groups;
        }

        this.setState({
            searchQuery: val,
            mode: mode,
            searchGroups: searchGroups
        });
    },

    onQueryKeyUp: function(event){
        if(event.keyCode == 13){
            var val = event.target.value;
            this.search();
        }
    },

    onSearch: function(){
        this.search();
    },

    search: function(){
        var groups = this.state.groups;
        var text = (this.state.searchQuery == undefined) ? '' : this.state.searchQuery;
        if (text == ''){
            return;
        }
        this.setState({
            loading: true,
            mode: 'extended'
        });

        //this.setState({
        //    loading: true
        //});
        console.log('search: all groups: ', groups);
        var searchGroups = ExerciseMixin.searchInGroupsFactoryList(groups, text);
        var arr = [];

        for (var i in searchGroups){
            var gr = searchGroups[i];
            if (gr.exercises == undefined || gr.exercises.length == 0){
                continue;
            }
            arr.push(gr);
        }

        console.log('found groups: ', arr);

        this.setState({
            searchGroups: arr,
            loading: false
        });
    },

    render: function () {
        var sq = (this.state.searchQuery == undefined) ? '' : this.state.searchQuery;
        var searchingMode = (sq.trim() != '');

        return (
            <div style={this.componentStyle.placeholder}>

                    <div style={this.componentStyle.createExerciseButtonPlaceholder}>

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

                        <div className={'ui form'} style={this.componentStyle.searchPlaceholder}>
                            <div className={'ui action input'} >
                                <input placeholder={'Введите поисковый запрос'} style={{height: 36}}
                                       value={this.state.searchQuery} onChange={this.onQueryChange}
                                        onKeyUp={this.onQueryKeyUp}
                                    />
                                <button className="ui icon patientPrimary button" disabled={!searchingMode} onClick={this.onSearch} >
                                    <i className="search icon"></i>
                                </button>
                            </div>
                        </div>

                        <CreateNewExerciseGroupButton style={{float: 'left'}}
                                                      teacherId={this.props.teacherId}
                                                      buttonClassName={'ui basic button'}
                                                      onGroupCreate={this.onGroupCreate} />

                        <CreateNewExerciseButton style={{float: 'left'}}
                                                 teacherId={this.props.teacherId}
                                                 onExerciseCreate={this.onExerciseCreate}
                                                 buttonClassName={'ui basic button'}
                            />

                    </div>

                <div style={this.componentStyle.contentPlaceholder}>
                            {this.state.mode == 'extended' ?
                                <div>
                                    <ExercisesGroupsList onGroupUpdate={this.onGroupUpdate}
                                                         onExerciseUpdate={this.onExerciseUpdate}
                                                         pageSize={6} userId={this.props.teacherId} groups={this.state.searchGroups} />
                                </div>: null
                            }

                            {this.state.mode == 'compact' ?
                                <div>
                                    <ExerciseGroupsCardsList
                                        userId={this.props.teacherId}
                                        groups={this.state.searchGroups}/>
                                </div> : null
                            }
                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : ' ') }>
                    <div className="ui text loader">Загрузка...</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingExercisesRegistryPanel;