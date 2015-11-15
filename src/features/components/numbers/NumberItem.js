/**
 * Created by sabir on 29.09.15.
 */
var React = require('react');
var assign = require('object-assign');

var NumberItem = React.createClass({
    getDefaultProps: function () {
        return {
            passed: false,
            selected: false,
            text: '',
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
            display: 'inline-block',
            padding: 3,
            border: '1px solid lightgrey',
            backgroundColor: 'white',
            cursor: 'pointer',
            minWidth: 25,
            marginTop: 1,
            marginLeft: 1,
            textAlign: 'center',
            borderRadius: 2
        },
        selected: {
            //backgroundColor: '#45619D',
            backgroundColor: '#2E3C54',
            color: 'white',
            fontWeight: 'bold'
        },
        passed: {
            backgroundColor: '#21ba45',
            color: 'white'
        }
    },

    onClick: function(){
        this.props.onClick();
    },

    render: function () {
        var style = assign({}, this.componentStyle.placeholder);
        if (this.props.passed == true){
            style = assign({}, style, this.componentStyle.passed);
        }
        if (this.props.selected == true){
            style = assign({}, style, this.componentStyle.selected);
        }

        return (
            <div style={style} onClick={this.onClick}>
                {this.props.text}
            </div>
        );
    }

});

module.exports = NumberItem;