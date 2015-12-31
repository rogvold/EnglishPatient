/**
 * Created by sabir on 30.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var CourseItem = require('./CourseItem');

var CoursesList = React.createClass({
    getDefaultProps: function () {
        return {
            courses: []
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
        placeholder: {

        },

        item: {
            marginBottom: 5
        }
    },

    onItemClick: function(course){
        this.setState({
            selectedCourse: course
        });
    },

    render: function () {
        var list = this.props.courses;
        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(c, k){
                    var key = 'course_' + k;
                    var onClick = this.onItemClick.bind(this, c);
                    return (
                        <div key={key} style={this.componentStyle.item}>
                            <CourseItem name={c.name} description={c.description} avatar={c.avatar}
                                onClick={onClick} />
                        </div>
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = CoursesList;