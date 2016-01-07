/**
 * Created by sabir on 05.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var SimbleVideoDialog = React.createClass({
    getDefaultProps: function () {
        return {
            videoType: 'vimeo',
            videoId: '150484936',

            level: 100,

            autoplay: true,

            onClose: function(){

            }
        }
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        overlay: {
            backgroundColor: 'black',
            opacity: 0.92,
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        },

        overlayPanel: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            //padding: 50,
            //width: '100%',
            //height: '100%',
            //border: '3px solid white',
            borderRadius: 4,
            margin: '0 auto',
            marginTop: 62
        },

        closeButtonPlaceholder: {
            position: 'absolute',
            top: 0,
            right: 0,
            padding: 15,
            fontSize: 30
        },

        content: {
            //backgroundColor: 'white'
        }

    },

    onClose: function(){
        this.props.onClose();
    },

    render: function () {
        var z = this.props.level;

        var w = window.innerWidth - 126;
        var h = Math.min(window.innerHeight, 590) - 126;

        var src = '';
        if (this.props.videoType == 'vimeo'){
            src = 'https://player.vimeo.com/video/' + this.props.videoId + '?title=0&byline=0&portrait=0';
            if (this.props.autoplay == true){
                src = src + '&autoplay=1'
            }
        }

        var st = assign({}, this.componentStyle.placeholder, {zIndex: z});
        var overlaySt = assign({}, this.componentStyle.overlay, {zIndex: z});

        var panelSt = assign({}, this.componentStyle.overlayPanel,
                                    {zIndex: +z+1, width: w, height: h});

        var closeSt = assign({}, this.componentStyle.closeButtonPlaceholder, {zIndex: +z + 2});


        return (
            <div style={st}>

                <div style={overlaySt}></div>

                <div style={closeSt}>
                    <button className={'ui button icon inverted circular '} onClick={this.onClose} >
                        <i className="icon remove"></i>
                    </button>
                </div>

                <div style={panelSt}>

                    <div style={this.componentStyle.content}>
                        <iframe src={src} style={{border: 'none'}}
                                width={w} height={h}
                                frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div>

                </div>

            </div>
        );
    }

});

module.exports = SimbleVideoDialog;