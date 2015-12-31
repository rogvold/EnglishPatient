/**
 * Created by sabir on 31.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var TextImagePanel = React.createClass({
    getDefaultProps: function () {
        return {
            image: undefined,
            text: undefined,
            imageText: undefined,

            textAlign: 'left'
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
            width: 900,
            margin: '0 auto',
            height: 220,
            padding: 10,
            marginTop: 30
        },

        imagePlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            textAlign: 'center',
            fontSize: 30,
            width: '50%',
            padding: 10,
            color: 'white'
        },

        textPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: '50%',
            fontSize: 30,
            padding: 10,
            lineHeight: '42px'
        },

        image: {
            paddingTop: 85,
            fontSize: 36,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            width: 300,
            height: 200
        }
    },

    render: function () {

        var imageSt = assign({}, this.componentStyle.image, {backgroundImage: 'url(\'' + this.props.image + '\')'});

        return (
            <div style={this.componentStyle.placeholder}>

                {this.props.textAlign == 'left' ?
                    <div>

                        <div style={this.componentStyle.textPlaceholder}>
                            {this.props.text}
                        </div>

                        <div style={this.componentStyle.imagePlaceholder}>
                            <div style={assign({}, imageSt, {float: 'right'})} >
                                {this.props.imageText}
                            </div>
                        </div>

                    </div> :

                    <div>

                        <div style={this.componentStyle.imagePlaceholder}>
                            <div style={assign({}, imageSt, {float: 'left'})} >
                                {this.props.imageText}
                            </div>
                        </div>

                        <div style={this.componentStyle.textPlaceholder}>
                            {this.props.text}
                        </div>

                    </div>
                }

            </div>
        );
    }

});

module.exports = TextImagePanel;