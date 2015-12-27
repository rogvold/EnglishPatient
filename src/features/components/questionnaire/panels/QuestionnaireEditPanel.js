/**
 * Created by sabir on 22.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingQuestionnaireEditInfoPanel = require('./question/SelfLoadingQuestionnaireEditInfoPanel');

var SelfLoadingQuestionsEditPanel = require('./question/SelfLoadingQuestionsEditPanel');

var QuestionnaireEditPanel = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            questionnaireId: undefined,
            onUpdated: function(){

            },

            onDeleted: function(){
                console.log('QuestionnaireEditPanel: default onDeleted');
            }
        }
    },

    getInitialState: function () {
        return {
            mode: 'info',
            questionnaireId: this.props.questionnaireId

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    switchMode: function(mode){
        console.log('new mode: ', mode);
        this.setState({
            mode: mode
        });
    },

    componentStyle: {
        placeholder: {
            width: 855,
            backgroundColor: 'white',
            padding: 5,
            margin: '0 auto'
        },

        tabsPlaceholder: {
            textAlign: 'center',
            padding: 5,
            paddingTop: 0
        },

        tabItem: {
            padding: 5,
            cursor: 'pointer',
            margin: 10,
            marginTop: 0,
            marginBottom: 0,
            display: 'inline-block'
        },

        active: {
            borderBottom: '3px solid rgb(252, 99, 107)'
        },

        content: {

        }
    },

    onLoaded: function(q){
        this.setState({
            questionnaireId: q.id
        });
    },

    onUpdated: function(q){
        this.setState({
            questionnaireId: q.id
        });
        this.props.onUpdated(q);
    },

    onDeleted: function(){
        this.props.onDeleted();
    },

    render: function () {
        return (
            <div style={this.componentStyle.placeholder}>

                {this.state.questionnaireId == undefined ?
                    <div>
                        <h3 style={{textAlign: 'center'}}>
                            Создание нового опросника
                        </h3>
                    </div>
                    :
                    <div style={this.componentStyle.tabsPlaceholder}>
                        <div onClick={this.switchMode.bind(this, 'info')}
                             style={assign({}, this.componentStyle.tabItem, (this.state.mode == 'info') ? this.componentStyle.active: {})}>
                            Информация
                        </div>

                        <div onClick={this.switchMode.bind(this, 'questions')}
                             style={assign({}, this.componentStyle.tabItem, (this.state.mode == 'questions') ? this.componentStyle.active: {})}>
                            Вопросы
                        </div>
                    </div>
                }

                <div style={this.componentStyle.content}>

                    {this.state.mode == 'info' ?
                        <div>
                            <SelfLoadingQuestionnaireEditInfoPanel teacherId={this.props.teacherId}
                                                               onLoaded={this.onLoaded}
                                                               onUpdated={this.onUpdated}
                                                               onDeleted={this.onDeleted}
                                                               questionnaireId={this.props.questionnaireId} />

                        </div>
                        :
                        <div>
                            <SelfLoadingQuestionsEditPanel questionnaireId={this.state.questionnaireId} />
                        </div>
                    }

                </div>

            </div>
        );
    }

});

module.exports = QuestionnaireEditPanel;