/**
 * Created by sabir on 11.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var IconMessage = React.createClass({
    getDefaultProps: function () {
        return {
            icon: 'inbox icon',
            name: '',
            description: ''
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

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div className="ui icon message">
                    <i className={this.props.icon}></i>
                    <div className="content">
                        <div className="header">
                            {this.props.name}
                        </div>
                        {this.props.description == undefined ? null :
                            <p>{this.props.description}</p>
                        }

                    </div>
                </div>

            </div>
        );
    }

});

module.exports = IconMessage;