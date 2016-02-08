/**
 * Created by sabir on 22.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var MaterialUpdatePanel = require('./MaterialUpdatePanel');;

var ParseMixin = require('../../../../react/mixins/commonMixins/ParseMixin');
var MaterialsMixin = require('../../../mixins/MaterialsMixin');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var SelfLoadingMaterialUpdatePanel = React.createClass({
    mixins: [FluxMixin],

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
            youtubeId: undefined,
            start: undefined,
            end: undefined,
            duration: undefined,
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
                youtubeId: m.youtubeId,
                start: m.start,
                end: m.end,
                duration: m.duration,
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
                youtubeId: material.youtubeId,
                start: material.start,
                end: material.end,
                duration: material.duration,
                vimeoImgSrc: material.avatar,
                avatar: material.avatar,
                transcript: material.transcript,
                tags: material.tags,
                groups: material.tags
            });
            //material.materialId = this.props.materialId;
            //material.id = this.props.materialId;
            if (this.props.materialId != undefined){
                this.props.onMaterialUpdated(material);
                this.getFlux().actions.refreshMaterial(this.props.materialId); // !!!
            }else{
                this.props.onMaterialCreated(material);
                this.getFlux().actions.refreshMaterial(material.id); // !!!
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
            this.getFlux().actions.deleteMaterial(this.props.materialId);
        }.bind(this));
    },

    render: function () {
        console.log('SelfLoadingMaterialUpdatePanel: this.props.allGroupsList = ', this.props.allGroupsList);


        return (
            <div style={this.componentStyle.placeholder}>
                <MaterialUpdatePanel vimeoId={this.state.vimeoId}
                                     youtubeId={this.state.youtubeId}
                                     start={this.state.start} end={this.state.end}
                                     duration={this.state.duration} avatar={this.state.avatar}

                                     name={this.state.name}
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