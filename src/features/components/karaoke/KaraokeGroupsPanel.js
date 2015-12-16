/**
 * Created by sabir on 01.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var GroupsListItem = require('./GroupsListItem');

var KaraokeMixin = require('../../mixins/KaraokeMixin');

var TopicDialog = require('../topics/dialog/TopicDialog');

var SelfLoadingCategoryKaraokeCardsList = require('./SelfLoadingCategoryKaraokeCardsList');

var KaraokeGroupsPanel = React.createClass({
    getDefaultProps: function () {
        return {

        }
    },

    getInitialState: function () {
        return {
            groups: KaraokeMixin.getAllCategories(),
            selectedGroup: {},
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white',
            padding: 5,
            width: 860,
            margin: '0 auto'
        },

        groupsPlaceholder: {

        },

        cardsPlaceholder: {

        },

        dialogTopPlaceholder: {
            paddingTop: 40,
            height: 100,
            color: 'white',
            fontSize: 24,
            border: '1px solid #EFF0F1',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            textAlign: 'center',
            backgroundImage: 'url(\'http://englishpatient.org/app/assets/img/avatars/_1.jpg\')'
        }
    },


    onGroupClick: function(group){
        console.log('selectedCategory = ', group.category);
        this.setState({
            selectedGroup: group,
            dialogVisible: true
        });
    },

    getDialogContent: function(){

        var categoryName = this.state.selectedGroup.category;

        return (

            <div>

                <div style={this.componentStyle.dialogTopPlaceholder}>
                    {categoryName}
                </div>

                <div style={this.componentStyle.cardsPlaceholder}>
                    <SelfLoadingCategoryKaraokeCardsList categoryName={categoryName} />
                </div>


            </div>

        );

    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    render: function () {
        var list = this.state.groups;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.groupsPlaceholder}>
                    {list.map(function(g, k){
                        var key = 'group_' + k + '_' + g.category;
                        var cl = this.onGroupClick.bind(this, g);
                        return (
                            <GroupsListItem  avatar={g.avatar}  name={g.category} onItemClick={cl} key={key} />
                        );
                    }, this)}

                </div>

                {this.state.dialogVisible == false ? null :
                    <TopicDialog onClose={this.onClose} content={this.getDialogContent()} />
                }

            </div>
        );
    }

});

module.exports = KaraokeGroupsPanel;