/**
 * Created by sabir on 12.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var ExerciseDialogViewer = require('../dialog/exercise/ExerciseDialogViewer');

//var ExerciseDialogClickableArea = require('../dialog/exercise/ExerciseDialogClickableArea');

var ExerciseCard = React.createClass({
    getDefaultProps: function () {
        return {
            //image: 'http://cdn29.us3.fansshare.com/images/thegoldengatebridge/sonoma-the-hollywood-sign-1120085138.jpg',
            image: 'http://www.unoosa.org/res/timeline/index_html/space-2.jpg',
            name: 'Default Name',
            access: undefined,
            task: undefined,
            description: '',
            editable: true,
            exerciseId: undefined,
            userId: undefined,
            hoverMode: false,

            editMode: true,

            onExerciseUpdate: function(ex){

            },

            onSelect: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false,
            hover: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            minHeight: 160,
            position: 'relative',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        },

        overlayPanel: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: '#2E3C54',
            opacity: 0.7,
            borderRadius: '3px'
        },

        panel: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            padding: 5,
            zIndex: 2,
            color: 'white'
        },

        editablePanel: {
            zIndex: 3,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            cursor: 'pointer'
        },

        information: {
            width: '90%',
            position: 'absolute',
            bottom: 10,
            left: 10
        },

        header: {
            fontSize: '18px',
            fontWeight: 'bold'
        },

        description: {
            fontSize: '13px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            maxWidth: '100%',
            opacity: 0.8,
            whiteSpace: 'nowrap'
        },

        superOverlay: {
            zIndex: 5,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#2E3C54',
            opacity: 0.95,
            borderRadius: '3px'
        },

        superOverlayPanel: {
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'absolute',
            top: 0,
            padding: 5,
            height: '100%',
            display: 'table',
            color: 'white'
        },

        hoverPanelsPlaceholder: {
            top: 0,
            bottom: 0,
            right: 0,
            textAlign: 'center',
            left: 0,
            position: 'absolute'
        }

    },

    onEditableClick: function(){
        this.setState({
            dialogVisible: true
        });
    },

    onDialogClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    onExerciseUpdate: function(ex){
        console.log('ExerciseCards: onExerciseUpdate: ex = ', ex);
        this.props.onExerciseUpdate(ex);
    },

    onMouseOver: function(){
        if (this.props.hoverMode == false){
            return;
        }
        if (this.state.hover == true){
            return;
        }
        this.setState({
            hover: true
        });
    },

    onMouseLeave: function(){
        if (this.props.hoverMode == false){
            return;
        }
        this.setState({
            hover: false
        });
    },

    showDialog: function(){
        this.setState({
            dialogVisible: true
        });
    },

    onSelect: function(){
        console.log('onSelect occured');
        this.props.onSelect();
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, {backgroundImage: 'url(\'' + this.props.image + '\')'});

        return (
            <div style={st} className={'ui card'} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} >

                <div className={'exerciseCardOverlay'} style={this.componentStyle.overlayPanel} ></div>

                <div style={this.componentStyle.panel} >
                    <div style={this.componentStyle.information}>
                        <div style={this.componentStyle.header}>
                            {this.props.name}
                        </div>
                        <div style={this.componentStyle.description}>
                            {this.props.description}
                        </div>
                    </div>
                </div>

                {this.state.hover == false ? null :
                    <div className={'hoverPanelsPlaceholder'} style={this.componentStyle.hoverPanelsPlaceholder} >
                        <div style={this.componentStyle.superOverlay}></div>
                        <div className={'superOverlayPanel'} style={this.componentStyle.superOverlayPanel} >

                            <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
                                <button style={{marginBottom: 5, width: 150}}
                                    className={'ui button inverted white'} onClick={this.showDialog} >
                                    <i className={'icon play'} ></i> Посмотреть
                                </button>

                                <button style={{width: 150}} className={'ui button inverted white'} onClick={this.showDialog} onClick={this.onSelect} >
                                    <i className={'icon checkmark'} ></i> Выбрать
                                </button>
                            </div>

                        </div>
                    </div>
                }

                {this.props.editable == false ? null :
                        <div style={this.componentStyle.editablePanel} onClick={this.onEditableClick}></div>
                }

                {((this.state.dialogVisible == false) && (this.props.exerciseId != undefined)) ? null :
                    <ExerciseDialogViewer exerciseAvatar={this.props.image}
                                          exerciseTask={this.props.task} exerciseAccess={this.props.access}
                                          exerciseName={this.props.name} exerciseDescription={this.props.description}
                                          onClose={this.onDialogClose} visible={this.state.dialogVisible}
                                          userId={this.props.userId} exerciseId={this.props.exerciseId} teacherId={this.props.userId}
                                          onExerciseUpdate={this.onExerciseUpdate} isEditable={this.props.editMode}
                    />
                }


            </div>
        );
    }

});

module.exports = ExerciseCard;