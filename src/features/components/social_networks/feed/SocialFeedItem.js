/**
 * Created by sabir on 08.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var VimeoPlayer = require('../../player/VimeoPlayer');

var CommonMixin = require('../../../../react/mixins/commonMixins/CommonMixin');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var moment = require('moment');

var SocialFeedItem = React.createClass({
    getDefaultProps: function () {
        return {
            timestamp: undefined,
            text: undefined,
            imageUrl: undefined,
            vimeoId: undefined,
            user: undefined
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
        },

        nameBlock: {
            padding: 0,
            width: '100%',
            marginBottom: 10
        },

        avaPlaceholder: {
            width: 40,
            height: 40,
            borderRadius: 5,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        name: {
            display: 'inline-block',
            verticalAlign: 'top',
            paddingLeft: 8
        },

        date: {
            fontSize: 12,
            opacity: 0.6
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

        var sDate = moment(this.props.timestamp).format('DD.MM.YYYY hh:mm');

        var user = this.props.user;

        return (
            <div style={st}>

                {user == undefined ? null :
                    <div style={this.componentStyle.nameBlock}>
                        <div style={this.componentStyle.avaPlaceholder}>
                            <BackgroundImageContainer style={{borderRadius: 2}} image={user.avatar} />
                        </div>
                        <div style={this.componentStyle.name}>
                            <div style={{fontWeight: 'bold', color: '#2E3C54', fontSize: 14}} >
                                {user.name}
                            </div>
                            <div style={this.componentStyle.date}>
                                {sDate}
                            </div>
                        </div>
                    </div>
                }

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