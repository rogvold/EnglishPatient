/**
 * Created by sabir on 16.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var NotificationMixin = require('../../mixins/NotificationMixin');

var SelfLoadingUserExercise = require('../exercise/SelfLoadingUserExercise');

var moment = require('moment');

var NotificationItem = React.createClass({
    getDefaultProps: function () {
        return {
            notificationId: undefined,
            userId: undefined,

            forRole: undefined,
            name: undefined,

            timestamp: undefined,

            content: undefined,
            attachment: undefined,
            status: undefined,

            notificationViewed: function(no){

            }

        }
    },

    getInitialState: function () {
        return {
            loading: false,
            status: this.props.status
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            status: nextProps.status
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            padding: 10,
            //width: 630,
            width: 652,
            position: 'relative',
            margin: '0 auto',
            marginBottom: 10,
            position: 'relative'
        },

        namePlaceholder: {
            fontSize: '16px',
            //fontWeight: 'bold',
            borderBottom: '1px solid #EFF0F1',
            paddingBottom: 5
        },

        contentPlaceholder: {
            paddingTop: 10,
            paddingBottom: 10
        },

        attachmentPlaceholder: {

        }
    },

    viewNotification: function(){
        this.setState({
            loading: true
        });
        NotificationMixin.makeNotificationViewed(this.props.notificationId, function(no){
            this.setState({
                loading: false,
                status: 'viewed'
            });
            this.props.notificationViewed(no);
        }.bind(this));
    },

    render: function () {
        var att = this.props.attachment;
        var forRole = this.props.forRole;
        var dateString = moment(this.props.timestamp).format('D MMMM YYYY HH:mm');
        var fromNow = moment(this.props.timestamp).fromNow();

        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.namePlaceholder}>
                    {dateString}
                    <sup style={{opacity: 0.7, fontStyle: 'italic', marginLeft: 5}}>{fromNow}</sup>
                </div>


                    <div style={{marginTop: -30, textAlign: 'right'}} >
                        {this.state.status == 'viewed' ?
                            <div style={{marginTop: 6, opacity: 0.7}}>
                                <i className={'icon check'} ></i>
                                уведомление прочитано
                            </div>
                            :
                            <button className={'ui mini basic button'} onClick={this.viewNotification}>
                                <i className={'icon check'}></i> отметить прочитанным
                            </button>
                        }
                    </div>


                <div style={this.componentStyle.contentPlaceholder}>
                    <div dangerouslySetInnerHTML={{__html: this.props.content}} >

                    </div>
                </div>

                {att == undefined ? null :
                    <div style={this.componentStyle.attachmentPlaceholder}>

                        {((att.type == 'exercise') && (forRole == 'teacher')  ) ?
                        <div>
                            <SelfLoadingUserExercise userId={att.userId}
                                                     exerciseId={att.exerciseId}
                                                     teacherId={this.props.userId}
                                                     teacherMode={true}
                                />
                        </div> : null
                        }

                    </div>

                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>



            </div>
        );
    }

});

module.exports = NotificationItem;