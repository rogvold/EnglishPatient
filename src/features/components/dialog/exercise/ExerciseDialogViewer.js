/**
 * Created by sabir on 12.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var ExerciseMixin = require('../../../mixins/ExerciseMixin');

var SelfLoadingUserExercise = require('../../exercise/SelfLoadingUserExercise');
var Dialog = require('../../dialog/Dialog');

var ExerciseInfoCard = require('../../exercise/info/ExerciseInfoCard');

var ExerciseDialogInfoBlock = require('./ExerciseDialogInfoBlock');

var ExerciseUpdateTabs = require('../../exercise/create/ExerciseUpdateTabs');

var ExerciseDialogViewer = React.createClass({
    getDefaultProps: function () {
        return {
            exerciseId: undefined,
            teacherId: undefined,
            userId: undefined,
            visible: false,
            isEditable: true,



            onClose: function(){

            },

            onExerciseUpdate: function(ex){

            }
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            mode: 'view'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    loadExercise: function(exerciseId, callback){
        this.setState({
            loading: true,
            exercise: undefined
        });
        ExerciseMixin.loadExercise(exerciseId, function(res){

        });
    },

    switchMode: function(){
        if (this.state.mode == 'view'){
            this.setState({
                mode: 'edit'
            });
        }else{
            this.setState({
                mode: 'view'
            });
        }
    },

    componentStyle: {
        placeholder: {

        },


        dialogPanelStyle: {
            width: 1000
        },

        footer: {
            textAlign: 'right',
            padding: 10
        },

        footerStyle: {
            minHeight: 50
        }
    },

    onClose: function(){
        this.props.onClose();
    },

    getFooter: function(){
        if ((this.props.isEditable == false) || (this.props.exerciseId == undefined)){
            return null;
        }
        return (
            <div style={this.componentStyle.footer}>
                <button className={'ui button'} onClick={this.switchMode} >


                    {this.state.mode == 'view' ?
                        <span>
                            <i className={'icon pencil'}></i>
                            Редактировать
                        </span>
                        :
                        <span>
                            <i className={'icon reply'}></i>
                            Просмотр
                        </span>
                    }


                </button>
            </div>
        );
    },

    onExerciseUpdate: function(ex){
        console.log('ExerciseDialogViewer: onExerciseUpdate:', ex);
        this.props.onExerciseUpdate(ex);
    },

    getContent: function(){
        //if (this.props.visible == true){

        if ((this.state.mode == 'view') && (this.props.exerciseId != undefined)){
            return (

                <ExerciseDialogInfoBlock exerciseId={this.props.exerciseId}
                                         name={this.props.exerciseName}
                                         description={this.props.exerciseDescription}
                                         task={this.props.exerciseTask}
                                         avatar={this.props.exerciseAvatar}
                                         access={this.props.exerciseAccess}
                                         userId={this.props.userId}
                />
            );
        }

        return (
            <div>
                <ExerciseUpdateTabs teacherId={this.props.teacherId}
                                    onExerciseUpdate={this.onExerciseUpdate}
                                    exerciseId={this.props.exerciseId} />
            </div>

        );

        //}
        //return null;
    },



    render: function () {
        console.log('rendering exercise dialog viewer');
        var content = this.getContent();
        var footer = this.getFooter();

        return (
            <div style={this.componentStyle.placeholder}>

                <Dialog dialogPanelStyle={this.componentStyle.dialogPanelStyle} onClose={this.onClose}
                         footerStyle={this.componentStyle.footerStyle} level={10}
                         footer={footer} content={content} visible={this.props.visible} />

            </div>
        );
    }

});

module.exports = ExerciseDialogViewer;