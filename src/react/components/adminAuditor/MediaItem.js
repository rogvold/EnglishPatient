/**
 * Created by sabir on 26.08.15.
 */

var React = require('react');


var MediaItem = React.createClass({
    getDefaultProps: function () {
        return {
            imgSrc: undefined,
            vimeoId: undefined,
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

        },
        textPlaceholder: {

        },
        videoPlaceholder: {

        },
        imagePlaceholder: {

        },
        image: {

        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                {this.props.imgSrc != undefined ? (
                    <div style={this.componentStyle.imagePlaceholder}>
                        <img src={this.props.imgSrc} style={this.componentStyle.image} />
                    </div>
                ) : (
                    <div></div>
                ) }

                {this.props.vimeoId != undefined ? (
                    <div style={this.componentStyle.videoPlaceholder}>
                        <iframe src={'https://player.vimeo.com/video/' + this.props.vimeoId + '?title=0&byline=0&portrait=0'} width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div>
                ) : (
                    <div></div>
                ) }

                {this.props.text != undefined ? (
                    <div style={this.componentStyle.textPlaceholder}>
                        {this.props.text}
                    </div>
                ) : (
                    <div></div>
                ) }

            </div>
        );
    }

});

module.exports = MediaItem;