/**
 * Created by sabir on 22.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var MaterialUpdatePanel = require('./MaterialUpdatePanel');;

var ParseMixin = require('../../../../react/mixins/commonMixins/ParseMixin');
var MaterialsMixin = require('../../../mixins/MaterialsMixin');

var SelfLoadingMaterialUpdatePanel = React.createClass({
    getDefaultProps: function () {
        return {
            materialId: undefined,
            teacherId: undefined,
            onMaterialUpdated: function(m){
                console.log('onMaterialUpdated: m  = ', m);
            },
            onMaterialCreated: function(m){
                console.log('onMaterialCreate: m  = ', m);
            },
            onMaterialDeleted: function(){

            },
            allGroupsList: []
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            vimeoId: undefined,
            name: undefined,
            transcript: undefined,
            groups: [],
            tags: [],
            comment: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load(this.props.materialId, function(m){
            console.log('material loaded: ', m);
        });
    },

    componentStyle: {
        placeholder: {
            width: '100%'
        }
    },


    load: function(materialId, callback){
        if (materialId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        MaterialsMixin.loadMaterial(materialId, function(m){
            this.setState({
                loading: false,
                name: m.name,
                vimeoId: m.vimeoId,
                comment: m.comment,
                transcript: m.transcript,
                avatar: m.avatar,
                tags: m.tags,
                groups: m.groups
            });
            callback(m);
        }.bind(this));
    },

    onUpdate: function(data){
        this.setState({
            loading: true
        });

        data.creatorId = this.props.teacherId;

        MaterialsMixin.updateMaterial(this.props.materialId, data, function(material){
            console.log('MaterialsMixin.updateMaterial: updated material = ', material);
            this.setState({
                loading: false,
                name: material.name,
                comment: material.comment,
                vimeoId: material.vimeoId,
                transcript: material.transcript,
                tags: material.tags,
                groups: material.tags
            });
            //material.materialId = this.props.materialId;
            //material.id = this.props.materialId;
            if (this.props.materialId != undefined){
                this.props.onMaterialUpdated(material);
            }else{
                this.props.onMaterialCreated(material);
            }

        }.bind(this));
    },


    onDelete: function(){
        console.log('SelfLoadingMaterialUpdatePanel: onDelete');
        //this.setState({
        //    loading: true
        //});
        //fixit
        //this.props.onMaterialDeleted();
        MaterialsMixin.deleteMaterial(this.props.materialId, function(){
            this.props.onMaterialDeleted();
        }.bind(this));
    },

    render: function () {
        console.log('SelfLoadingMaterialUpdatePanel: this.props.allGroupsList = ', this.props.allGroupsList);


        return (
            <div style={this.componentStyle.placeholder}>
                <MaterialUpdatePanel vimeoId={this.state.vimeoId} name={this.state.name}
                                     comment={this.state.comment} transcript={this.state.transcript}
                                     tags={this.state.tags} groups={this.state.groups}
                                     onSave={this.onUpdate} teacherId={this.props.teacherId}
                                     onDelete={this.onDelete} materialId={this.props.materialId}
                                     allGroupsList={this.props.allGroupsList} />

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingMaterialUpdatePanel;