/**
 * Created by sabir on 13.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../dialog/Dialog');

var BASE = 'https://www.englishpatient.org/app/assets/images/front/license/';

var LicenseButton = React.createClass({
    getDefaultProps: function () {
        return {
            content: '<h3 style="text-align: center; font-size: 24px; font-weight: bold;" >' +
            'Образовательная лицензия' +
            '</h3>' +
            '<br/>' +
            'Онлайн-платформа разработана ООО "Инженерно-образовательный центр". Организация имеет лицензию на ведение образовательной деятельности.' +
            '<br/>' +
            '<br/>' +
            '' +
            '',
            photos: [BASE + 'lic1.jpg',
                     BASE + 'lic3.jpg',
                     BASE + 'lic2.jpg',
                     BASE + 'tov1.jpg',
                     BASE + 'tov2.jpg',
            ],

            icon: 'icon file',
            style: {

            },

            buttonName: 'Лицензия'
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

        contentPlaceholder: {
            padding: 10,
            fontSize: 18
        },

        photosPlaceholder: {
            textAlign: 'center'
        },

        photoItem: {
            width: 400,
            height: 600,
            backgroundColor: 'lightgrey',
            borderRadius: 4,
            border: '1px solid #EFF0F1',
            margin: 10,
            cursor: 'pointer',
            display: 'inline-block',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
        },

        buttonStyle: {
            display: 'inline-block',
            cursor: 'pointer',
            //textDecoration: 'underline',
            color: '#2E3C54',
            fontSize: 16
        },

        dialogPanelStyle: {
            width: 860,
            padding: 10
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

    getDialogContent: function(){
        var photos = this.props.photos;
        return (
            <div>

                <div style={this.componentStyle.contentPlaceholder}>
                    <div dangerouslySetInnerHTML={{__html: this.props.content}}></div>
                </div>

                <div style={this.componentStyle.photosPlaceholder}>

                    {photos.map(function(p, k){
                        var key = 'photo_' + k;
                        var st = assign({}, this.componentStyle.photoItem, {backgroundImage: 'url(\'' + p + '\')'});
                        return (
                            <a href={p} target="_blank" key={key} style={st}>

                            </a>
                        );
                    }, this)}

                </div>

            </div>
        );
    },

    render: function () {
        var st = assign({}, this.componentStyle.buttonStyle, this.props.style);
        return (
            <div style={this.componentStyle.placeholder}>

                <span style={st} onClick={this.show} >
                    <i className={this.props.icon} ></i> {this.props.buttonName}
                </span>

                {this.state.dialogVisible == false ? null :
                    <Dialog
                        content={this.getDialogContent()}
                        onClose={this.onClose}
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        visible={true}  />
                }

            </div>
        );
    }

});

module.exports = LicenseButton;