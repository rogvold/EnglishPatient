/**
 * Created by sabir on 22.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var RecTextMixin = require('../../mixins/RecTextMixin');

var CoolPreloader = require('../preloader/CoolPreloader');

var AccessSwitcher = require('../exercise/info/AccessSwitcher');

var DeleteButton = require('../buttons/DeleteButton');

var RecTextAssignmentPanel = React.createClass({
    getDefaultProps: function () {
        return {
            feedItemId: undefined,

            onSaved: function(recText){

            },

            onDeleted: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            recTextId: undefined,
            description: undefined,
            inputType: 'text'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    load: function(){
        var feedItemId = this.props.feedItemId;
        this.setState({
            loading: true
        });
        RecTextMixin.loadRecTextByFeedItemId(feedItemId, function(recText){
            if (recText == undefined){
                this.setState({
                    loading: false
                });
            }else{
                this.setState({
                    loading: false,
                    recTextId: recText.id,
                    inputType: recText.inputType,
                    description: recText.description
                });
            }
        }.bind(this));
    },



    componentStyle: {
        placeholder: {
            position: 'relative',
            padding: 10
        },

        descriptionPlaceholder: {

        },

        descriptionTextarea: {
            minHeight: '4em',
            height: '6em'
        },

        inputTypePlaceholder: {
            marginTop: 5
        },

        previewPlaceholder: {
            paddingTop: 5,
            borderTop: '1px solid #EFF0F1'
        },

        saveButtonPlaceholder: {
            textAlign: 'right',
            borderTop: '1px solid #EFF0F1',
            paddingTop: 5,
            marginTop: 10
        },

        deleteButtonPlaceholder: {
            paddingTop: 5,
            paddingBottom: 5
        }

    },

    onInputTypeChange: function(newInputType){
        this.setState({
            inputType: newInputType
        });
    },

    onDescriptionChange: function(evt){
        var val = evt.target.value;
        if (val == ''){
            val = undefined;
        }
        this.setState({
            description: val
        });
    },

    getData: function(){
        return {
            inputType: this.state.inputType,
            description: this.state.description
        }
    },

    onSave: function(){
        console.log('RecTextAssignmentPanel: onSave occured');
        var recTextId = this.state.recTextId;
        var feedItemId = this.props.feedItemId;
        console.log('feedItemId = ', feedItemId);
        if (feedItemId == undefined){
            return;
        }
        var self = this;
        this.setState({
            loading: true
        });
        var data = this.getData();
        if (recTextId == undefined){
            RecTextMixin.createRecTextTask(feedItemId, data, function(recText){
                this.setState({
                    loading: false
                });
                this.props.onSaved(recText);
            }.bind(this));
        }else {
            RecTextMixin.updateRecText(recTextId, data, function(recText){
                this.setState({
                    loading: false
                });
                this.props.onSaved(recText);
            }.bind(this));
        }
    },

    onDelete: function(){
        var recTextId = this.state.recTextId;
        if (recTextId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        RecTextMixin.deleteRecTextTask(recTextId, function(){
            this.setState({
                loading: false
            });
            this.props.onDeleted();
        }.bind(this));
    },

    render: function () {
        var inputItems = [{
            name: 'text',
            icon: 'icon keyboard',
            displayName: 'Ввод текста'
        }, {
            name: 'voice',
            icon: 'icon unmute',
            displayName: 'Запись голоса'
        }];
        var recTextTextUrl = 'http://www.englishpatient.org/app/assets/images/rec_text_text.gif';
        var recTextRecUrl = 'http://beta.englishpatient.org/img/speaking.gif';

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.descriptionPlaceholder}>
                    <div className={'ui form'} >
                        <textarea placeholder={'Описание задания'}
                                  value={this.state.description}
                                  onChange={this.onDescriptionChange}
                                  style={this.componentStyle.descriptionTextarea}
                            ></textarea>
                    </div>
                </div>

                <div style={this.componentStyle.inputTypePlaceholder}>
                    <AccessSwitcher items={inputItems}
                                    activeName={this.state.inputType}
                                    onAccessChange={this.onInputTypeChange}
                        />
                </div>

                <div style={this.componentStyle.previewPlaceholder}>
                    <div style={{fontWeight: 'bold'}} >Превью</div>
                    <div style={{marginTop: 10}} >
                        <div dangerouslySetInnerHTML={{__html: this.state.description}} ></div>
                    </div>
                    <div style={{marginTop: 10}} >
                        {this.state.inputType == 'text' ?
                            <div>
                                <img src={recTextTextUrl} style={{width: '100%'}} />
                            </div> :
                            <div>
                                <img src={recTextRecUrl} style={{width: '100%'}} />
                            </div>
                        }
                    </div>
                </div>

                <div style={this.componentStyle.saveButtonPlaceholder}>
                    <button className={'ui button patientPrimary'} onClick={this.onSave} >
                        <i className={'icon save'}  ></i> Сохранить
                    </button>
                </div>

                {this.state.recTextId == undefined ? null :
                    <div style={this.componentStyle.deleteButtonPlaceholder}>
                        <DeleteButton onDelete={this.onDelete} />
                    </div>
                }

                {this.state.loading == false ? null :
                    <CoolPreloader  />
                }

            </div>
        );
    }

});

module.exports = RecTextAssignmentPanel;