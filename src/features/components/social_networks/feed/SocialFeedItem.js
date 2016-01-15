/**
 * Created by sabir on 08.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var VimeoPlayer = require('../../player/VimeoPlayer');

var CommonMixin = require('../../../../react/mixins/commonMixins/CommonMixin');

var SocialFeedItem = React.createClass({
    getDefaultProps: function () {
        return {
            text: undefined,
            imageUrl: undefined,
            vimeoId: undefined
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
            maxWidth: 500,
            margin: '0 auto',
            padding: 10,
            borderRadius: 3,
            backgroundColor: 'white'
            //border: '1px solid #EFF0F1'
        },

        imagePlaceholder: {
            maxHeight: 400,
            height: 300,
            marginBottom: 5
        },

        image: {
            maxHeight: '100%',
            maxWidth: '100%',
            display: 'block',
            margin: '0 auto'
        },

        textPlaceholder: {
            paddingBottom: 10,
            fontSize: 14,
            color: 'rgb(20, 24, 35)'
        },

        playerPlaceholder: {
            width: '100%',
            height: 320
        }
    },

    render: function () {
        var text = (this.props.text == undefined) ? '' : this.props.text;
        //text = CommonMixin.wrapURLs(text, true);
        text = text.replace(/\n/g, '<br/>');

        var st = assign({}, this.componentStyle.placeholder);
        if (this.props.text == undefined && this.props.imageUrl == undefined && this.props.vimeoId == undefined){
            st = assign({}, st, {display: 'none'});
        }

        return (
            <div style={st}>

                {this.props.text == undefined ? null :
                    <div style={this.componentStyle.textPlaceholder}>
                        <div dangerouslySetInnerHTML={{__html: text}} ></div>
                    </div>
                }

                {this.props.imageUrl == undefined ? null :
                    <div style={this.componentStyle.imagePlaceholder}>
                        <img src={this.props.imageUrl} style={this.componentStyle.image}  />
                    </div>
                }

                {this.props.vimeoId == undefined ? null :
                    <div style={this.componentStyle.playerPlaceholder}>
                        <VimeoPlayer style={{width: '100%', height: '100%'}} vimeoId={this.props.vimeoId} />
                    </div>
                }


            </div>
        );
    }

});

module.exports = SocialFeedItem;