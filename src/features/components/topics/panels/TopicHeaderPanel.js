/**
 * Created by sabir on 13.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var EditTopicButton = require('../EditTopicButton');
var EditTopicButton2 = require('../EditTopicButton2');

var LoginMixin = require('../../../mixins/LoginMixin');


var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var TopicHeaderPanel = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function () {
        return {
            name: undefined,
            description: undefined,
            avatar: undefined,
            topicId: undefined,

            editMode: true,

            dialogLevel: 10,

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
            //opacity: 0.9
            opacity: 0.7
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
        },

        editButtonPlaceholder: {
            //position: 'absolute',
            //bottom: 10,
            //right: 10

            textAlign: 'right',
            marginTop: 40

        }

    },

    onTopicUpdated: function(topic){
        this.props.onTopicUpdated(topic);
    },

    onTopicDeleted: function(){
        console.log('TopicHeaderPanel: onTopicDeleted occured');
        this.props.onTopicDeleted();
    },

    render: function () {
        var topPanelStyle = assign({}, this.componentStyle.placeholder, {backgroundImage: 'url("' + this.props.avatar + '")'});

        var user = LoginMixin.getCurrentUser();
        var userId = (user == undefined) ? undefined : user.id;
        var topic = this.getFlux().store('TopicsStore').topicsMap[this.props.topicId];
        var editMode = false;
        if (topic != undefined){
            if (topic.creatorId == userId){
                editMode = true;
            }
        }


        return (
            <div style={topPanelStyle}>

                <div style={this.componentStyle.topPanelOverlay}></div>

                <div style={this.componentStyle.topPanelOverlayPanel}>

                    <div style={this.componentStyle.namePlaceholder}>
                        {this.props.name}
                    </div>

                    <div style={this.componentStyle.descriptionPlaceholder}>
                        {this.props.description}
                    </div>


                    {editMode == true ?
                        <div style={this.componentStyle.editButtonPlaceholder}>
                            <EditTopicButton2
                                dialogLevel={this.props.dialogLevel}
                                onTopicDeleted={this.onTopicDeleted}
                                onTopicUpdated={this.onTopicUpdated}
                                topicId={this.props.topicId}
                                />
                        </div> : null
                    }

                </div>

            </div>
        );
    }

});

module.exports = TopicHeaderPanel;