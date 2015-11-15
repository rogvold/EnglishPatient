/**
 * Created by sabir on 15.08.15.
 */
var React = require('react');
var ParseMixin = require('../../../mixins/common/ParseMixin');
var InputBunch = require('./InputBunch');


var ParseEditForm = React.createClass({
    mixins: [ParseMixin],
    getDefaultProps: function () {
        return {
            fields: [

            ],
            parseObject: undefined,
            beforeUpdate: function(){
                console.log('beforeUpdate');
            },
            afterUpdate: function(updatedObject){
                console.log('afterUpdate: o = ', updatedObject);
            },
            name: '',
            description: ''
        }
    },

    getInitialState: function () {
        return {
            parseObject: this.props.parseObject,
            isSaving: false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.parseObject != undefined){
            this.setState({
                parseObject: nextProps.parseObject
            });
        }
    },

    componentDidMount: function () {
        this.initParse();
    },

    onUpdate: function(fields){
        this.props.beforeUpdate();
        console.log('ParseEditForm: fields = ', fields);
        //todo: save parse object
        var o = this.state.parseObject;
        for (var i in fields){
            var f = fields[i];
            console.log('setting field ' + f.fieldName + ' = ' + f.value);
            o.set(f.fieldName, f.value);
        }
        var self = this;
        self.setState({
            isSaving: true
        });
        o.save().then(function(updatedObject){
            self.props.afterUpdate(updatedObject);
            console.log('parse object saved: updatedObject = ', updatedObject);
            self.setState({
                parseObject: updatedObject,
                isSaving: false
            });
        });
    },
    componentStyle: {
      placeholder: {

      }
    },


    render: function () {
        var flds = [];
        var fields = this.props.fields;
        var o = this.state.parseObject;
        if (o == undefined){
            return (<div></div>);
        }
        for (var i in fields){
            var f = fields[i];
            flds.push({
                fieldName: f.fieldName,
                placeholder: f.placeholder,
                description: f.description,
                label: f.label,
                type: f.type,
                value: o.get(f.fieldName),
                fileLink: f.fileLink
            });
        }

        return (
            <div style={this.componentStyle.placeholder}>
                <InputBunch fields={flds} onUpdate={this.onUpdate}
                            name={this.props.name} description={this.props.description}
                            updateButtonEnabled={!this.state.isSaving}
                            updateButtonName={this.state.isSaving ? 'Сохранение' : 'Сохранить'}
                    />
            </div>
        );
    }

});

module.exports = ParseEditForm;