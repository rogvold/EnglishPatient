/**
 * Created by sabir on 29.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var LoginMixin = require('../../mixins/LoginMixin');

var ExercisesRegistryPanel = require('./ExercisesRegistryPanel');
var CoolPreloader = require('../preloader/CoolPreloader');

var ExerciseSearchRegistryPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ExercisesStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ExercisesStore');
        var loading = store.loading;

        return {
            loading: loading,
            searchQuery: '',
            query: ''
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
            width: '100%'
        },

        currentUserExercisesBlock: {

        },

        itemPlaceholder: {
            marginTop: 10,
            marginBottom: 10
        },

        listPlaceholder: {

        },

        searchPlaceholder: {
            backgroundColor: 'white',
            width: 900,
            margin: '0 auto',
            marginBottom: 10,
            padding: 10
        }

    },

    onQueryChange: function(evt){
        var val = evt.target.value;
        if (val == undefined){
            val = '';
        }
        var mode = 'extended';
        if (val == ''){
            mode = 'compact';
            this.search(val);
        }
        this.setState({
            searchQuery: val
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
        this.setState({
            query: this.state.searchQuery
        });
    },

    render: function(){
        var user = LoginMixin.getCurrentUser();
        var currentUserId = (user == undefined) ? undefined : user.id;
        var communityUsers = this.getFlux().store('ExercisesStore').getCommunityUsersIds(currentUserId);
        var sq = (this.state.searchQuery == undefined) ? '' : this.state.searchQuery;
        var searchingMode = (sq.trim() != '');


        return (
            <div style={this.componentStyle.placeholder} >

                <div className={'ui form'} style={this.componentStyle.searchPlaceholder}>
                    <div className={'ui action input'} >
                        <input placeholder={'Поиск по упражнениям'} style={{height: 36}}
                               value={this.state.searchQuery} onChange={this.onQueryChange}
                               onKeyUp={this.onQueryKeyUp}
                            />
                        <button className="ui icon patientPrimary button" disabled={!searchingMode}
                                onClick={this.onSearch} >
                            <i className="search icon"></i>
                        </button>
                    </div>
                </div>

                {this.state.loading == true ? null :
                    <div style={this.componentStyle.currentUserExercisesBlock}>
                        <ExercisesRegistryPanel
                            searchQuery={this.state.query}
                            teacherId={currentUserId} />
                    </div>
                }

                {this.state.loading == true ? null :
                    <div style={this.componentStyle.listPlaceholder}>
                        {communityUsers.map(function(uId, k){
                            var key = 'com_' + k;

                            return (
                                <div key={key} style={this.componentStyle.itemPlaceholder}>

                                    <ExercisesRegistryPanel
                                        searchQuery={this.state.query}
                                        teacherId={uId} />

                                </div>
                            );

                        }, this)}
                    </div>
                }

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = ExerciseSearchRegistryPanel;