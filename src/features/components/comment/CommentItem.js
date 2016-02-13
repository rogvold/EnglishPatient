/**
 * Created by sabir on 13.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var UserCommunityHeaderPanel = require('../user_interface/UserCommunityHeaderPanel');

var moment = require('moment');

var CommentItem = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            content: undefined,
            attachments: [],
            timestamp: undefined
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
        placeholder: {
            //padding: 10,
            backgroundColor: 'white',
            position: 'relative'
        },

        contentPlaceholder: {

        },

        attachmentsPlaceholder: {

        },

        datePlaceholder: {
            position: 'absolute',
            right: 0,
            top: 0,
            fontSize: 10,
            opacity: 0.4
        }
    },

    getCustomInfo: function(){
        var content = this.props.content;
        var attachments = (this.props.attachments == undefined) ? [] : this.props.attachments;
        if (content != undefined){
            content = content.replace(/\n/g, '<br/>');
        }

        return (
            <div>
                {content == undefined ? null :
                    <div style={this.componentStyle.contentPlaceholder}>
                        <div dangerouslySetInnerHTML={{__html: content}} ></div>
                    </div>
                }

                {attachments.length == 0 ? null :
                    <div style={this.componentStyle.attachmentsPlaceholder}>

                    </div>
                }
            </div>
        )
    },

    render: function () {
        var content = this.props.content;
        var attachments = (this.props.attachments == undefined) ? [] : this.props.attachments;
        var st = assign({}, this.componentStyle.placeholder);
        if (content == undefined && attachments.length == 0){
            st = assign({}, st, {display: 'none'});
        }
        var customInfo = this.getCustomInfo();
        var sDate = moment(this.props.timestamp).format('D MMM HH:mm');

        return (
            <div style={st}>
                <UserCommunityHeaderPanel userId={this.props.userId}
                                          customInfo={customInfo}
                                          style={{width: '100%'}}
                                          userNameStyle={{fontSize: 12}}
                                          infoStyle={{opacity: 1, fontSize: 12}}
                    />

                <div style={this.componentStyle.datePlaceholder}>
                    {sDate}
                </div>

            </div>
        );
    }

});

module.exports = CommentItem;