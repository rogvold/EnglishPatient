/**
 * Created by sabir on 23.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var VimeoPlayer = require('../../../../player/VimeoPlayer');

var TranslatableText = require('../../../../text/translatable/TranslatableText');

var PrepareSinglePanel = React.createClass({
    getDefaultProps: function () {
        return {
            vimeoId: undefined,
            questionName: undefined,
            audioUrl: undefined,
            answer: undefined,
            ruAnswer: undefined,
            answerNumber: undefined
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
            width: 620,
            padding: 5,
            backgroundColor: 'white'
        },

        left: {
            width: 280,
            verticalAlign: 'top',
            display: 'inline-block'
        },

        right: {
            verticalAlign: 'top',
            display: 'inline-block',
            width: 330,
            paddingLeft: 5
            //padding: 5
        },

        playerPlaceholder: {
            width: 280,
            height: 180
        },

        answerPlaceholder: {
            marginTop: 7
        },

        audioPlaceholder: {
            paddingLeft: 5,
            paddingRight: 5,
            marginTop: 5
        },

        answer: {

        },

        ruAnswer: {
            paddingRight: 5,
            paddingLeft: 5,
            marginTop: 10,
            opacity: 0.7,
            textAlign: 'justify'
        },

        namePlaceholder: {
            paddingTop: 5,
            paddingBottom: 5,
            fontSize: 14,
            textAlign: 'center',
            fontWeight: 'bold'
        },

        h3: {
            borderBottom: '1px dotted #EFF0F1',
            textAlign: 'center',
            marginBottom: 0
        }

    },

    render: function () {
        var hasOwnAnswer = (this.props.answerNumber == -2);

        console.log('answer: ', this.props.answer);
        console.log('ruAnswer: ', this.props.ruAnswer);


        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.left}>

                    <h3 style={this.componentStyle.h3} >
                         Вопрос
                    </h3>

                    {this.props.questionName == undefined ? null :
                        <div style={this.componentStyle.namePlaceholder}>
                            <TranslatableText fontSize={'14px'} text={this.props.questionName} />
                        </div>
                    }

                    <div style={this.componentStyle.playerPlaceholder} >
                        <VimeoPlayer vimeoId={this.props.vimeoId} style={{width: '100%', height: '100%'}} />
                    </div>

                </div>

                <div style={this.componentStyle.right}>

                    <h3 style={this.componentStyle.h3} >
                        Ответ
                    </h3>

                    {hasOwnAnswer == false ?
                        <div style={this.componentStyle.answerPlaceholder}>

                            {this.props.answer == undefined ? null :
                                <div style={this.componentStyle.answer}>
                                    <TranslatableText fontSize={'14px'} text={this.props.answer} />
                                </div>
                            }

                            {this.props.ruAnswer == undefined ? null :
                                <div style={this.componentStyle.ruAnswer}>
                                    {this.props.ruAnswer}
                                </div>
                            }

                            {this.props.audioUrl == undefined ? null :
                                <div style={this.componentStyle.audioPlaceholder}>
                                    <audio style={{width: '100%'}} controls src={this.props.audioUrl} ></audio>
                                </div>
                            }

                        </div>
                        :
                        <div style={{textAlign: 'center'}} >
                            У вас собственный ответ
                        </div>
                    }

                </div>

            </div>
        );
    }

});

module.exports = PrepareSinglePanel;