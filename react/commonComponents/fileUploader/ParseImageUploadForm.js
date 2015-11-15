/**
 * Created by sabir on 16.08.15.
 */
var React = require('react');
var assign = require('object-assign');
var ParseFileUploadForm = require('../fileUploader/ParseFileUploadForm');

var ParseImageUploadForm = React.createClass({
    getDefaultProps: function () {
        return {
            imageUploaded: function(url){
                console.log('imageUploaded: url = ', url);
            },
            imageConfirmed: function(url){
                console.log('mage confirmed: url = ', url);
            },
            name: 'Загрузка картинки'
        }
    },


    getInitialState: function () {
        return {
            url: undefined,
            imageUploaded: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    fileUploaded: function(url){
        console.log('ParseImageUploadForm: fileUploaded: url = ', url);
        this.props.imageUploaded(url);
        this.setState({
            url: url,
            imageUploaded: true
        });
    },



    fileConfirmed: function(url){
        this.props.imageConfirmed(url);
    },

    componentStyle:{
        placeholder: {

        },
        imagePlaceholder: {
            textAlign: 'center'
        },
        image: {
            height: 200
        }
    },

    render: function () {
        console.log('rendering parse image uload form: url = ', this.state.url);
        return (
            <div style={this.componentStyle.placeholder}>
                <ParseFileUploadForm name={this.props.name} okButtonName={'ОК, использовать эту картинку'} showLink={false} fileConfirmed={this.fileConfirmed} fileUploaded={this.fileUploaded}  >
                    {this.state.url != undefined ?
                        (<div  style={this.componentStyle.imagePlaceholder}>
                            <img src={this.state.url} style={this.componentStyle.image} />
                        </div>)
                        :
                        (<div></div>)
                    }
                </ParseFileUploadForm>
            </div>
        );
    }

});

module.exports = ParseImageUploadForm;