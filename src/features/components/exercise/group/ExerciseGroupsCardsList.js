/**
 * Created by sabir on 29.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogCard = require('../../dialog_exercise/card/DialogCard');

var ExercisesGroupsCardsList = React.createClass({
    getDefaultProps: function () {
        return {
            groups: []
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
            width: '100%',
            padding: 5,
            backgroundColor: 'white',
            margin: '0 auto'
        },

        list: {

        },

        itemStyle: {
            display: 'inline-block',
            margin: 5,
            width: 210,
            height: 160
        }

    },

    onCardClick: function(group){
        console.log('group clicked: ', group);
    },

    render: function () {
        var list = this.props.groups;
        console.log('ExercisesGroupsCardsList: list = ', list);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.list}>

                    {list.map(function(g, k){
                        var key = 'group_' + k;
                        var gr = g.group;
                        var id = (gr == undefined) ? undefined : gr.id;
                        var name = (gr == undefined) ? 'Unsorted' : gr.name;
                        var onClick = this.onCardClick.bind(this, gr);
                        return (
                            <div key={key} style={this.componentStyle.itemStyle} onClick={onClick} >
                                <DialogCard bunchId={id} groupId={id} name={name} />
                            </div>
                        );

                    }, this)}

                </div>

            </div>
        );
    }

});

module.exports = ExercisesGroupsCardsList;