/**
 * Created by sabir on 28.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var PatientPlayer = require('../player/PatientPlayer');

var TranslatableTextBlock = require('./text/TranslatableTextBlock');

var SelfLoadingLikeButton = require('../like/SelfLoadingLikeButton');

var moment = require('moment');

var SelfLoadingUserSpan = require('../user/SeflLoadingUserSpan');

var JungleMaterial = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            materialId: undefined,
            timestamp: undefined,

            creatorId: undefined,
            userId: undefined,

            content: {

            },

            transcriptText: undefined
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
            width: 920,
            margin: '0 auto',
            padding: 10,
            height: '100%'
            //backgroundColor: 'white'
        },

        left: {
            position: 'absolute',
            //top: 50,
            top: 0,
            display: 'inline-block',
            verticalAlign: 'top',
            width: 440
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 440,
            marginLeft: 440,
            paddingLeft: 10,
            maxHeight: '100%',
            overflowY: 'auto'
        },

        content: {

        },

        playerPlaceholder: {
            width: '100%',
            height: 300,
            paddingBottom: 10,
            borderBottom: '1px dotted #EFF0F1'
        },

        audioPlaceholder: {

        },

        namePlaceholder: {
            paddingBottom: 10,
            paddingTop: 10,
            fontSize: 18,
            lineHeight: '24px',
            fontWeight: 'bold'
        },

        likePlaceholder: {
            paddingTop: 10,
            opacity: 0.7,
            paddingBottom: 10
        },

        aboutPlaceholder: {
            paddingTop: 10,
            opacity: 0.7,
            paddingBottom: 10,
            borderTop: '1px dotted #EFF0F1'
        }
    },

    getWordsNumber: function(){
        var k = 0;
        var text = this.props.transcriptText;
        if (text == undefined){
            text = '';
        }
        var arr = text.match(/("[^"]+"|[^"\s]+)/g);
        arr = arr.map(function(w){return w.toLowerCase()});
        var map = {};
        for (var i in arr){
            var w = arr[i];
            map[w] = 1;
        }
        for (var key in map){
            k++;
        }
        return k;
    },

    render: function () {
        var text = this.props.transcriptText;
        var content = this.props.content;
        if (content == undefined){
            content = {};
        }
        moment.locale('ru');
        var sDate = moment(this.props.timestamp).format('DD.MM.YYYY HH:mm');
        var wordsNumber = this.getWordsNumber();

        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.left}>

                    <div style={this.componentStyle.namePlaceholder}>
                        {this.props.name}
                    </div>

                    <div style={this.componentStyle.content}>

                        {content.contentType == 'youtube' ?
                            <div style={this.componentStyle.playerPlaceholder} >
                                <PatientPlayer youtubeId={content.youtubeId} />
                            </div> : null
                        }

                        {content.contentType == 'vimeo' ?
                            <div style={this.componentStyle.playerPlaceholder} >
                                <PatientPlayer vimeoId={content.vimeoId} />
                            </div> : null
                        }

                        {content.contentType == 'audio' ?
                            <div style={this.componentStyle.audioPlaceholder}>
                                <audio controls src={content.audioUrl} ></audio>
                            </div> : null
                        }

                    </div>

                    <div style={this.componentStyle.likePlaceholder}>
                        <SelfLoadingLikeButton
                            objectClassName={'JungleMaterial'} userId={this.props.userId}
                            objectId={this.props.materialId} />
                    </div>

                    <div style={this.componentStyle.aboutPlaceholder}>
                        <div style={{marginBottom: 10}} >
                            <span style={{borderBottom: '1px dotted #606060', fontSize: 16,
                                            fontWeight: 'bold', paddingBottom: 1}} >О материале</span>
                        </div>
                        <div>
                            Опубликовано: {sDate}
                        </div>
                        <div>
                            Количество слов: {wordsNumber}
                        </div>
                        <div>
                            Автор: <SelfLoadingUserSpan userId={this.props.creatorId} />
                        </div>
                    </div>

                </div>

                <div style={this.componentStyle.right}>
                    <TranslatableTextBlock text={this.props.transcriptText} />
                </div>


            </div>
        );
    }

});

module.exports = JungleMaterial;