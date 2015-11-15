/**
 * Created by sabir on 11.10.15.
 */

var React = require('react');

var ClassHeader = React.createClass({
    getDefaultProps: function () {
        return {
            text: undefined
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
            height: '30px',
            height: 30,
            paddingBottom: 2,
            //borderBottom: '1px solid #EFF0F1',
            backgroundColor: 'white'
        },

        headerPlaceholder: {
            width: '100%',
            textAlign: 'center',
            color: '#1B2432',
            fontSize: '22px',
            lineHeight: '27px'
        }


    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.headerPlaceholder}>
                    {this.props.text}
                </div>

            </div>
        );
    }

});

module.exports = ClassHeader;