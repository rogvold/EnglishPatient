/**
 * Created by sabir on 13.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingMaterialsList = require('../../material/list/SelfLoadingMaterialsList');

var TopicHeaderPanel = require('./TopicHeaderPanel');


var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../preloader/CoolPreloader');


var TopicPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('TopicsStore')],

    getDefaultProps: function () {
        return {
            topicId: undefined,

            teacherId: undefined,
            name: undefined,
            description: undefined,
            avatar: undefined,

            onTopicUpdated: function(topic){

            },

            onTopicDeleted: function(){

            }


        }
    },

    getStateFromFlux: function(){
        var store = this.getFlux().store('TopicsStore');
        return {
            loading: store.loading
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
            position: 'relative',
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            backgroundColor: 'white'
        },

        topPanel: {
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
        },

        contentPlaceholder: {
            padding: 10
        }
    },

    onTopicUpdated: function(topic){
        this.props.onTopicUpdated(topic);
    },

    onTopicDeleted: function(){
        console.log('TopicPanel: onTopicDeleted occured');
        this.props.onTopicDeleted();
    },

    render: function () {
        var topPanelStyle = assign({}, this.componentStyle.topPanel, {backgroundImage: 'url("' + this.props.avatar + '")'});

        return (
            <div style={this.componentStyle.placeholder}>


                <TopicHeaderPanel topicId={this.props.topicId}
                                  name={this.props.name}
                                  description={this.props.description}
                                  avatar={this.props.avatar}
                                  onTopicUpdated={this.onTopicUpdated}
                                  onTopicDeleted={this.onTopicDeleted}

                    />

                <div style={this.componentStyle.contentPlaceholder}>

                    <SelfLoadingMaterialsList
                        teacherId={this.props.teacherId}
                        topicId={this.props.topicId}
                        showUnsorted={false}
                        />

                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = TopicPanel;