/**
 * Created by sabir on 22.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var TagsInput = require('react-tagsinput');

var MaterialTags = React.createClass({
    mixins: [LinkedStateMixin],

    getDefaultProps: function () {
        return {
            tags: [],
            onChange: function(tags){

            }
        }
    },

    getInitialState: function () {
        return {
            tags: this.props.tags
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            tags: nextProps.tags
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },


    onTagsChange: function(tags){
        this.props.onChange(tags);
    },

    onTagAdd: function(a){
        this.onTagsChange(this.state.tags);
    },

    onTagRemove: function(a){
        this.onTagsChange(this.state.tags);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <TagsInput onTagAdd={this.onTagAdd} onTagRemove={this.onTagRemove} ref='tags'
                           valueLink={this.linkState('tags')} />
            </div>
        );
    }

});

module.exports = MaterialTags;