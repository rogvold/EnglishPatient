/**
 * Created by sabir on 03.10.15.
 */
var React = require('react');
var assign = require('object-assign');
var TopBrandContainer = React.createClass({
    getDefaultProps: function () {
        return {
            mainText: undefined,
            //mainText: 'International Programs Office',
            bottomText: undefined,
            //bottomText: 'English Level Test',
            //backgroundImg: 'http://static.ngs.ru/news/preview/84756916e5e79d2ecff1902f1fb60ddc0ff6fa62_1024.jpg'
            backgroundImg: 'http://www.bhmpics.com/wallpapers/andromeda_galaxy_space-1920x1080.jpg'
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
            position: 'relative',
            backgroundColor: 'black',
            width: '100%',
            minHeight: '500px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        },
        overlay: {
            position: 'absolute',
            top: '0px',
            zIndex: '1',
            bottom: '0px',
            left: '0px',
            right: '0px',
            backgroundColor: 'black',
            opacity: 0.9
        },

        contentPlaceholder: {
            position: 'absolute',
            color: 'white',
            textAlign: 'center',
            paddingTop: 180,
            top: 0,
            zIndex: 1,
            bottom: 0,
            left: 0,
            right: 0
        },

        mainTextPlaceholder: {
            fontSize: '70px',
            lineHeight: '72px'
        },

        bottomTextPlaceholder: {
            fontSize: '30px',
            lineHeight: '36px',
            marginTop: 30
        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, {backgroundImage: 'url("' + this.props.backgroundImg + '")'});
        return (
            <div style={st}>
                <div style={this.componentStyle.overlay}></div>
                <div style={this.componentStyle.contentPlaceholder}>

                    {this.props.mainText == undefined ? null :
                        <div style={this.componentStyle.mainTextPlaceholder}>
                            {this.props.mainText}
                        </div>
                    }

                    {this.props.bottomText == undefined ? null :
                        <div style={this.componentStyle.bottomTextPlaceholder}>
                            {this.props.bottomText}
                        </div>
                    }

                </div>
            </div>
        );
    }

});

module.exports = TopBrandContainer;