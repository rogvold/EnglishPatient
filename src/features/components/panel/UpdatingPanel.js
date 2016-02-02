/**
 * Created by sabir on 16.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var ParseMixin = require('../../../react/mixins/commonMixins/ParseMixin');

var Dialog = require('../dialog/Dialog');

var CoolPreloader = require('../preloader/CoolPreloader');

var UpdatingPanel = React.createClass({
    getDefaultProps: function () {
        return {
            parseClass: undefined,
            objectId: undefined,
            fieldName: undefined,
            name: undefined,

            fieldNamePlaceholder: undefined,


            style: {

            },

            nameStyle: {

            },

            contentStyle: {

            },

            editMode: true,

            contentType: 'input' // input / textarea / editableContent
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            value: undefined,
            parseObject: undefined,
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    load: function(){
        var parseClass = this.props.parseClass;
        var objectId = this.props.objectId;
        var fieldName = this.props.fieldName;

        if (parseClass == undefined || objectId == undefined || fieldName == undefined){
            return;
        }

        this.setState({
            loading: true
        });

        ParseMixin.loadClassItemByParseClass(parseClass, objectId, function(obj){
            var val = obj.get(fieldName);
            this.setState({
                value: val,
                parseObject: obj,
                loading: false
            });
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            width: '100%',
            backgroundColor: 'white',
            padding: 10,
            minHeight: 40,
            border: '1px solid #EFF0F1'
        },

        namePlaceholder: {
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: 10
        },

        contentStyle: {

        },

        dialogPanelStyle: {
            width: 700,
            padding: 20
        },

        editButtonPlaceholder: {
            position: 'absolute',
            top: 10,
            right: 10
        },

        saveButtonPlaceholder: {
            paddingTop: 10,
            paddingBottom: 10,
            textAlign: 'right'
        }

    },

    onTextChange: function(evt){
        var val = evt.target.value;
        this.setState({
            value: val
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    show: function(){
        this.setState({
            dialogVisible: true
        });
    },

    onUpdate: function(){
        var val = this.state.value;
        if (val != undefined){
            val = val.trim();
        }
        var parseObject = this.state.parseObject;
        if (parseObject == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        parseObject = ParseMixin.safeSet(parseObject, [{name: this.props.fieldName, value: val}]);
        parseObject.save().then(function(savedObject){
            this.setState({
                parseObject: savedObject,
                loading: false
            });
            this.onClose();
        }.bind(this));

    },

    getDialogContent: function(){

        return (
            <div>

                {this.props.contentType != 'input' ? null :
                    <div className={'ui form'} >
                        <b>{this.props.name}</b>
                        <br/>
                        <input value={this.state.value}
                               onChange={this.onTextChange}
                               placeholder={this.props.fieldNamePlaceholder} />
                    </div>
                }

                {this.props.contentType != 'textarea' ? null :
                    <div className={'ui form'} >
                        <b>{this.props.name}</b>
                        <br/>
                        <textarea value={this.state.value}
                                  onChange={this.onTextChange}
                                  placeholder={this.props.fieldNamePlaceholder} ></textarea>
                    </div>
                }

                <div style={this.componentStyle.saveButtonPlaceholder}>
                    <button className={'ui button patientPrimary'} disabled={this.state.loading} onClick={this.onUpdate} >
                        <i className={'icon save'} ></i>
                        {this.state.loading == true ? <span>Сохранение...</span> : <span>Сохранить</span>}
                    </button>
                </div>

            </div>
        );

    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.style);
        var nameSt = assign({}, this.componentStyle.namePlaceholder, this.props.nameStyle);
        var contentSt = assign({}, this.componentStyle.contentStyle, this.props.contentStyle);

        var val = this.state.value;
        if (val == undefined){
            val = '';
        }
        val = val.replace(/\n/g, '<br/>');

        return (
            <div style={st}>

                {this.props.name == undefined ? null :
                    <div style={nameSt} >
                        {this.props.name}
                    </div>
                }

                {this.state.value == undefined ? null :
                    <div style={contentSt} >
                        <div dangerouslySetInnerHTML={{__html: val}} ></div>
                    </div>
                }

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

                {this.props.editMode == false ? null :
                    <div style={this.componentStyle.editButtonPlaceholder}>
                        <button style={{padding: 5, paddingRight: 3}}
                            className={'ui basic button mini'} onClick={this.show} >
                            <i className={'icon pencil'} style={{marginRight: 0}} ></i>
                        </button>
                    </div>
                }

                {this.state.dialogVisible == false ? null :
                    <Dialog
                        visible={true}
                        onClose={this.onClose}
                        content={this.getDialogContent()}
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        />
                }

            </div>
        );
    }

});

module.exports = UpdatingPanel;