/**
 * Created by sabir on 03.10.15.
 */
var React = require('react');
var ListOfSelfLoadingCurrentUserExercises = require('../exercise/ListOfSelfLoadingCurrentUserExercises');

var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;


var SelfLoadingExercisesTabs = React.createClass({
    getDefaultProps: function () {
        return {
            exercisesTabs: []
        }
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {
        console.log('SelfLoadingExercisesTabs: componentWillReceiveProps: nextProps = ', nextProps);
    },

    componentDidMount: function () {
        console.log('SelfLoadingExercisesTabs: componentDidMount: props = ', this.props);
    },

    componentStyle: {
        placeholder: {}
    },

    handleSelected: function(){

    },

    render: function () {
        var list = this.props.exercisesTabs == undefined ? [] : this.props.exercisesTabs;

        return (
            <div style={this.componentStyle.placeholder}>
                <Tabs onSelect={this.handleSelected} selectedIndex={0} >
                    <TabList>
                        {list.map(function(tab, k){
                            var key = 'tab_name_' + k;
                            var name = tab.name;
                            return (
                                <Tab key={key}>
                                    {name}
                                </Tab>
                            );
                        }, this)}
                    </TabList>

                    {list.map(function(tab, k){
                        var key = 'tab_panel_' + k;
                        var exercisesIds = tab.exercises.map(function(e){return e.id});
                        return (
                            <TabPanel key={key}>
                                <ListOfSelfLoadingCurrentUserExercises exercisesIdsList={exercisesIds} />
                            </TabPanel>
                        );
                    }, this)}

                </Tabs>
            </div>
        );
    }

});

module.exports = SelfLoadingExercisesTabs;