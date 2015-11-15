/**
 * Created by sabir on 24.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var MaterialCard = require('./MaterialCard');

var CardsList = React.createClass({
    getDefaultProps: function () {
        return {
            cards: [],
            editMode: false,
            teacherId: undefined,
            allGroupsList: [],
            showDialogOnMaterialClick: true,

            dialogLevel: 10,

            onMaterialUpdated: function(data){

            },
            onMaterialDeleted: function(){

            },

            onMaterialClick: function(data){

            },

            onSelect: function(card){

            },

            itemStyle: {

            },

            hoverMode: false
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    onMaterialUpdated: function(data){
        console.log('CardsList: onMaterialUpdated: data = ', data);
        this.props.onMaterialUpdated(data);
    },

    onMaterialDeleted: function(){
        this.props.onMaterialDeleted();
    },

    onMaterialClick: function(card){
        console.log('onMaterialClick occured: ', card);
        this.props.onMaterialClick(card);
    },

    onSelect: function(card){
        this.props.onSelect(card);
    },

    render: function () {

        //console.log('rendering cards list : this.props.allGroupsList = ', this.props.allGroupsList);

        var list = this.props.cards;

        //console.log('rendering CardsList: cards = ', this.props.cards);

        return (
            <div style={this.componentStyle.placeholder}>
                {list.map(function(card, k){
                    var key = 'card_' + k + '_' + card.id;
                    var onMaterialUpdated = this.onMaterialUpdated;
                    //var onMaterialUpdated = this.onMaterialUpdated.bind(this);
                    var onMaterialDeleted = this.onMaterialDeleted;
                    var onMaterialClick = this.onMaterialClick.bind(this, card);
                    var onMaterialSelect = this.onSelect.bind(this, card);

                    //var onMaterialDeleted = this.onMaterialDeleted.bind(this);
                    return (
                        <MaterialCard allGroupsList={this.props.allGroupsList} onSelect={onMaterialSelect}
                                      onMaterialUpdated={onMaterialUpdated} onMaterialDeleted={onMaterialDeleted}
                                      materialId={card.id} teacher={this.props.teacherId} key={key}
                                      onMaterialClick={onMaterialClick} hoverMode={this.props.hoverMode}
                                      dialogLevel={this.props.dialogLevel}
                                      editMode={this.props.editMode} name={card.name} avatar={card.avatar}
                                      style={this.props.itemStyle} showDialogOnMaterialClick={this.props.showDialogOnMaterialClick}
                            />
                    );
                }, this)}
            </div>
        );
    }

});

module.exports = CardsList;