/**
 * Created by sabir on 11.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var ClassTab = React.createClass({
    getDefaultProps: function () {
        return {
            style: {

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
        placeholder: {
            width: '100%'
        },

        contentPlaceholder: {
            width: '100%'
        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.style);

        return (
            <div style={st}>

                {this.props.children == undefined ? null :
                    <div style={this.componentStyle.contentPlaceholder}>
                        {this.props.children}
                    </div>
                }

            </div>
        );
    }

});

module.exports = ClassTab;