/**
 * Created by sabir on 31.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var LessonCard = require('./LessonCard');

var LessonsCardsList = React.createClass({
    getDefaultProps: function () {
        return {
            lessons: []
        }
    },

    getInitialState: function () {
        return {
            selectedLesson: undefined,
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        lessonItem: {
            display: 'inline-block',
            margin: 5
        },

        listPlaceholder: {

        },

        dialogPanelStyle: {
            width: 840
        }
    },

    onItemClick: function(item){
        this.setState({
            selectedLesson: item,
            dialogVisible: true
        });
    },

    getDialogContent: function(){
        return null;
    },

    onClose: function(){
        this.setState({
            dialogVisible: false,
            selectedLesson: undefined
        });
    },



    render: function () {
        var list = this.props.lessons;
        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>

                    {list.map(function(lesson, k){
                        var key = 'lesson_' + k;
                        var onClick = this.onItemClick.bind(this, lesson);

                        return (
                            <div key={key} style={this.componentStyle.lessonItem} onClick={onClick} >
                                <LessonCard duration={lesson.duration}
                                    name={lesson.name} description={lesson.description}
                                    />
                            </div>
                        );

                    }, this)}

                </div>

                {this.state.dialogVisible == false ? null :
                    <Dialog onClose={this.onClose}
                        visible={true}
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        content={this.getDialogContent()}
                        />
                }

            </div>
        );
    }

});

module.exports = LessonsCardsList;