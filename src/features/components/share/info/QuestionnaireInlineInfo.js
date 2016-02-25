/**
 * Created by sabir on 16.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../preloader/CoolPreloader');
var UserCommunityHeaderPanel = require('../../user_interface/UserCommunityHeaderPanel');

var QuestionnaireInlineInfo = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('QuestionnaireStore')],
    getDefaultProps: function(){
        return {
            questionnaireId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('QuestionnaireStore');
        var questionnaire = store.getQuestionnaire(this.props.questionnaireId);
        return {
            loading: store.loading,
            questionnaire: questionnaire
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        var questionnaireId = this.props.questionnaireId;
        var questionnaire = this.getFlux().store('QuestionnaireStore').getQuestionnaire(questionnaireId);
        if (questionnaire == undefined){
            this.getFlux().actions.loadQuestionnaire(questionnaireId);
        }
    },

    componentStyle: {
        placeholder: {
            position: 'relative'
        },

        userHeaderPlaceholder: {

        },

        questionnaireInfoPlaceholder: {
            paddingTop: 5,
            paddingBottom: 5,
            opacity: 0.8
        }

    },

    render: function(){
        var questionnaire = this.state.questionnaire;
        var userId = (questionnaire == undefined) ? undefined : questionnaire.creatorId;
        var name = (questionnaire == undefined) ? undefined : questionnaire.name;

        return (
            <div style={this.componentStyle.placeholder} >


                {userId == undefined ? null :
                    <div style={this.componentStyle.userHeaderPlaceholder}>
                        <UserCommunityHeaderPanel
                            profileLinkEnabled={true}
                            style={{minWidth: 250}}
                            infoStyle={{opacity: 0.95, fontSize: 14}}
                            customInfoHtml={name}
                            userId={userId}/>
                    </div>
                }

                {questionnaire == undefined ? null :
                    <div style={this.componentStyle.questionnaireInfoPlaceholder}>

                        {(questionnaire.description == undefined || questionnaire.description.trim() == '' ) ? null :
                            <div>
                                {questionnaire.description}
                            </div>
                        }

                        {(questionnaire.task == undefined || questionnaire.task.trim() == '' ) ? null :
                            <div>
                                <i>Задание: </i>
                                {questionnaire.task}
                            </div>
                        }

                    </div>
                }


                {this.state.loading == false ? null :
                    <CoolPreloader />
                }
            </div>
        );
    }

});

module.exports = QuestionnaireInlineInfo;