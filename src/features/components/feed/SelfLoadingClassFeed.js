/**
 * Created by sabir on 27.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var FeedMixin = require('../../mixins/FeedMixin');

var PagedFeedItemsList = require('./PagedFeedItemsList');

var SelfLoadingClassFeed = React.createClass({
    getDefaultProps: function () {
        return {
            classId: undefined,
            userId: undefined,
            teacherId: undefined,

            editMode: false,
            teacherMode: true,

            onFeedItemUpdated: function(item){

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

    componentStyle: {
        placeholder: {}
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

    render: function () {
        var items = this.state.feedItems;

        return (
            <div style={this.componentStyle.placeholder}>

                {items == undefined || items.length == 0 ? null :
                    <PagedFeedItemsList userId={this.props.userId} teacherId={this.props.teacherId}
                        items={this.state.feedItems} editMode={this.props.editMode}
                        teacherMode={this.props.teacherMode}
                        classId={this.props.classId}
                        onFeedItemUpdated={this.onFeedItemUpdated} />
                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingClassFeed;