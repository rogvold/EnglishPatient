/**
 * Created by sabir on 24.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../../dialog/Dialog');

var SelfLoadingQuestionnairePanel = require('../view/SelfLoadingQuestionnairePanel');

var QuestionnaireSearchList = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            questionnaires: [],
            onSelect: function(q){

            }
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false,
            selectedQuestionnaire: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 650,
            margin: '0 auto',
            backgroundColor: 'white',
            padding: 5
        },

        dialogPanelStyle: {
            width: 640,
            padding: 5
        },

        list: {

        },

        itemStyle: {
            marginTop: 5,
            marginBottom: 5,
            padding: 5,
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            borderRadius: 2
        },

        name: {
            fontSize: 16,
            fontWeight: 'bold'
        },

        description: {
            marginTop: 5
        },

        left: {
            width: 450,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        right: {
            width: 178,
            padding: 5,
            textAlign: 'right',
            display: 'inline-block',
            verticalAlign: 'top'
        }

    },

    getDialogContent: function(){
        var q = this.state.selectedQuestionnaire;
        if (q == undefined){
            return null;
        }
        return (
            <div>
                <SelfLoadingQuestionnairePanel questionnaireId={q.id} userId={this.props.userId} />
            </div>
        );
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    onSelect: function(q){
        this.props.onSelect(q);
        this.setState({
            dialogVisible: false
        });
    },

    show: function(q){
        this.setState({
            selectedQuestionnaire: q,
            dialogVisible: true
        });
    },


    render: function () {
        var list = this.props.questionnaires;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.list}>

                    {list.map(function(q, k){
                        var key = 'que_' + k + '_' + q.id;
                        var show = this.show.bind(this, q);
                        var select = this.onSelect.bind(this, q);
                        return (
                            <div style={this.componentStyle.itemStyle}>

                                <div style={this.componentStyle.left}>
                                    <div style={this.componentStyle.name}>
                                        {q.name}
                                    </div>

                                    <div style={this.componentStyle.description}>
                                        {q.description}
                                    </div>

                                </div>

                                <div style={this.componentStyle.right}>
                                    <div style={{marginBottom: 5}} >
                                        <button onClick={show} className={'ui basic mini button'} >
                                            <i className={'icon unhide'} ></i> Посмотреть
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={select} className={'ui basic mini button'} >
                                            <i className={'icon checkmark'} ></i> Выбрать
                                        </button>
                                    </div>
                                </div>


                            </div>
                        );
                    }, this)}

                </div>

                {this.state.dialogVisible == false ? null :
                    <Dialog visible={true} content={this.getDialogContent()}
                            level={1000}
                            onClose={this.onClose}
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle} />
                }

            </div>
        );
    }

});

module.exports = QuestionnaireSearchList;