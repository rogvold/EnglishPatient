/**
 * Created by sabir on 16.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../preloader/CoolPreloader');
var UserCommunityHeaderPanel = require('../../user_interface/UserCommunityHeaderPanel');

var MaterialInlineInfo = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('MaterialsStore')],
    getDefaultProps: function(){
        return {
            materialId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('MaterialsStore');
        var material = (this.props.materialId == undefined) ? undefined : store.getMaterial(this.props.materialId);
        var loading = store.materialsLoading || store.groupsLoading;
        return {
            loading: loading,
            material: material
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        var materialId = this.props.materialId;
        var material = (materialId == undefined) ? undefined : this.getFlux().store('MaterialsStore').getMaterial(materialId);
        if (material == undefined){
            this.getFlux().actions.refreshMaterial(this.props.materialId);
        }
    },

    componentStyle: {

        placeholder: {
            position: 'relative'
        },

        userHeaderPlaceholder: {

        },

        materialInfoPlaceholder: {
            paddingTop: 5,
            paddingBottom: 5,
            opacity: 0.8
        }
    },

    render: function(){
        var material = this.state.material;
        var userId = (material == undefined) ? undefined : material.teacherId;
        var name = (material == undefined) ? undefined : material.name;

        return (
            <div style={this.componentStyle.placeholder} >


                {userId == undefined ? null :
                    <div style={this.componentStyle.userHeaderPlaceholder}>
                        <UserCommunityHeaderPanel
                            profileLinkEnabled={true}
                            infoStyle={{opacity: 0.95, fontSize: 14}}
                            style={{minWidth: 250}}
                            customInfoHtml={name}
                            userId={userId}/>
                    </div>
                }

                {material == undefined ? null :
                    <div style={this.componentStyle.materialInfoPlaceholder}>

                        {(material.description == undefined || material.description.trim() == '' ) ? null :
                            <div>
                                {material.description}
                            </div>
                        }

                    </div>
                }


                {this.state.loading == false ? null :
                    <CoolPreloader />
                }
            </div>
        );
    }

});

module.exports = MaterialInlineInfo;