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

var MigrationMixin = require('../../mixins/MigrationMixin');

var SharedClassPanel = require('../../components/class/share/SharedClassPanel');

var CardTypeSelectButton = require('../../components/exercise/create/CardTypeSelectButton');

var PatientPlayer = require('../../components/player/PatientPlayer');
var VimeoPlayer = require('../../components/player/VimeoPlayer');

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

    loadMaterials: function(){
        var self = this;
        MigrationMixin.loadDirtyMaterials(function(materials){
            console.log('laded materials: ', materials);
            console.log('not processed number: ', materials.length);
            if (materials.length == 0){
                alert('finish!');
                return;
            }

            var mId = materials[0].id;

            MigrationMixin.processOneDirtyMaterial(mId, function(m){
               console.log('processed: ', m);
                self.loadMaterials();
            });

        });
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <VimeoPlayer vimeoId={'147818654'} />


            </div>
        );
    }

});

module.exports = SimpleDev;