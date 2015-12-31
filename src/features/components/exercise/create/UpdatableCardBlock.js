/**
 * Created by sabir on 15.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var ParseMixin = require('../../../../react/mixins/commonMixins/ParseMixin');

var ExerciseMixin = require('../../../mixins/ExerciseMixin');

var EditableCardBlock = require('./EditableCardBlock');

var UpdatableCardBlock = React.createClass({
    getDefaultProps: function () {
        return {
            cardId: undefined,
            exerciseId: undefined,

            teacherId: undefined,

            materials: [],
            answerType: undefined,
            number: undefined,

            comment: undefined,
            correctAnswer: undefined,

            level: undefined,

            hint: undefined,
            transcript: undefined,
            deletable: false,

            onUpdate: function(updatedCard){

            },

            onDelete: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        ParseMixin.initParse();
    },

    componentStyle: {
        placeholder: {
            width: '100%',
            height: '100%'
        },

        contentPlaceholder: {

        }
    },

    onSave: function(data){
        console.log('UpdatableCardBlock: onSave: data = ', data);
        console.log(data);
        console.log('this.props.number = ', this.props.number);
        if (this.props.exerciseId == undefined || this.props.number == undefined){
            return;
        }

        var self = this;
        this.setState({loading: true});
        console.log('before updating');
        ExerciseMixin.updateCard(this.props.exerciseId, this.props.number,
                                    data.items, data.comment, data.hint,
                                    data.transcript, data.answerType,
                                    data.correctAnswer, data.level,
            function(updatedCard){
                self.props.onUpdate(updatedCard);
                self.setState({
                    loading: false
                });
        });
    },

    onDelete: function(){
        this.props.onDelete(this.props.cardId);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.contentPlaceholder}>

                    <EditableCardBlock items={this.props.materials} transcript={this.props.transcript}
                                       comment={this.props.comment}
                                       correctAnswer={this.props.correctAnswer}
                                       teacherId={this.props.teacherId}
                                       level={this.props.level}
                                       hint={this.props.hint} deletable={this.props.deletable}
                                       answerTypeName={this.props.answerType}
                                       onSave={this.onSave} onDelete={this.onDelete} />

                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = UpdatableCardBlock;