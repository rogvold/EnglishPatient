/**
 * Created by sabir on 28.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var PatientEditor = require('../../editor/PatientEditor');

var FeedItem = require('../../feed/FeedItem');

var CreateNewFeedItemPanel = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,

            createButtonName: 'Сохранить',

            onSave: function(data){

            }
        }
    },

    getInitialState: function () {
        return {
            information: '',
            needToSave: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: '100%'
            //padding: 5
        },

        editorPlaceholder: {

        },
        
        topPlaceholder: {
            padding: 5,
            fontWeight: 'bold',
            paddingBottom: 10,
            backgroundColor: 'white',
            borderLeft: '1px solid #EFF0F1',
            borderRight: '1px solid #EFF0F1'
        },

        bottomPlaceholder: {
            paddingTop: 10,
            textAlign: 'right'
        },

        createButtonPlaceholder: {

        },

        previewPlaceholder: {

        },

        additionalsPlaceholder: {
            padding: 5,
            borderLeft: '1px solid #EFF0F1',
            borderRight: '1px solid #EFF0F1',
            backgroundColor: 'white'
        },

        additionalLink: {
            marginLeft: 5,
            cursor: 'pointer',
            textDecoration: 'underline',
            fontSize: '14px'
        },

        previewName: {
            padding: 5,
            borderLeft: '1px solid #EFF0F1',
            borderRight: '1px solid #EFF0F1',
            borderTop: '1px solid #EFF0F1',
            backgroundColor: 'white',
            fontWeight: 'bold',
            fontSize: '14px',
            marginTop: 5
        }

    },

    onInformationChange: function(val){
        if (val == undefined || val.trim() == ''){
            val = undefined;
        }
        this.setState({
            information: val,
            needToSave: true
        });
    },

    onSave: function(){
        var data = {
            information: this.state.information
        }
        console.log('data = ', data);
        this.props.onSave(data);
    },

    onAddExerciseClick: function(){

    },

    onAddMaterialsClick: function(){

    },

    onAddNoteClick: function(){

    },

    render: function () {
        var saveDisabled = !this.state.needToSave;
        if (this.state.information == undefined){
            saveDisabled = true;
        }

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.topPlaceholder}>
                    Создайте новое задание в этой группе
                </div>


                <div style={this.componentStyle.editorPlaceholder}>
                    <PatientEditor onContentChange={this.onInformationChange} />
                </div>


                <div style={this.componentStyle.additionalsPlaceholder}>
                    <span style={{verticalAlign: 'middle'}} >
                        Добавить:
                    </span>

                    <span style={assign({}, this.componentStyle.additionalLink, {marginLeft: 15})} onClick={this.onAddExerciseClick} >
                        <button className={'ui mini basic grey button'}>
                            <i className={'tasks icon'} ></i>
                            Упражнение
                        </button>
                    </span>

                    <span style={this.componentStyle.additionalLink} onClick={this.onAddMaterialsClick} >
                        <button className={'ui mini basic grey button'}>
                            <i className={'file video outline icon'} ></i>
                            Видео
                        </button>
                    </span>

                     <span style={this.componentStyle.additionalLink} onClick={this.onAddNoteClick} >
                        <button className={'ui mini basic grey button'}>
                            <i className={'file text outline icon'} ></i>
                            Заметку
                        </button>
                    </span>

                </div>


                {saveDisabled == true ? null :
                    <div style={this.componentStyle.previewPlaceholder}>

                        <div style={this.componentStyle.previewName}>
                            Превью задания:
                        </div>

                        <FeedItem information={this.state.information} />
                    </div>
                }



                <div style={this.componentStyle.bottomPlaceholder}>
                    <button className={'ui primary button'} disabled={saveDisabled} onClick={this.onSave}>
                        <i className={'save icon'} ></i>
                        {this.props.createButtonName}
                    </button>

                </div>



            </div>
        );
    }

});

module.exports = CreateNewFeedItemPanel;