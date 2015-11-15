/**
 * Created by sabir on 21.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var NotesGroupListItem = require('./NotesGroupListItem');

var NotesGroupsList = React.createClass({
    getDefaultProps: function () {
        return {
            groups: [],
            selectedGroupId: undefined,
            onGroupClick: function(id){

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
        placeholder: {}
    },

    onGroupClick: function(id){
        console.log('NotesGroupsList: onGroupClick id = ' + id);
        this.props.onGroupClick(id);
    },

    render: function () {
        var list = this.props.groups;
        return (
            <div style={this.componentStyle.placeholder}>
                {list.map(function(g, k){
                    var key = 'group_' + k;
                    var name = g.name;
                    var description = g.description;
                    var boundClick = this.onGroupClick.bind(this, g.id);
                    var selected = (this.props.selectedGroupId == g.id);
                    return (
                        <NotesGroupListItem name={name} selected={selected} description={description}
                                            key={key} onGroupClick={boundClick} />
                    );
                }, this)}

            </div>
        );
    }

});

module.exports = NotesGroupsList;