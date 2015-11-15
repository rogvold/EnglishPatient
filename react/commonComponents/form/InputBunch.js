/**
 * Created by sabir on 14.08.15.
 */
var React = require('react');
var assign = require('object-assign');
var InputItem = require('./InputItem');


var InputBunch = React.createClass({
    getDefaultProps: function () {
        return {
            fields: [
                {
                    fieldName: 'text',
                    label: 'this is label for text',
                    value: 'default val text',
                    placeholder: 'def placeholder text',
                    description: 'def description text',
                    type: 'input'
                },
                {
                    fieldName: 'color',
                    label: 'this is label for color',
                    value: 'default val color',
                    placeholder: 'def placeholder color',
                    description: 'def description color',
                    type: 'textarea'
                },
                {
                    fieldName: 'name',
                    label: 'this is label for name',
                    value: 'default val name',
                    placeholder: 'def placeholder name',
                    description: 'def description name',
                    type: 'input'
                }
            ],
            onUpdate: function(fields){
                console.log('onChange: new fields = ', fields);
            },
            updateButtonName: 'Сохранить',
            name: 'Это название формы',
            description: 'Это описание ыао дылавопр долвапр ыдваоп ывоап ыдвоап дыаорп',
            updateButtonEnabled: true
        }
    },

    getInitialState: function () {
        var map = {};
        var fields = this.props.fields;
        for (var i in fields){
            var f = fields[i];
            map[f.fieldName] = f;
        }
        return {
            fieldsMap: map
        }
    },

    onChange: function(key, value){
        console.log('InputBunch: onChange occured! key/value = ', key, value);
        console.log(key, value);
        var map = this.state.fieldsMap;
        map[key].value = value;
        this.setState({
            fieldsMap: map
        });
    },

    componentStyle: {
        placeholder: {
            display: 'block',
            width: '100%'
        },
        fieldsPlaceholder: {
            width: '100%'
        },
        updateButtonPlaceholder: {
            width: '100%',
            textAlign: 'right'
        },
        name: {
            textAlign: 'center',
            marginBottom: 2,
            fontSize: 24
        },
        description:{
            textAlign: 'center'
        }
    },

    onUpdateClick: function(){
        console.log('InputBunch: onUpdateClick occured');
        var arr = [];
        var map = this.state.fieldsMap;
        for (var key in map){
            var f = map[key];
            arr.push(f);
        }
        this.props.onUpdate(arr);
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    render: function () {
        var flds = [];
        var map = this.state.fieldsMap;
        for (var key in map){
            flds.push({
                fieldName: key,
                value: map[key].value,
                description: map[key].description,
                placeholder: map[key].placeholder,
                label: map[key].label,
                fileLink: map[key].fileLink,
                type: map[key].type
            });
        }

        return (
            <div className={'inputsBunch'} style={this.componentStyle.placeholder} >
                <h3 style={this.componentStyle.name}>{this.props.name}</h3>
                <p style={this.componentStyle.description} >{this.props.description}</p>

                <div className={'fieldsPlaceholder'} style={this.componentStyle.fieldsPlaceholder} >
                    {flds.map(function(f, i){
                        var key = f.fieldName;
                        var boundChange = this.onChange.bind(this, key);
                        return (<InputItem key={key} onChange={boundChange} value={f.value} placeholder={f.placeholder} label={f.label} fileLink={f.fileLink} type={f.type} description={f.description} />);
                    }, this)}
                </div>

                <div className={'updateButtonPlaceholder'} style={this.componentStyle.updateButtonPlaceholder} >
                    <button disabled={!this.props.updateButtonEnabled} className={'ui primary button '} onClick={this.onUpdateClick} >
                        <i className={'save icon'}></i>{this.props.updateButtonName}
                    </button>
                </div>
            </div>

        );
    }

});

module.exports = InputBunch;