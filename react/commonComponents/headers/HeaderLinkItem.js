/**
 * Created by sabir on 11.08.15.
 */
var React = require('react');

var HeaderLinkItem = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'N/A',
            url: '#',
            icon: ' icon plane ',
            active: false
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentStyle: {
        item:{
            display: 'inline-block',
            marginLeft: 10,
            fontSize: 16
        },
        link:{
            color: 'white'
        }
    },

    componentDidMount: function () {

    },

    render: function () {

        return (
            <div style={this.componentStyle.item}>
                <a href={this.props.url} style={this.componentStyle.link}>
                    {this.props.icon == undefined || this.props.icon == '' ?
                        (<i></i>) : (<i className={this.props.icon} ></i>)
                    }
                    {this.props.name}
                </a>
            </div>
        );
    }

});

module.exports = HeaderLinkItem;