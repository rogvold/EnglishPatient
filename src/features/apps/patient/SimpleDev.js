/**
 * Created by sabir on 19.11.15.
 */
/**
 * Created by sabir on 12.10.15.
 */

var React = require('react/addons');
var assign = require('object-assign');

var LeftSidebarTemplate = require('../../components/templates/LeftSidebarTemplate');

var LoginMixin = require('../../mixins/LoginMixin');

var WordItem = require('../../components/text/translatable/WordItem');

var TranslatableText = require('../../components/text/translatable/TranslatableText');

var VideoBackground = require('../../components/background/video/VideoBackground');

var PatientPlayer = require('../../components/player/PatientPlayer');

var ReactTooltip = require('react-tooltip');

var VocabularyPanel = require('../../components/vocabulary/VocabularyPanel');

var SimpleDev = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: 'jnM2pCK62I'
        }
    },

    getInitialState: function () {
        return {
            text: 'color',
            start: 0,
            end: 0,
            //url: 'http://www.youtube.com/watch?v=e-ORhEE9VVg',
            url: 'http://www.youtube.com/watch?v=fOdOw_Dsf54',
            loading: false,
            users: [],
            selectedTabName: 'users',
            loggedIn: false,
            user: (LoginMixin.getCurrentUser() == undefined ) ? {} : LoginMixin.getCurrentUser()
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        playerPlaceholder: {
            display: 'inline-block',
            width: 400,
            height: 300
        }
    },

    onTextChange: function(evt){
        var text = evt.target.value;
        this.setState({
            text: evt.target.value
        });
    },


    getFooter: function(){

    },



    onPause: function(){
        this.setState({

        });
    },

    render: function () {

        var text = "The Second Amendment was based partially on the right to keep and bear arms in English common-law and was influenced by the English Bill of Rights of 1689. Sir William Blackstone described this right as an auxiliary right, supporting the natural rights of self-defense, resistance to oppression, and the civic duty to act in concert in defense of the state";

        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.playerPlaceholder}>
                    <PatientPlayer youtubeId={'8SbUC-UaAxE'} start={420} end={503} />
                </div>

                <div style={this.componentStyle.playerPlaceholder}>
                    <PatientPlayer vimeoId={'70260646'} start={420} end={503} />
                </div>

               <VocabularyPanel />


            </div>
        );
    }

});

module.exports = SimpleDev;