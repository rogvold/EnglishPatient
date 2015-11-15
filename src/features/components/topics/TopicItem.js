/**
 * Created by sabir on 13.11.15.
 */

var React = require('react');
var assign = require('object-assign');


var TopicItem = React.createClass({
    getDefaultProps: function () {
        return {
            topicId: undefined,
            teacherId: undefined,
            name: 'No Name',
            avatar: 'http://app.englishpatient.org/assets/img/stars.jpg',

            onTopicClick: function(){

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
            display: 'inline-block',
            position: 'relative',
            width: 160,
            height: 160,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            fontSize: 20,
            marginRight: 10,
            marginBottom: 7,
            borderRadius: 3,
            cursor: 'pointer'
        },

        overlay: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: '#2E3C54',
            opacity: 0.7,
            borderRadius: 3
        },

        overlayPanel: {
            zIndex: 2,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 3
        },

        namePanel: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: 3,
            left: 0,
            padding: 5,
            lineHeight: '26px',
            color: 'white',
            textAlign: 'center'
        }
    },

    onClick: function(){
        this.props.onTopicClick();
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, {backgroundImage: 'url("' + this.props.avatar + '")'});

        return (
            <div style={st} onClick={this.onClick} >

                <div style={this.componentStyle.overlay}></div>

                <div style={this.componentStyle.overlayPanel}>
                    <div style={this.componentStyle.namePanel}>
                        {this.props.name}
                    </div>
                </div>

            </div>
        );
    }

});

module.exports = TopicItem;