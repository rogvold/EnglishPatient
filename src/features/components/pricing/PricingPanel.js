/**
 * Created by sabir on 09.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var PricingItem = require('./PricingItem');

var PRICING_MAP = require('../../data/DataFactory').PRICING_MAP;

var PricingPanel = React.createClass({
    getDefaultProps: function () {
        return {

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
            width: 920,
            margin: '0 auto'
        }
    },

    render: function () {
        var d1 = PRICING_MAP['free'];
        var d2 = PRICING_MAP['group'];
        var d3 = PRICING_MAP['professional'];
        var d4 = PRICING_MAP['enterprise'];

        return (
            <div style={this.componentStyle.placeholder}>

                <PricingItem name={d1.name} price={d1.price} options={d1.options} description={d1.description} examples={d1.examples}  />
                <PricingItem name={d2.name} price={d2.price} options={d2.options} description={d2.description} examples={d2.examples}   isPopular={true} />
                <PricingItem name={d3.name} price={d3.price} options={d3.options} description={d3.description} examples={d3.examples}   />
                <PricingItem name={d4.name} price={d4.price} options={d4.options} description={d4.description}  examples={d4.examples}  />

            </div>
        );
    }

});

module.exports = PricingPanel;