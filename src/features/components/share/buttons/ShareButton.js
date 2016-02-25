/**
 * Created by sabir on 16.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var ShareButton = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            objectId: undefined,
            customText: undefined,

            dialogLevel: 100000,

            icon: 'icon share alternate',
            buttonClassName: 'ui button basic mini',
            buttonName: 'Поделиться'

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
            width: 600,
            padding: 15
        }
    },

    show: function(){
        this.setState({
            dialogVisible: true
        });
    },

    hide: function(){
        this.setState({
            dialogVisible: false
        });
    },

    getDialogContent: function(){
        var name = this.props.name;
        var id = this.props.objectId;
        var url = 'https://www.englishpatient.org/app/#/share/' + name + '/' + id;
        return (
            <div >

                <div style={{width: 550, height: 380, marginBottom: 1}} >
                    <BackgroundImageContainer image={'http://www.englishpatient.org/app/assets/images/share_team.png'} />
                </div>

                <div style={{textAlign: 'center', fontWeight: 'bold', marginBottom: 10, fontSize: 18}} >
                    Поделитесь своими наработками!
                </div>

                <div className={'ui form'} >
                    <div className="ui fluid action input">
                        <input value={url} autoFocus={true} />
                        <a target={'_blank'} href={url} className="ui patientPrimary button">Перейти</a>
                    </div>
                </div>

                <div style={{textAlign: 'center', marginTop: 10, opacity: 0.6, fontSize: 14}} >
                    Скопируйте ссылку и отправьте ее друзьям или коллегам!
                </div>


            </div>
        );
    },

    render: function () {


        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} onClick={this.show} >
                    <i className={this.props.icon} ></i> {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <Dialog visible={true} level={this.props.dialogLevel}
                            content={this.getDialogContent()}
                            onClose={this.hide}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        />
                }

            </div>
        );
    }

});

module.exports = ShareButton;