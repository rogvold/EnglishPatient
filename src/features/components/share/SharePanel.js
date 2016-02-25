/**
 * Created by sabir on 15.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SelfLoadingDialogViewPanel = require('../dialog_exercise/SelfLoadingDialogViewPanel');

var SelfLoadingDialogPanel = require('../dialog_exercise/view/SelfLoadingDialogPanel');

var CommentsBlock = require('../comment/CommentsBlock');

var DialogExerciseInlineInfo = require('./info/DialogExerciseInlineInfo');
var MaterialInlineInfo = require('./info/MaterialInlineInfo');
var ExerciseInlineInfo = require('./info/ExerciseInlineInfo');
var QuestionnaireInlineInfo = require('./info/QuestionnaireInlineInfo');

var LoginMixin = require('../../mixins/LoginMixin');

var SelfLoadingMaterialPanel = require('../material/dialogs/SelfLoadingMaterialPanel');

var SelfLoadingUserExercise = require('../exercise/SelfLoadingUserExercise');

var SelfLoadingQuestionnairePanel = require('../questionnaire/panels/view/SelfLoadingQuestionnairePanel');

var AuthButton = require('../user/AuthButton');

var SharePanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],
    getDefaultProps: function(){
        return {
            name: undefined,
            objectId: undefined,

            onClose: function(){

            }
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        return {
            loading: store.loading
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        },

        overlay: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10000,
            backgroundColor: 'black',
            opacity: 0.8
        },

        closePlaceholder: {
            position: 'absolute',
            zIndex: 10002,
            top: 20,
            right: 38
        },

        panel: {
            position: 'absolute',
            zIndex: 10001,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            paddingTop: 20,
            textAlign: 'center'
        },

        content: {
            //width: 1000,
            //margin: '0 auto',
            display: 'inline-block',
            height: window.innerHeight - 20,
            backgroundColor: 'white',
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            position: 'relative'
        },

        left: {
            //width: 700,
            display: 'inline-block',
            verticalAlign: 'top',
            overflowY: 'auto',
            height: '100%',
            maxHeight: '100%',
            paddingBottom: 100
        },

        right: {
            width: 299,
            display: 'inline-block',
            verticalAlign: 'top',
            overflowY: 'auto',
            height: '100%',
            borderLeft: '1px solid #EFF0F1',
            maxHeight: '100%',
            paddingBottom: 100
        },

        info: {
            padding: 5,
            borderBottom: '1px solid #EFF0F1'
        },

        comments: {
            padding: 5
        },

        bottomPanel: {
            backgroundColor: 'white',
            borderTop: '1px solid #EFF0F1',
            height: 40,
            padding: 10,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100
        }

    },

    onClose: function(){
        this.props.onClose();
    },

    getContent: function(){
        var name = this.props.name;
        var id = this.props.objectId;
        console.log('getContent: name = ', name, ' id =  ', id);

        if (name == 'dialog'){
            return (
                <SelfLoadingDialogPanel dialogId={id} />
            );
        }

        if (name == 'material'){
            return (
                <div style={{width: 660, padding: 5}} >
                    <SelfLoadingMaterialPanel materialId={id} />
                </div>
            );
        }

        if (name == 'exercise'){
            return (
                <SelfLoadingUserExercise exerciseId={id} />
            );
        }

        if (name == 'questionnaire'){
            return (
                <div style={{width: 625}} >
                    <SelfLoadingQuestionnairePanel questionnaireId={id} />
                </div>
            );
        }

        return null;
    },

    getRightInfoBlock: function(){
        var name = this.props.name;
        var id = this.props.objectId;
        if (name == 'dialog'){
            return (
                <DialogExerciseInlineInfo dialogId={id} />
            );
        }

        if (name == 'material'){
            return (
                <MaterialInlineInfo materialId={id} />
            );
        }

        if (name == 'exercise'){
            return (
                <ExerciseInlineInfo exerciseId={id} />
            );
        }

        if (name == 'questionnaire'){
            return (
                <QuestionnaireInlineInfo questionnaireId={id} />
            );
        }

    },

    render: function(){
        var content = this.getContent();
        var infoContent = this.getRightInfoBlock();
        var id = this.props.objectId;
        var userId = LoginMixin.getCurrentUserId();
        var isStudent = false;
        var user = LoginMixin.getCurrentUser();
        if (user != undefined){
            isStudent = (user.role == 'student');
        }

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.overlay}></div>

                <div style={this.componentStyle.closePlaceholder}>
                    <button style={{marginRight: 0}} onClick={this.onClose}
                            className="circular ui icon inverted button">
                        <i className="icon remove"></i>
                    </button>
                </div>

                <div style={this.componentStyle.panel}>

                    <div style={this.componentStyle.content}>

                        <div style={{textAlign: 'left', height: '100%'}} >
                            <div style={this.componentStyle.left}>
                                {content}
                            </div>

                            <div style={this.componentStyle.right}>

                                <div style={this.componentStyle.info}>
                                    {infoContent}
                                </div>

                                {isStudent == true ? null :
                                    <div style={this.componentStyle.comments}>
                                        <CommentsBlock objectId={id} />
                                    </div>
                                }

                            </div>


                        </div>

                        {userId != undefined ? null :
                            <div style={this.componentStyle.bottomPanel}>
                                Этот материал был создан в платформе <a href="https://englishpatient.org">English Patient</a> .
                                Чтобы его использовать, пожалуйста,
                                <AuthButton buttonText={'авторизуйтесь'}
                                            style={{marginLeft: 5}}
                                            buttonClassName={'ui button mini patientPrimary'} />.

                            </div>
                        }

                    </div>



                </div>

            </div>
        );
    }

});

module.exports = SharePanel;