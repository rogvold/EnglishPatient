/**
 * Created by sabir on 01.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var KaraokeCard = require('./KaraokeCard');

var Dialog = require('../dialog/Dialog');

var SelfLoadingKaraokePlayerPanel = require('./SelfLoadingKaraokePlayerPanel');

var KaraokeCardsList = React.createClass({
    getDefaultProps: function () {
        return {

            materials: [],

            onItemClick: function(material){

            }

        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 810,
            margin: '0 auto',
            marginTop: 10
        }
    },

    onItemClick: function(material){
        this.props.onItemClick(material);
        this.setState({
            dialogVisible: true,
            selectedMaterial: material
        });
    },

    getDialogContent: function(){
        var m = this.state.selectedMaterial;
        if (m == undefined){
            return null;
        }

        return (
            <SelfLoadingKaraokePlayerPanel materialId={m.materialId} />
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

                {list.map(function(item, k){
                    var key = 'karaoke_' + k + '_' + item.materialId;
                    var onClick = this.onItemClick.bind(this, item)
                    return (
                        <KaraokeCard materialId={item.materialId}
                                     onItemClick={onClick}
                                     avatar={item.avatar}

                                     name={item.name} key={key} />
                    );

                }, this)}


                {this.state.dialogVisible == false ? null :

                    <Dialog dialogPanelStyle={{width: 960, paddingTop: 30, background: 'transparent'}}
                            visible={true} onClose={this.onClose} content={this.getDialogContent()} />

                }



            </div>
        );
    }

});

module.exports = KaraokeCardsList;