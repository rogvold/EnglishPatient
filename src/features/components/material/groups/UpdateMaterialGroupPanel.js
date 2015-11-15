/**
 * Created by sabir on 24.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var DeleteButton = require('../../buttons/DeleteButton');

var UpdateMaterialGroupPanel = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            description: undefined,
            onSave: function(data){
                console.log(data);
            },

            onDelete: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            name: undefined,
            description: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            name: nextProps.name,
            description: nextProps.description
        })
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            padding: 5
        },

        saveButtonPlaceholder:{
            marginTop: 10,
            padding: 5,
            borderTop: '1px solid #EFF0F1',
            textAlign: 'right'
        },

        deleteButtonPlaceholder: {
            marginTop: 10,
            padding: 5,
            borderTop: '1px solid #EFF0F1'
        }
    },

    getValFromEvt: function(evt){
        var val = evt.target.value;
        if (val == undefined || val.trim() == ''){
            val = undefined;
        }
        return val;
    },


    onNameChange: function(evt){
        this.setState({
            name: this.getValFromEvt(evt)
        });
    },


    onDescriptionChange: function(evt){
        this.setState({
            description: this.getValFromEvt(evt)
        });
    },

    onSave: function(){
        var data = {
            name: this.state.name,
            description: this.state.description
        }
        this.props.onSave(data);
    },

    onDelete: function(){
        this.props.onDelete();
    },

    render: function () {
        var name = (this.state.name == undefined) ? '' : this.state.name;
        var description = (this.state.description == undefined) ? '' : this.state.description;


        return (
            <div style={this.componentStyle.placeholder} className={'ui form'} >

                <div className="field">
                    <label>Название категории</label>
                    <input type="text" value={name} onChange={this.onNameChange} placeholder="Название категории" />
                </div>

                <div className="field">
                    <label>Описание категории</label>
                    <textarea type="text" value={description} onChange={this.onDescriptionChange} placeholder="Описание категории" ></textarea>
                </div>

                <div style={this.componentStyle.saveButtonPlaceholder}>
                    <button className={'ui primary button'} onClick={this.onSave} >
                        <i className={'save icon'} ></i>
                        Сохранить
                    </button>
                </div>

                <div style={this.componentStyle.deleteButtonPlaceholder}>
                    <DeleteButton onDelete={this.onDelete} />
                </div>

            </div>
        );
    }

});

module.exports = UpdateMaterialGroupPanel;