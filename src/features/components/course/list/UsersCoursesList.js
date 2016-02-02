/**
 * Created by sabir on 19.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingCoursesList = require('./SelfLoadingCoursesList');

var UsersCoursesList = React.createClass({
    getDefaultProps: function () {
        return {
            usersIds: []
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
            marginTop: 5,
            marginBottom: 5
        }
    },

    render: function () {
        var list = this.props.usersIds;

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(userId, k){
                    var key = 'user_list_' + k;

                    return (
                        <div style={this.componentStyle.item}>
                            <SelfLoadingCoursesList editMode={false} teacherId={userId} />
                        </div>
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = UsersCoursesList;