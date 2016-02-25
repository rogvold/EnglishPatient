/**
 * Created by sabir on 15.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CommunityMaterialsPanel = require('./CommunityMaterialsPanel');
var TeacherMaterialsPanel = require('./TeacherMaterialsPanel');

var LoginMixin = require('../../../mixins/LoginMixin');

var CoolPreloader = require('../../preloader/CoolPreloader');

var MaterialsPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('MaterialsStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('MaterialsStore');
        var loading = (store.materialsLoading || store.groupsLoading);
        return {
            loading: loading
        }
    },

    getInitialState: function(){
        return {
            searchQuery: undefined
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            minHeight: 100,
            width: 882,
            margin: '0 auto'
        },

        currentBlock: {

        },

        communityBlock: {
            marginTop: 10
        },

        communityHeaderBlock: {
            padding: 10,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 5
        },

        searchPlaceholder: {
            padding: 10,
            backgroundColor: 'white',
            marginBottom: 5,
            marginTop: 5
        }
    },

    onSearchQueryChange: function(evt){
        var val = evt.target.value;
        if (val == undefined){
            val = '';
        }
        val = val.trim();
        this.setState({
            searchQuery: val
        });
    },

    render: function(){
        var userId = LoginMixin.getCurrentUserId();

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.searchPlaceholder}>
                    <div className={'ui form'} >
                        <div className="ui left icon input">
                            <i className="search icon"></i>
                            <input type="text" value={this.state.query}
                                   onChange={this.onSearchQueryChange} placeholder="Введите поисковый запрос..." />
                        </div>
                    </div>
                </div>

                <div style={this.componentStyle.currentBlock}>
                    <TeacherMaterialsPanel searchQuery={this.state.searchQuery} teacherId={userId} />
                </div>

                <div style={this.componentStyle.communityBlock}>
                    <div style={this.componentStyle.communityHeaderBlock}>
                        Материалы других преподавателей
                    </div>

                    <CommunityMaterialsPanel searchQuery={this.state.searchQuery} />
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = MaterialsPanel;