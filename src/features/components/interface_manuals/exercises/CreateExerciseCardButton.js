/**
 * Created by sabir on 14.01.16.
 */


var React = require('react');
var assign = require('object-assign');

var ButtonCard = require('../index/ButtonCard');

var Dialog = require('../../dialog/Dialog');

var PatientPlayer = require('../../player/PatientPlayer');

var CreateExerciseCardButton = React.createClass({
    getDefaultProps: function () {
        return {
            description: 'todo: change video and this text'
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        dialogPanelStyle: {
            width: 800
        },

        playerPlaceholder: {
            height: 350
        },

        descriptionPlaceholder: {
            padding: 10
        },

        addButtonPlaceholder: {
            textAlign: 'center',
            padding: 10,
            marginTop: 20
        }
    },

    show: function(){
        this.setState({
            dialogVisible: true
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    createExerciseClicked: function(){
        alert('UNDER CONSTRUCTION');
    },

    getDialogContent: function(){
        return (
            <div>
                <div style={this.componentStyle.playerPlaceholder}>
                    <PatientPlayer vimeoId={'151551106'} />
                </div>

                <div style={this.componentStyle.descriptionPlaceholder}>
                    <div dangerouslySetInnerHTML={{__html: this.props.description}} ></div>
                </div>

                <div style={this.componentStyle.addButtonPlaceholder}>
                    <button className={'ui button patientPrimary'} onClick={this.createExerciseClicked} >
                        СОЗДАТЬ УПРАЖНЕНИЕ <i className={'icon arrow right'} ></i>
                    </button>
                </div>

            </div>
        );
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}  >
                <div onClick={this.show}>
                    <ButtonCard name={'Создать упражнение'}
                                image={'http://www.englishpatient.org/app/assets/images/new_ex.png'} />
                </div>

                {this.state.dialogVisible == false ? null :
                    <Dialog visible={true}
                            onClose={this.onClose}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                            content={this.getDialogContent()} />
                }


            </div>
        );
    }

});

module.exports = CreateExerciseCardButton;