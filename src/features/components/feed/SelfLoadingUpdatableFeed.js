/**
 * Created by sabir on 31.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var FeedMixin = require('../../mixins/FeedMixin');

var FeedItemsList = require('./FeedItemsList');

var CreateFeedItemButton = require('./button/CreateFeedItemButton');

var SelfLoadingUpdatableFeed = React.createClass({
    getDefaultProps: function () {
        return {
            feedId: undefined,
            editMode: true,
            teacherMode: true,

            userId: undefined,
            teacherId: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            feedItems: []
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {

        },

        createBlock: {
            backgroundColor: 'white',
            padding: 10,
            margin: '0 auto',
            width: 652,
            marginTop: 10,
            marginBottom: 10,
            border: '1px solid #EFF0F1',
            position: 'relative',
            //paddingTop: 15,
            //paddingBottom: 15,
            textAlign: 'right'
        },

        createButtonPlaceholder: {
            display: 'inline-block'
        },

        listPlaceholder: {
            width: 630,
            margin: '0 auto',
            marginTop: 10
        }
    },

    load: function(){
        var feedId = this.props.feedId;
        if (feedId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        FeedMixin.loadAllFeed(feedId, 'asc', function(items){
            this.setState({
                feedItems: items,
                loading: false
            });
        }.bind(this));
    },

    onFeedItemCreated: function(feedItem){
        var list = this.state.feedItems;
        if (list == undefined){
            list = [];
        }
        list.push(feedItem);
        this.setState({
            feedItems: list
        });
    },

    onFeedItemUpdated: function(){
        this.load();
    },

    onFeedItemDeleted: function(){
        this.load();
    },

    render: function () {
        var items = this.state.feedItems;

        return (
            <div style={this.componentStyle.placeholder}>

                {this.props.editMode == false ? null :
                    <div style={this.componentStyle.createBlock}>
                        <span style={{marginRight: 285}} >
                            {items.length == 0 ?
                                <span>Этот блок пуст</span> :
                                <span>
                                    Количество пакетов: <b>{items.length}</b>
                                </span>
                            }
                        </span>

                        <div style={this.componentStyle.createButtonPlaceholder}>

                            <CreateFeedItemButton onFeedItemCreated={this.onFeedItemCreated}
                                                  teacherId={this.props.teacherId} feedId={this.props.feedId}
                                                  buttonClassName={'ui button basic'} />

                        </div>
                    </div>
                }



                <div style={this.componentStyle.listPlaceholder}>

                    <FeedItemsList
                        onFeedItemDeleted={this.onFeedItemDeleted}
                        onFeedItemUpdated={this.onFeedItemUpdated}
                        teacherMode={this.props.teacherMode}
                        editMode={this.props.editMode}
                        items={items}

                        userId={this.props.userId}
                        teacherId={this.props.teacherId}

                        />

                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingUpdatableFeed;
