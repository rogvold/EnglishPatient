/**
 * Created by sabir on 09.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingSocialFeedItem = require('./SelfLoadingSocialFeedItem');

var PostsList = React.createClass({
    getDefaultProps: function () {
        return {
            posts: [],

            onDeleted: function(p){

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
            width: 510,
            margin: '0 auto'
        },

        item: {
            width: 500,
            margin: '0 auto',
            marginTop: 10,
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            borderRadius: 3
        }
    },

    onDeleted: function(p){
        this.props.onDeleted(p);
    },

    render: function () {
        var list = this.props.posts;
        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(p, k){
                    var key = 'post_' + p.id + '_' + k;
                    var onDeleted = this.onDeleted.bind(this, p);
                    return (
                        <div key={key} style={this.componentStyle.item} >
                            <SelfLoadingSocialFeedItem
                                onDeleted={onDeleted}
                                key={key} postId={p.id} />
                        </div>
                    );
                }, this)}

            </div>
        );
    }

});

module.exports = PostsList;