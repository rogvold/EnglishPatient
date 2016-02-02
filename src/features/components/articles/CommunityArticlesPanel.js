/**
 * Created by sabir on 20.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var ArticleMixin = require('../../mixins/ArticleMixin');

var SelfLoadingArticlesList = require('./SelfLoadingArticlesList');

var CommunityArticlesPanel = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined
        }
    },

    getInitialState: function () {
        return {
            userIds: [],
            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    load: function(){
        this.setState({
            loading: true
        });
        var userId = this.props.userId;
        ArticleMixin.loadCommunityAuthors(userId, function(userIds){
            this.setState({
                loading: false,
                userIds: userIds
            });
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            width: 840
        },

        listPlaceholder: {
            margin: '0 auto'
        },

        item: {
            marginTop: 5,
            marginBottom: 5
        }
    },

    render: function () {
        var userId = this.props.userId;
        var list = this.state.userIds;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>

                    {list.map(function(uId, k){
                        var key = 'u_' + k;
                        return (
                            <div style={this.componentStyle.item} key={key} >
                                <SelfLoadingArticlesList teacherId={uId} />
                            </div>
                        );
                    }, this)}

                </div>

            </div>
        );
    }

});

module.exports = CommunityArticlesPanel;