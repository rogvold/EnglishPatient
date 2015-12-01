/**
 * Created by sabir on 23.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var VimeoPlayer = require('../../player/VimeoPlayer');

var TranslatableText = require('../../text/translatable/TranslatableText');

var MaterialPanel = React.createClass({
    getDefaultProps: function () {
        return {
            vimeoId: undefined,
            name: undefined,
            tags: [],
            transcript: undefined,
            comment: undefined
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

        playerPlaceholder: {

        },

        commentPlaceholder: {
            width: '100%',
            padding: 10,
            lineHeight: '22px',
            fontSize: '16px'
        },

        namePlaceholder: {
            display: 'none'
        },

        tagsPlaceholder: {

        },

        transcriptPlaceholder: {
            //backgroundColor: '#F4F4F5',
            backgroundColor: '#F5F5F6',
            borderBottom: '1px solid #EFF0F1',
            padding: 10,
            textAlign: 'justify',
            fontSize: '22px',
            lineHeight: '26px'
        },

        playerStyle: {
            width: '100%',
            height: 450
        }
    },

    getTranscriptComponent: function(){
        var tr = this.props.transcript;
        if (tr == undefined || tr.trim() == ''){
            return null;
        }
        var list = tr.split('\n');

        return (
            <div>
                {list.map(function(t, k){
                    var key = 'tr_' + k;
                    var isLast = (k == list.length - 1);
                    return (
                        <div key={key} >
                            <TranslatableText text={t}
                                 fontSize={this.componentStyle.transcriptPlaceholder.fontSize} />
                            {isLast == false ? <br/> : null}
                        </div>
                    );

                }, this)}

            </div>

        );

    },

    render: function () {

        console.log('rendering MaterialPanel: vimeoId = ', this.props.vimeoId);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.playerPlaceholder}>
                    <VimeoPlayer vimeoId={this.props.vimeoId} style={this.componentStyle.playerStyle} />
                </div>


                {this.props.name == undefined ? null :
                    <div style={this.componentStyle.namePlaceholder}>
                        {this.props.name}
                    </div>
                }

                {(this.props.transcript == undefined || this.props.transcript.trim() == '') ? null :
                    <div style={this.componentStyle.transcriptPlaceholder}>

                        {this.getTranscriptComponent()}

                    </div>
                }

                {this.props.comment == undefined ? null :
                    <div style={this.componentStyle.commentPlaceholder} dangerouslySetInnerHTML={{__html: this.props.comment}} ></div>
                }

                {(this.props.tags == undefined || this.props.tags.length == 0) ? null :
                    <div style={this.componentStyle.tagsPlaceholder}>

                    </div>
                }

            </div>
        );
    }

});

module.exports = MaterialPanel;