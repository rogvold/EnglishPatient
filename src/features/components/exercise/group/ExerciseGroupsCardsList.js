/**
 * Created by sabir on 29.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogCard = require('../../dialog_exercise/card/DialogCard');

var TopicDialog = require('../../topics/dialog/TopicDialog');

var SimpleTopicHeaderPanel = require('../../topics/panels/SimpleTopicHeaderPanel');

var ExercisesBunch = require('../../bunch/exercise/ExercisesBunch');


var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);


var ExercisesGroupsCardsList = React.createClass({
    mixins: [FluxMixin],
    getDefaultProps: function () {
        return {
            userId: undefined,
            groups: []
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false,
            selectedGroup: undefined,
            selectedExercises: []
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: '100%',
            padding: 5,
            backgroundColor: 'white',
            margin: '0 auto'
        },

        list: {

        },

        itemStyle: {
            display: 'inline-block',
            margin: 5,
            width: 210,
            height: 160,
            cursor: 'pointer'
        },

        exercisesList: {
            width: 880  ,
            margin: '0 auto',
            marginTop: 10
        }


    },

    onCardClick: function(group, exercises){
        this.setState({
            selectedGroup: group,
            dialogVisible: true,
            selectedExercises: exercises
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    getDialogContent: function(){
        var g = this.state.selectedGroup;
        var exercises = (this.state.selectedExercises == undefined) ? [] : this.state.selectedExercises;

        if (g == undefined){
            g = {
                name: 'Unsorted',
                description: undefined
            }
        }

        return (
            <div>
                <SimpleTopicHeaderPanel name={g.name}
                                        description={g.description} avatar={g.avatar} />

                <div style={this.componentStyle.exercisesList}>
                    {exercises.length == 0 ?
                        <div className={'ui message'} >
                            в этой категории еще нет упражнений
                        </div> :
                        <div>
                            <ExercisesBunch exercises={exercises}
                                            userId={this.props.userId} bunchId={g.id}
                                            name={g.name} description={g.description}
                                            avatar={g.avatar}
                                />
                        </div>
                    }
                </div>
            </div>
        );
    },

    render: function () {
        var list = this.props.groups;
        console.log('ExercisesGroupsCardsList: list = ', list);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.list}>

                    {list.map(function(g, k){
                        var key = 'group_' + k;
                        var gr = g.group;
                        var exercises = g.exercises;
                        var id = (gr == undefined) ? undefined : gr.id;
                        var name = (gr == undefined) ? 'Unsorted' : gr.name;
                        var avatar = (gr == undefined) ? 'http://www.englishpatient.org/app/assets/img/stars.jpg' : gr.avatar;
                        var onClick = this.onCardClick.bind(this, gr, exercises);
                        return (
                            <div key={key} style={this.componentStyle.itemStyle} onClick={onClick} >
                                <DialogCard bunchId={id} groupId={id} avatar={avatar} name={name} />
                            </div>
                        );

                    }, this)}

                </div>

                {this.state.dialogVisible == false ? null :
                    <TopicDialog
                        content={this.getDialogContent()}
                        onClose={this.onClose}
                        visible={true}  />
                }

            </div>
        );
    }

});

module.exports = ExercisesGroupsCardsList;