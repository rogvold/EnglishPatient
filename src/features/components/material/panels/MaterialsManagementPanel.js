/**
 * Created by sabir on 15.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MaterialCreateButton = require('../buttons/MaterialCreateButton');
var MaterialGroupCreateButton = require('../buttons/MaterialGroupCreateButton');

var MaterialsManagementPanel = React.createClass({
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

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {
            //width: 865,
            width: 882,
            position: 'relative',
            //paddingLeft: 8,
            margin: '0 auto',
            backgroundColor: 'white'
        },

        contentPlaceholder: {

        },

        createNewBlock: {
            padding: 5,
            height: 47,
            position: 'relative',
            borderBottom: '1px solid #EFF0F1'
        },

        buttonsPlaceholder: {
            position: 'absolute',
            right: 10,
            top: 5
        },

        searchPlaceholder: {

        }
    },

    getAllGroupsList: function(){
        var store = this.getFlux().store('MaterialsStore');
        var groups = store.getTopicGroups(undefined);
        return groups;
    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.buttonsPlaceholder}>

                        <MaterialCreateButton
                                              teacherId={this.props.teacherId}
                                              topicId={this.props.topicId}
                                              allGroupsList={this.getAllGroupsList()}
                            />

                        <MaterialGroupCreateButton teacherId={this.props.teacherId}
                                                   topicId={this.props.topicId}
                            />

                </div>

            </div>
        );
    }

});

module.exports = MaterialsManagementPanel;