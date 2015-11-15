/**
 * Created by sabir on 11.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var GifInstruction = React.createClass({
    getDefaultProps: function () {
        return {
            url: 'http://zippy.gfycat.com/FabulousFlawedBeauceron.gif',
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
            textAlign: 'center'
        },

        gifPlaceholder: {
            textAlign: 'center'
        },

        textPlaceholder:{
            textAlign: 'center',
            fontSize: '14px',
            width: 400,
            margin: '0 auto',
            lineHeight: '18px',
            marginTop: 30
        },

        gif: {
            height: '150px'
        },

        text: {
            color: '#A1A4AA'
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <div style={this.componentStyle.gifPlaceholder}>
                    <img src={this.props.url} style={this.componentStyle.gif} />
                </div>

                {this.props.text == undefined ? null :
                    <div style={this.componentStyle.textPlaceholder}>
                        <div style={this.componentStyle.text}>
                            {this.props.text}
                        </div>
                    </div>
                }

            </div>
        );
    }

});

module.exports = GifInstruction;