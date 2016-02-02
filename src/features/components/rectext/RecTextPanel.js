/**
 * Created by sabir on 22.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var PatientRecordComponent = require('../record/PatientRecordComponent');

var RecTextPanel = React.createClass({
    getDefaultProps: function () {
        return {
            recTextId: undefined,
            description: undefined,
            inputType: undefined,

            text: undefined,
            url: undefined,

            onSave: function(data){
                console.log('RecTextPanel: onSave: data = ', data);
            }
        }
    },

    getInitialState: function () {
        return {
            text: this.props.text,
            url: this.props.url
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            text: nextProps.text,
            url: nextProps.url
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 630,
            margin: '0 auto',
            backgroundColor: 'white',
            padding: 5,
            border: '1px solid #EFF0F1',
            borderRadius: 4,
            marginBottom: 5
        },

        descriptionPlaceholder: {
            marginBottom: 10,
            paddingBottom: 5,
            borderBottom: '1px solid #EFF0F1'
        },

        content: {

        },

        textareaPlaceholder: {

        },

        recorderPlaceholder: {

        },

        savePlaceholder: {
            paddingTop: 5,
            textAlign: 'right'
        }
    },

    onTextChange: function(evt){
        var val = evt.target.value;
        if (val == ''){
            val = undefined;
        }
        this.setState({
            text: val
        });
    },

    onUrlSave: function(url){
        this.setState({
            url: url
        });
        setTimeout(function(){
            this.onSave();
        }.bind(this), 200);
    },

    onSave: function(){
        var data = this.getData();
        this.props.onSave(data);
    },

    getData: function(){
        return {
            text: this.state.text,
            url: this.state.url
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                {this.props.description == undefined ? null :
                    <div style={this.componentStyle.descriptionPlaceholder}>
                        <div dangerouslySetInnerHTML={{__html: this.props.description}} ></div>
                    </div>
                }

                <div style={this.componentStyle.content}>
                    {this.props.inputType == 'text' ?
                        <div>
                            <div style={this.componentStyle.textareaPlaceholder} className={'ui form'} >
                                <textarea value={this.state.text} placeholder={'Текст'} onChange={this.onTextChange} ></textarea>
                            </div>
                            <div style={this.componentStyle.savePlaceholder}>
                                <button style={{marginRight: 0}} className={'ui button patientPrimary'} onClick={this.onSave} >
                                    <i className={'icon save'} ></i> Сохранить
                                </button>
                            </div>

                        </div> : null
                    }

                    {this.props.inputType == 'voice' ?
                        <div style={this.componentStyle.recorderPlaceholder}>
                            <PatientRecordComponent
                                onSave={this.onUrlSave} userAnswer={this.state.url} />
                        </div> : null
                    }

                </div>


            </div>
        );
    }

});

module.exports = RecTextPanel;