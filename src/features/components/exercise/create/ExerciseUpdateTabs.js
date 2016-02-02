/**
 * Created by sabir on 16.10.15.
 */


var React = require('react');
var assign = require('object-assign');

var UpdateExerciseInfoTab = require('../../exercise/info/UpdateExerciseInfoTab');

var SelfLoadingExerciseUpdatableCardsList = require('../../exercise/create/SelfLoadingExerciseUpdatableCardsList');

var SelfLoadingUpdateExerciseInfoTab = require('../../exercise/info/SelfLoadingUpdateExerciseInfoTab');

var ExerciseUpdateTabs = React.createClass({
    getDefaultProps: function () {
        return {
            //exerciseId: '5c4dk92L9Y',
            exerciseId: undefined,
            teacherId: undefined,
            onExerciseUpdate: function(ex){

            }
        }
    },

    getInitialState: function () {
        return {
            currentTab: 'exercise'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    switchToTab: function(tabName){
        if (this.props.exerciseId == undefined && tabName == 'cards'){
            return;
        }
        console.log('switching to tab ' + tabName);
        this.setState({
            currentTab: tabName
        });
    },

    componentStyle: {
        placeholder: {

        },

        tabsNamePlaceholder: {
            textAlign: 'center',
            height: 30,
            boxSizing: 'border-box',
            widht: '100%',
            borderBottom: '1px solid #EFF0F1',
            backgroundColor: 'white',
            position: 'absolute',
            textAlign: 'center',
            width: '100%',
            zIndex: 2
        },

        tab: {
            padding: 5,
            display: 'inline-block',
            cursor: 'pointer'
        },

        activeTab: {
            borderBottom: '3px solid #FC636B',
            paddingBottom: 3
        },

        tabsPlaceholder: {
            paddingTop: 30
        }
    },

    onExerciseUpdate: function(ex){
        this.props.onExerciseUpdate(ex);
    },

    getCurrentTab: function(){

        if (this.state.currentTab == 'exercise'){
            return (
                <div>
                    <SelfLoadingUpdateExerciseInfoTab
                        onExerciseUpdate={this.onExerciseUpdate}
                        teacherId={this.props.teacherId} exerciseId={this.props.exerciseId} />
                </div>
            );
        }

        if (this.state.currentTab == 'cards'){
            return (
                <div>
                    <SelfLoadingExerciseUpdatableCardsList

                        teacherId={this.props.teacherId}
                        exerciseId={this.props.exerciseId} />
                </div>
            );
        }

    },

    render: function () {
        var cardsTabStyle = assign({}, this.componentStyle.tab, (this.state.currentTab == 'cards') ? this.componentStyle.activeTab : {color: '#A1A4AA'});
        var exerciseTabStyle = assign({marginRight: 15}, this.componentStyle.tab, (this.state.currentTab == 'exercise') ? this.componentStyle.activeTab : {color: '#A1A4AA'});

        var currentTab = this.getCurrentTab();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.tabsNamePlaceholder}>
                    <div style={exerciseTabStyle}  onClick={this.switchToTab.bind(this, 'exercise')} >
                        Информация
                    </div>

                    {this.props.exerciseId == undefined ? null :
                        <div style={cardsTabStyle} onClick={this.switchToTab.bind(this, 'cards')} >
                            Задания
                        </div>
                    }
                </div>

                <div style={this.componentStyle.tabsPlaceholder} >
                    {currentTab}
                </div>


            </div>
        );
    }

});

module.exports = ExerciseUpdateTabs;