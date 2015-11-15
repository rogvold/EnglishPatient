/**
 * Created by sabir on 27.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var FeedItemsList = require('./FeedItemsList');

var PagedFeedItemsList = React.createClass({
    getDefaultProps: function () {
        return {
            items: [],
            pageSize: 5,
            loadMoreButtonName: 'Загрузить еще',
            userId: undefined,
            teacherId: undefined,

            editMode: false,
            teacherMode: true,

            onFeedItemUpdated: function(item){

            },

            onFeedItemDeleted: function(itemId){

            }

        }
    },

    getInitialState: function () {
        return {
            loadedNumber: this.props.pageSize
        }
    },

    componentWillReceiveProps: function (nextProps) {
        //this.setState({
        //    loadedNumber: this.props.pageSize
        //});
    },

    loadMore: function(){
        var n = this.state.loadedNumber + this.props.pageSize;
        this.setState({
            loadedNumber: n
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        itemsPlaceholder: {

        },

        loadMorePlaceholder: {
            marginTop: 10,
            paddingTop: 10,
            marginBottom: 10,
            textAlign: 'center'
        }
    },

    onFeedItemUpdated: function(item){
        this.props.onFeedItemUpdated(item);
    },

    onFeedItemDeleted: function(itemId){
        this.props.onFeedItemDeleted(itemId);
    },

    render: function () {

        var loadMoreVisible = (this.state.loadedNumber < this.props.items.length);

        console.log('rendering PagedFeedItemsList: this.props.items = ', this.props.items);

        var items = (this.props.items == undefined) ? [] : this.props.items;
        var items = items.slice(0, this.state.loadedNumber);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.itemsPlaceholder}>
                    <FeedItemsList items={items} editMode={this.props.editMode}
                                   onFeedItemUpdated={this.onFeedItemUpdated} onFeedItemDeleted={this.onFeedItemDeleted}
                                   userId={this.props.userId}
                                   teacherId={this.props.teacherId} teacherMode={this.props.teacherMode}
                        />
                </div>

                {loadMoreVisible == false ? null :
                    <div style={this.componentStyle.loadMorePlaceholder}>
                        <button className={'ui basic grey button'} onClick={this.loadMore} >
                            <i className={'angle double down icon'} ></i>
                            {this.props.loadMoreButtonName}
                        </button>
                    </div>
                }

            </div>
        );
    }

});

module.exports = PagedFeedItemsList;