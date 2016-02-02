/**
 * Created by sabir on 22.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var RecTextMixin = require('../../mixins/RecTextMixin');

var CoolPreloader = require('../preloader/CoolPreloader');

var RecTextPanel = require('./RecTextPanel');

var SelfLoadingRecTextPanel = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            feedItemId: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            recText: undefined,
            answer: {}
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.load();
    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {
            position: 'relative'
        },

        panelPlaceholder: {

        }

    },

    onSave: function(data){
        var self = this;
        var recText = this.state.recText;
        if (recText == undefined){
            return;
        }
        var recTextId = recText.id;
        var userId = this.props.userId;
        this.setState({
            loading: true
        });
        RecTextMixin.answerOnRecText(recTextId, userId, data, function(answer){
            this.setState({
                loading: false,
                answer: answer
            });
        }.bind(this));
    },

    load: function(){
        var feedItemId = this.props.feedItemId;
        var userId = this.props.userId;
        console.log('SelfLoadingRecTextPanel: load: userId = ', userId);
        if (userId == undefined || feedItemId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        var self = this;
        RecTextMixin.loadRecTextByFeedItemId(feedItemId, function(recText){
            if (recText == undefined){
                self.setState({
                    loading: false
                });
                return;
            }
            RecTextMixin.loadUserAnswer(recText.id, userId, function(answer){
                self.setState({
                    loading: false,
                    answer: (answer == undefined) ? {} : answer,
                    recText: recText
                });
            })
        });
    },

    render: function () {
        var recText = this.state.recText;
        var answer = this.state.answer;
        var st = assign({}, this.componentStyle.placeholder);
        if (recText == undefined){
            st = assign({}, st, {display: 'none'});
        }

        return (
            <div style={st} >

                <div style={this.componentStyle.panelPlaceholder}>

                    {this.state.recText == undefined ? null :
                        <RecTextPanel
                            description={recText.description}
                            inputType={recText.inputType}
                            url={answer.url}
                            text={answer.text}
                            feedItemId={recText.feedItemId}
                            onSave={this.onSave}
                            />
                    }

                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = SelfLoadingRecTextPanel;