/**
 * Created by sabir on 24.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var CardsList = require('./CardsList');

var PagedCardsList = React.createClass({
    getDefaultProps: function () {
        return {
            cards: [],
            pageSize: 12,
            editMode: false,
            showDialogOnMaterialClick: true,
            onMaterialUpdated: function(data){

            },
            onMaterialDeleted: function(){

            },

            onMaterialClick: function(card){

            },

            onSelect: function(card){

            },

            dialogLevel: 10,

            itemStyle: {

            },

            hoverMode: false,

            allGroupsList: []
        }
    },

    getInitialState: function () {
        return {
            visibleNumber: this.props.pageSize
        }
    },

    componentWillReceiveProps: function (nextProps) {
        //var cards = nextProps.cards;
        //if (cards != undefined){
        //    this.setState({
        //        visibleNumber: this.props.pageSize
        //    });
        //}
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            //width: 860,
            //width: 860,
            margin: '0 auto'
        },

        cardsPlaceholder: {

        },

        bottomPlaceholder: {
            position: 'relative'
        },

        loadMoreButtonPlaceholder: {
            position: 'absolute',
            left: 0
        },

        loadAllPlaceholder: {
            position: 'absolute',
            right: 0,
            top: 0,
            padding: 8,
            opacity: 0.6
        },

        allButton: {
            textDecoration: 'underline',
            cursor: 'pointer',
            marginLeft: 10
        }
    },

    showMore: function(){
        this.setState({
            visibleNumber: this.state.visibleNumber + this.props.pageSize
        });
    },

    showAll: function(){
        this.setState({
            visibleNumber: this.props.cards.length
        });
    },

    onMaterialUpdated: function(data){
        console.log('PagedCardsList: onMaterialUpdated occured: data = ', data);
        this.props.onMaterialUpdated(data);
    },

    onMaterialDeleted: function(){
        this.props.onMaterialDeleted();
    },

    onMaterialClick: function(card){
        this.props.onMaterialClick(card);
    },

    onSelect: function(card){
        this.props.onSelect(card);
    },

    render: function () {
        //console.log('rendering PagedCardsList  this.state.visibleNumber = ', this.state.visibleNumber);
        //console.log('rendering PagedCardsList  this.props.allGroupsList = ', this.props.allGroupsList);
        var cards = this.props.cards;
        var nextButtonVisible = (this.state.visibleNumber < this.props.cards.length);

        var cardsList = cards.slice(0, this.state.visibleNumber);
        var loadedNumber = Math.min(this.state.visibleNumber, cards.length);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.cardsPlaceholder}>
                    <CardsList allGroupsList={this.props.allGroupsList} hoverMode={this.props.hoverMode}
                               onMaterialUpdated={this.onMaterialUpdated} onMaterialDeleted={this.onMaterialDeleted}
                               editMode={this.props.editMode} cards={cardsList} itemStyle={this.props.itemStyle}
                               showDialogOnMaterialClick={this.props.showDialogOnMaterialClick}
                               dialogLevel={this.props.dialogLevel}
                               onSelect={this.onSelect}
                        />
                </div>

                <div style={this.componentStyle.bottomPlaceholder}>

                    {nextButtonVisible == false ? null :
                        <div>
                            <div stlye={this.componentStyle.loadMoreButtonPlaceholder}>
                                <button className={'ui basic grey button'} onClick={this.showMore} >
                                    Загрузить еще {this.props.pageSize}
                                </button>
                            </div>

                            <div style={this.componentStyle.loadAllPlaceholder}>
                                <div>
                                    загружено <b>{this.state.visibleNumber}</b> из <b>{cards.length}</b>
                                    <span style={this.componentStyle.allButton} onClick={this.showAll} >загрузить все</span>
                                </div>
                            </div>

                        </div>

                    }

                </div>


            </div>
        );
    }

});

module.exports = PagedCardsList;