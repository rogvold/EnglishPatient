/**
 * Created by sabir on 03.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var HidableText = React.createClass({
    getDefaultProps: function () {
        return {
            number: 120,
            text: '',
            fontSize: '16px',
            togglerText: 'показать текст полностью',
            lineHeight: '20px'
        }
    },

    getInitialState: function () {
        return {
            togglerVisible: true
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            display: 'block',
            width: '100%',
            textAlign: 'justify'
        },

        toggler: {
            display: 'inline-block',
            textDecoration: 'underline',
            opacity: 0.6,
            fontStyle: 'italic',
            cursor: 'pointer'
        }
    },

    onTogglerClick: function(){
        this.setState({
            togglerVisible: false
        });
    },

    render: function () {
        var plSt = assign({}, this.componentStyle.placeholder, {fontSize: this.props.fontSize, lineHeight: this.props.lineHeight});
        var togglerVisible = (this.props.text != undefined && this.props.text.length > this.props.number) && this.state.togglerVisible;
        var visibleText = (this.props.text == undefined) ? '' : this.props.text;

        if (this.state.togglerVisible == true){
            visibleText = visibleText.substr(0, this.props.number);
        }

        return (
            <div style={plSt}>
                {visibleText}

                {togglerVisible ?
                    <div style={this.componentStyle.toggler} onClick={this.onTogglerClick}>
                        {this.props.togglerText}
                    </div>
                    : null}

            </div>
        );
    }

});

module.exports = HidableText;
