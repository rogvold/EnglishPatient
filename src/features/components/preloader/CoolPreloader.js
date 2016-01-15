/**
 * Created by sabir on 14.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var CoolPreloader = React.createClass({
    getDefaultProps: function () {
        return {}
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

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div className={'ui inverted dimmer active' }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = CoolPreloader;