/**
 * Created by sabir on 30.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var CardComplexitySelectButton = React.createClass({
    getDefaultProps: function () {
        return {
            onSelect: function(level){
                console.log('selected level = ' + level);
            },
            level: undefined,
            list: [{
                    level: 1,
                    name: 'легко'
                },
                {
                    level: 2,
                    name: 'средне'
                },
                {
                    level: 3,
                    name: 'сложно'
                },
                {
                    level: 4,
                    name: 'очень сложно'
                }
            ]

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

        },

        button: {
            fontSize: '13px',
            padding: 5
        }
    },

    onSelect: function(level){
        this.props.onSelect(level);
    },

    render: function () {
        var list = this.props.list;
        console.log('rendering CardComplexitySelectButton: this.props.level = ', this.props.level);
        return (
            <div style={this.componentStyle.placeholder}>
                <div className="ui buttons">
                    {list.map(function(c, k){
                        var key = 'compl_' + k;
                        var onClick = this.onSelect.bind(this, c.level);
                        var isActive = (this.props.level == c.level);
                        return (
                            <button className={'ui mini button ' + (isActive == true ? ' positive active ' : ' ')}
                                    style={this.componentStyle.button}
                                    onClick={onClick} >
                                {c.name}
                            </button>
                        );

                    }, this)}
                </div>

            </div>
        );
    }

});

module.exports = CardComplexitySelectButton;