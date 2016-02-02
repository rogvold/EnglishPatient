/**
 * Created by sabir on 13.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var ExercisesBunch = require('./ExercisesBunch');

var ExercisesGroupsList = React.createClass({
    getDefaultProps: function () {
        return {
            groups: [],
            pageSize: 6,
            userId: undefined,
            pageSize: 6,
            onExerciseUpdate: function(ex){

            },
            editMode: true,
            hoverMode: false,

            showEmptyGroups: true,

            onGroupUpdate: function(g){

            },

            onExerciseSelect: function(ex){

            }
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    onExerciseUpdate: function(ex){
          this.props.onExerciseUpdate(ex);
    },

    onGroupUpdate: function(g){
        this.props.onGroupUpdate(g);
    },

    onExerciseSelect: function(ex){
        this.props.onExerciseSelect(ex);
    },

    render: function () {
        var list = this.props.groups;
        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(g, n){
                    var gr = g.group;
                    var id = (gr == undefined) ? undefined : gr.id;
                    var name = (gr == undefined) ? undefined : gr.name;
                    var avatar = (gr == undefined) ? undefined : gr.avatar;
                    var description = (gr == undefined) ? undefined : gr.description;
                    var key = 'group-bunch-' + (id == undefined ? 'undefined' : id) + '-' + n;

                    var boundGroupUpdate = this.onGroupUpdate.bind(this);
                    var boundExerciseUpdate = this.onExerciseUpdate.bind(this);

                    var shouldShow = true;
                    if (g.exercises == undefined || g.exercises.length == 0){
                        if (this.props.showEmptyGroups == false){
                            shouldShow = false;
                        }
                    }

                    return (
                        <div>
                            {shouldShow == false ? null :
                                <ExercisesBunch onGroupUpdate={this.onGroupUpdate}
                                                bunchId={id} groupId={id} onExerciseSelect={this.onExerciseSelect}
                                                onExerciseUpdate={this.onExerciseUpdate} userId={this.props.userId}
                                                pageSize={this.props.pageSize} key={key} name={name}
                                                avatar={avatar}
                                                description={description} exercises={g.exercises}
                                                editMode={this.props.editMode} hoverMode={this.props.hoverMode}
                                    />
                            }
                        </div>



                    );
                }, this)}

            </div>
        );
    }

});

module.exports = ExercisesGroupsList;