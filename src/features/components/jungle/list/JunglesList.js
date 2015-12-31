/**
 * Created by sabir on 28.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var JunglesItem = require('./JunglesItem');

var TopicDialog = require('../../topics/dialog/TopicDialog');

var SelfLoadingJungleMaterial = require('../SelfLoadingJungleMaterial');

var JunglesList = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            materials: []
        }
    },

    getInitialState: function () {
        return {
            selectedMaterial: undefined,
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        listPlaceholder: {

        }
    },

    onItemClick: function(m){
        this.setState({
            selectedMaterial: m,
            dialogVisible: true
        });
    },

    getDialogContent: function(){
        var m = this.state.selectedMaterial;
        if (m == undefined){
            return null;
        }
        return (
            <SelfLoadingJungleMaterial
                userId={this.props.userId}
                materialId={m.id} />
        );

    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    render: function () {
        var list = this.props.materials;
        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>

                    {list.map(function(m, k){
                        var key = 'j_material_' + k;
                        var onItemClick = this.onItemClick.bind(this, m);
                        return (
                            <div key={key} style={{marginBottom: 5}} >
                                <JunglesItem name={m.name}
                                             onItemClick={onItemClick}
                                             materialId={m.id}
                                             userId={this.props.userId}
                                             description={m.description} avatar={m.avatar} />
                            </div>
                        );

                    }, this)}

                </div>


                {this.state.dialogVisible == false ? null :
                    <TopicDialog content={this.getDialogContent()} onClose={this.onClose} />
                }

            </div>
        );
    }

});

module.exports = JunglesList;