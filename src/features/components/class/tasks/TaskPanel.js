/**
 * Created by sabir on 28.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var FeedMixin = require('../../../mixins/FeedMixin');

var SelfLoadingClassFeed = require('../../feed/SelfLoadingClassFeed');
var PatientEditor = require('../../editor/PatientEditor');

var CreateNewFeedItemPanel = require('./CreateNewFeedItemPanel');

var CreateFeedItemButton = require('../../feed/button/CreateFeedItemButton');
var PagedFeedItemsList = require('../../feed/PagedFeedItemsList');

var TaskPanel = React.createClass({
    getDefaultProps: function () {
        return {
            classId: undefined,
            teacherId: undefined,
            feedId: undefined,

            onFeedItemUpdated: function(item){

            },

            onFeedItemCreated: function(item){

            }
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            feedItems: []
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var classId = nextProps.classId;
        if (classId == undefined){
            return;
        }
        this.load(classId, function(items){
            console.log('class feed loaded: items = ', items);
        });
    },

    componentDidMount: function () {
        var classId = this.props.classId;
        if (classId == undefined){
            return;
        }
        this.load(classId, function(items){
            console.log('class feed loaded: items = ', items);
        });
    },

    onFeedItemUpdated: function(item){
        var list = this.state.feedItems;
        for (var i in list){
            if (list[i].id == item.id){
                list[i] = item;
            }
        }
        this.props.onFeedItemUpdated(item);
        this.setState({
            feedItems: list
        });
    },

    onFeedItemCreated: function(item){
        var list = (this.state.feedItems == undefined) ? [] : this.state.feedItems;
        list.unshift(item);
        this.setState({
            feedItems: list
        });
        this.props.onFeedItemCreated(item);
    },

    onFeedItemDeleted: function(itemId){
        var list = (this.state.feedItems == undefined) ? [] : this.state.feedItems;
        var arr = [];
        for (var i in list){
            var f = list[i];
            if (f.id == itemId){
                continue;
            }
            arr.push(f);
        }
        this.setState({
            feedItems: arr
        });
    },


    load: function(classId, callback){
        this.setState({
            loading: true
        });
        FeedMixin.loadAllClassFeed(classId, function(items){
            this.setState({
                loading: false,
                feedItems: items
            });
            callback(items);
        }.bind(this))
    },

    componentStyle: {
        placeholder: {

        },

        feedPlaceholder: {
            marginTop: 10
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
            paddingTop: 15,
            paddingBottom: 15
        },

        createButtonPlaceholder: {
            position: 'absolute',
            right: 5,
            top: 7
        }

    },


    render: function () {
        var items = this.state.feedItems;


        return (
            <div style={this.componentStyle.placeholder}>

                    <div style={this.componentStyle.createBlock}>
                        Количество заданий в этом классе: <b>{items.length}</b>
                        <div style={this.componentStyle.createButtonPlaceholder}>
                            <CreateFeedItemButton onFeedItemCreated={this.onFeedItemCreated}
                                                  teacherId={this.props.teacherId} feedId={this.props.feedId}
                                                  buttonClassName={'ui button basic'} />
                        </div>
                    </div>

                {items == undefined || items.length == 0 ? null :
                    <PagedFeedItemsList userId={this.props.teacherId} teacherId={this.props.teacherId}
                                        items={items}
                                        classId={this.props.classId}
                                        teacherMode={false} editMode={true} onFeedItemDeleted={this.onFeedItemDeleted}
                                        onFeedItemUpdated={this.onFeedItemUpdated} />
                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = TaskPanel;