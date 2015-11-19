/**
 * Created by sabir on 18.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var TopBlock = require('../../../components/front/TopBlock');
var TextMediaPanel = require('../../../components/front/TextMediaPanel');

var Sausage = require('../../../components/sausage/Sausage');

var App = React.createClass({
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
        placeholder: {

        },

        top: {

        },

        main: {

        },

        lirmak: {
            margin: '0 auto',
            marginTop: 30,
            width: 800
        },

        lirmakLeft: {
            display: 'inline-block',
            verticalAlign: 'top'
        },

        lirmakRight: {
            display: 'inline-block',
            verticalAlign: 'top'
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.top}>
                    <TopBlock />
                </div>

                <div style={this.componentStyle.main}>


                    <TextMediaPanel />

                    <Sausage />


                </div>


            </div>
        );
    }

});

module.exports = App;

React.render((<App />

), document.getElementById('main'));