/**
 * Created by sabir on 14.08.15.
 */
var React = require('react');
var assign = require('object-assign');
var ItemWrapper = require('./ItemWrapper');
var FileUploadButton = require('../fileUploader/FileUploadButton');


var InputItem = React.createClass({
    getDefaultProps: function () {
        return {
            placeholder: 'default placeholder',
            value: 'default value',
            label: 'default label',
            description: '',
            fileLink: false, // link for upload dialog
            type: 'input', // can be either 'input' or 'textarea'
            fieldName: 'text',
            onChange: function(text){
                console.log('onChange occured: text = ', text);
            },
            disabled: false
        }
    },

    getInitialState: function () {
        return {
            text: this.props.value
        }
    },

    onChange: function(e){
        var val = e.target.value;
        this.setState({
            text: val
        });
        this.props.onChange(val);
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.props.value != nextProps.value){
            this.setState({
                text: nextProps.value
            });
        }
    },

    componentDidMount: function () {
        this.setState({
            text: this.props.value
        });
    },

    fileUploaded: function(url){
        this.setState({
            text: url
        });
        this.props.onChange(url);
    },

    componentStyle: {
        placeholder: {
            display: 'block',
            width: '100%',
            marginBottom: 25
        },
        input: {
            width: '100%',
            height: 40,
            fontSize: 24,
            lineHeight: '30px',
            padding: 5
        },
        textarea: {
            width: '100%',
            height: 120,
            fontSize: 24,
            lineHeight: '30px',
            padding: 5,
            borderColor: '#EEEEEE'
        },
        fileLinkPlaceholder:{
            textAlign: 'right'
        },
        fileLink: {
            cursor: 'pointer',
            marginBottom: 5,
            display: 'inline-block'
        }
    },

    render: function () {
        var isInput = (this.props.type == 'input') ? true: false;
        var key = this.props.fieldName;
        var val = this.state.text;
        return (
            <div className={'inputItem'} style={this.componentStyle.placeholder}  >
                <ItemWrapper label={this.props.label} description={this.props.description} >
                    {isInput ? (
                        <input key={'input_' + key} style={this.componentStyle.input} placeholder={this.props.placeholder} onChange={this.onChange} value={val} disabled={this.props.disabled}  />
                    ) : (
                        <textarea key={'input_' + key} style={this.componentStyle.textarea} placeholder={this.props.placeholder} onChange={this.onChange} value={val} disabled={this.props.disabled} ></textarea>
                    )}

                    {this.props.fileLink ? (
                        <div style={this.componentStyle.fileLinkPlaceholder}>
                            <FileUploadButton buttonStyle={this.componentStyle.fileLink} buttonName={'загрузить файл'} fileUploaded={this.fileUploaded}  buttonClassName={''} />
                        </div>
                    ) : (
                        <div></div>
                    )}

                </ItemWrapper>
            </div>
        );
    }

});


module.exports = InputItem;
