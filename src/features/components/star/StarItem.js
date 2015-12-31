/**
 * Created by sabir on 30.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var StarItem = React.createClass({
    getDefaultProps: function () {
        return {
            active: false,

            style: {
                cursor: 'pointer',
                color: '#EBB109'
            },

            onClick: function(){

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
            display: 'inline-block'
        }
    },

    onClick: function(){
        this.props.onClick();
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.style);

        return (
            <div style={st} onClick={this.onClick} >
                {this.props.active == true ?
                    <i className={'icon star'} ></i>:
                    <i className={'icon empty star'} ></i>
                }
            </div>
        );
    }

});

module.exports = StarItem;