/**
 * Created by sabir on 16.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var NotificationsList = require('./NotificationsList');

var PagedNotificationsList = React.createClass({
    getDefaultProps: function () {
        return {

            userId: undefined,

            pageSize: 10,
            loadMoreButtonName: 'Загрузить еще',
            notifications: [],

            notificationViewed: function(no){

            }
        }
    },

    getInitialState: function () {
        return {
            loadedNumber: this.props.pageSize
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    loadMore: function(){
        var n = this.state.loadedNumber + this.props.pageSize;
        this.setState({
            loadedNumber: n
        });
    },

    componentStyle: {
        placeholder: {

        },

        loadMorePlaceholder: {
            marginTop: 10,
            paddingTop: 10,
            marginBottom: 10,
            textAlign: 'center'
        }
    },

    notificationViewed: function(no){
        this.props.notificationViewed(no);
    },

    render: function () {
        var loadMoreVisible = (this.state.loadedNumber < this.props.notifications.length);
        var items = (this.props.notifications == undefined) ? [] : this.props.notifications;
        var items = items.slice(0, this.state.loadedNumber);

        return (
            <div style={this.componentStyle.placeholder}>

                <NotificationsList
                            notificationViewed={this.notificationViewed}
                            notifications={items}
                            userId={this.props.userId}
                />

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

module.exports = PagedNotificationsList;