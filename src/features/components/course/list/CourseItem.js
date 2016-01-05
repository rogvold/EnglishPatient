/**
 * Created by sabir on 30.12.15.
 */


var React = require('react');
var assign = require('object-assign');

var DialogCard = require('../../dialog_exercise/card/DialogCard');

var CourseItem = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            description: undefined,
            avatar: undefined,

            onClick: function(){

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
        placeholder: {
            width: 810,
            padding: 10,
            margin: '0 auto',
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            borderRadius: 3,
            cursor: 'pointer'
        },

        left: {
            width: 160,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        right: {
            width: 628,
            display: 'inline-block',
            verticalAlign: 'top',
            paddingLeft: 10,
            paddingRight: 10
        },

        avatarPlaceholder: {
            width: '100%',
            height: 120
        },

        avatar: {

        },



        namePlaceholder: {
            fontSize: 18,
            fontWeight: 'bold'
        },

        descriptionPlaceholder: {

        }

    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder} onClick={this.props.onClick}>

                <div style={this.componentStyle.left}>
                    <div style={this.componentStyle.avatarPlaceholder}>
                        <DialogCard style={this.componentStyle.avatar}
                            avatar={this.props.avatar} />
                    </div>
                </div>

                <div style={this.componentStyle.right}>

                    <div style={this.componentStyle.namePlaceholder}>
                        {this.props.name}
                    </div>

                    <div style={this.componentStyle.descriptionPlaceholder}>
                        {this.props.description}
                    </div>

                </div>

            </div>
        );
    }

});

module.exports = CourseItem;