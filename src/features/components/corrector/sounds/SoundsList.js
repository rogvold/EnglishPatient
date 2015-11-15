/**
 * Created by sabir on 25.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var SoundItem = require('./SoundItem');

var SoundsList = React.createClass({
    getDefaultProps: function () {
        return {
            sounds: [],
            onItemClick: function(item){
                console.log('on cound click occured: ', item);
            },
            selectedId: undefined
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

        }
    },

    onItemClick: function(item){
        this.props.onItemClick(item);
    },

    render: function () {
        var list = this.props.sounds;

        return (
            <div style={this.componentStyle.placeholder}>
                {list.map(function(item, n){
                    var key = 'sound_item_' + n + '_' + item.id;
                    var boundClick = this.onItemClick.bind(this, item);
                    var selected = (item.id == this.props.selectedId);
                    return (
                        <SoundItem name={item.name} description={item.description} selected={selected}
                                   avatar={item.avatar} onClick={boundClick} />
                    );
                }, this)}
            </div>
        );
    }

});

module.exports = SoundsList;