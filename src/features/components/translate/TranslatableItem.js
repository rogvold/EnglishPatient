/**
 * Created by sabir on 01.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var TranslatableItem = React.createClass({
    getDefaultProps: function () {
        return {
            text: undefined
        }
    },

    getInitialState: function () {
        return {
            hover: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onMouseEnter: function(){
        this.setState({
            hover: true
        });
    },

    onMouseLeave: function(){
        this.setState({
            hover: false
        });
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block',
            cursor: 'pointer'
        },
        hover: {
            backgroundColor: 'yellow',
            opacity: 0.9
        }
    },



    render: function () {
        var style = assign({}, this.componentStyle.placeholder);
        if (this.state.hover == true){
            style = assign(style, this.componentStyle.hover);
        }
        var text = (this.props.text == undefined) ? '' : this.props.text;
        return (
            <div style={style}>
                {text}
            </div>
        );
    }

});


module.exports = TranslatableItem;