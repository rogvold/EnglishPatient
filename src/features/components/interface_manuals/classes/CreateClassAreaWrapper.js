/**
 * Created by sabir on 14.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var ButtonCard = require('../index/ButtonCard');

var Dialog = require('../../dialog/Dialog');

var PatientPlayer = require('../../player/PatientPlayer');

var VimeoPlayer = require('../../player/VimeoPlayer');

var AddNewClassWrapper = require('../../class/buttons/AddNewClassWrapper');

var LoginMixin = require('../../../mixins/LoginMixin');

var CreateClassAreaWrapper = React.createClass({
    getDefaultProps: function () {
        return {
            description: 'Наша платформа поможет вам управлять обучением, ' +
            'как малой группы под руководством репетитора, ' +
            'так и нескольких факультетов или филиалов крупной корпорации. ' +
            'С нашей помощью вы не только добьетесь успехов, но и оптимизируете процесс образования. ' +
            '' +
            '<br/><br/>' +
            '' +
            'Разделив всех учеников на виртуальные классы, вы сможете следить за эволюцией их успехов, ' +
            'а также обмениваться с ними сообщениями, не выходя из нашей платформы.'
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

    createClassClicked: function(){
        alert('UNDER CONSTRUCTION');
    },

    getDialogContent: function(){
        var userId = LoginMixin.getCurrentUser().id;
        return (
            <div>
                <div style={this.componentStyle.playerPlaceholder}>
                    <VimeoPlayer style={{width: '100%', height: '100%'}} vimeoId={'151800492'} />
                </div>

                <div style={this.componentStyle.descriptionPlaceholder}>
                    <div dangerouslySetInnerHTML={{__html: this.props.description}} ></div>
                </div>

                <div style={this.componentStyle.addButtonPlaceholder}>
                    <AddNewClassWrapper teacherId={userId} >
                        <button className={'ui button patientPrimary'}  >
                            СОЗДАТЬ КЛАСС <i className={'icon arrow right'} ></i>
                        </button>
                    </AddNewClassWrapper>
                </div>

            </div>
        );
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}  >
                <div onClick={this.show}>
                    {this.props.children}
                </div>

                {this.state.dialogVisible == false ? null :
                    <Dialog visible={true}
                            onClose={this.onClose} dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                            content={this.getDialogContent()} />
                }


            </div>
        );
    }

});

module.exports = CreateClassAreaWrapper;