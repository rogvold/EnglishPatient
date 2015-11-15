/**
 * Created by sabir on 14.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var CardTypeSelectButton = React.createClass({
    getDefaultProps: function () {
        return {
            onSelect: function(name){
                console.log('selected Name = ' + name);
            },
            activeName: undefined
        }
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        button: {
            fontSize: '13px',
            padding: 5
        }
    },

    onSelect: function(val){
        console.log('sdfsf: onSelect - ' + val);
        this.props.onSelect(val);
    },

    render: function () {
        var list = [{
            name: 'speaking',
            displayName: 'Voice recording'
        },{
            name: 'typing',
            displayName: 'Typing'
        },{
            name: 'recognition',
            displayName: 'Speech recognition'
        }

        ];

        return (
            <div style={this.componentStyle.placeholder}>
                <div className="ui buttons">
                    {list.map(function(item, n){
                        var key = 'sel-' + n + 'name';
                        var boundClick = this.onSelect.bind(this, item.name);
                        var isActive = (item.name == this.props.activeName);
                        return (
                            <button key={key} onClick={boundClick} style={this.componentStyle.button} className={'ui mini button ' + (isActive == true ? ' positive active ' : ' ')}>{item.displayName}</button>
                        );
                    }, this)}
                </div>
            </div>
        );
    }

});

module.exports = CardTypeSelectButton;