/**
 * Created by sabir on 23.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var NumbersBlock = require('../../../../numbers/NumbersBlock');

var SelfLoadingPrepareSinglePanel = require('./SelfLoadingPrepareSinglePanel');

var PreparePanel = React.createClass({
    getDefaultProps: function () {
        return {
            questions: [],
            answersMap: {},

            backButtonMode: true,

            onBack: function(){

            },

            onForward: function(){

            }

        }
    },

    getInitialState: function () {
        return {
            selectedNumber: 0
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.ensureVisible();
    },

    ensureVisible: function() {
        var domNode = React.findDOMNode(this);
        console.log('ensureVisible: domNode = ', domNode);
        domNode.scrollIntoView(true);
    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white'
        },

        numbersBlock: {
            padding: 5,
            borderBottom: '1px dotted #EFF0F1',
            marginBottom: 30
        },

        content: {

        },

        backPlaceholder: {
            padding: 5,
            textAlign: 'center'
        },

        forwardPlaceholder: {
            padding: 5,
            textAlign: 'center',
            borderTop: '1px dotted #EFF0F1'
        }
    },

    onItemSelect: function(number){
        this.setState({
            selectedNumber: number
        });
    },

    getAnswerNumber: function(){
        var map = this.props.answersMap;
        //var list = (this.props.questions == undefined) ? [] : this.props.questions;
        var list = this.getQuestions();

        var q = (list.length > 0) ? list[this.state.selectedNumber] : {};
        var a = map[q.id];
        if (a == undefined){
            return undefined;
        }
        return a.variant;
    },

    getQuestions: function(){
        console.log('PreparePanel: getQuestions occured');
        var map = this.props.answersMap;
        var arr = [];
        var list = this.props.questions;
        for (var i in list){
            var q = list[i];
            var ans = map[q.id];
            console.log(q.id, ' - ', ans);
            if (ans == undefined){
                continue;
            }
            if (ans.variant == -1){
                continue;
            }
            arr.push(q);
        }
        console.log('returning: ', arr);
        return arr;
    },

    onBack: function(){
        this.props.onBack();
    },

    onForward: function(){
        this.props.onForward();
    },

    render: function () {
        var list = this.getQuestions();
        var selectedQuestionId = (list.length > 0) ? list[this.state.selectedNumber].id : undefined;
        var answerNumber = this.getAnswerNumber();

        return (
            <div style={this.componentStyle.placeholder}>

                {this.props.backButtonMode == false ? null :
                    <div style={this.componentStyle.backPlaceholder}>
                        <button className={'ui basic button mini'} onClick={this.onBack} >
                            <i className={'icon reply'} ></i> Вернуться к вопросам
                        </button>
                    </div>
                }



                <div style={this.componentStyle.numbersBlock}>
                    <NumbersBlock onItemClick={this.onItemSelect}
                        selectedNumber={this.state.selectedNumber} amount={list.length} />
                </div>

                <div style={this.componentStyle.content}>

                    <SelfLoadingPrepareSinglePanel questionId={selectedQuestionId} answerNumber={answerNumber} />

                </div>

                <div style={this.componentStyle.forwardPlaceholder}>
                    <button className={'ui button basic'} onClick={this.onForward} >
                        <i className={'icon forward mail'}></i> Перейти к тестированию
                    </button>
                </div>

            </div>
        );
    }

});

module.exports = PreparePanel;