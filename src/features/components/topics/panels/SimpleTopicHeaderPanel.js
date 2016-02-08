/**
 * Created by sabir on 13.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var EditTopicButton = require('../EditTopicButton');

var SimpleTopicHeaderPanel = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            description: undefined,
            avatar: 'http://www.englishpatient.org/app/assets/img/stars.jpg',
            //avatar: undefined,
            topicId: undefined,

            dialogLevel: 10,

            customContent: null,

            onTopicUpdated: function(topic){

            },

            onTopicDeleted: function(){

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
            height: 200,
            borderBottom: '3px solid white',
            textAlign: 'center',
            color: 'white',
            position: 'relative',
            width: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        },

        topPanelOverlay: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 1,
            backgroundColor: '#2E3C54',
            opacity: 0.9
        },

        topPanelOverlayPanel: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 2,
            padding: 20
        },

        namePlaceholder: {
            fontSize: 40,
            marginTop: 20
        },

        descriptionPlaceholder: {
            marginTop: 25,
            fontSize: 18,
            opacity: 0.8
        }

    },


    render: function () {
        var topPanelStyle = assign({}, this.componentStyle.placeholder,
            {backgroundImage: 'url("' + this.props.avatar + '")'});
        var customContent = this.props.customContent;

        return (
            <div style={topPanelStyle} >

                <div style={this.componentStyle.topPanelOverlay}></div>

                <div style={this.componentStyle.topPanelOverlayPanel}>

                    <div style={this.componentStyle.namePlaceholder}>
                        {this.props.name}
                    </div>

                    <div style={this.componentStyle.descriptionPlaceholder}>
                        {this.props.description}
                    </div>

                    { customContent == undefined ? null : customContent }


                </div>

            </div>
        );
    }

});

module.exports = SimpleTopicHeaderPanel;