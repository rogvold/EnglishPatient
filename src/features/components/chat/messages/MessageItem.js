/**
 * Created by sabir on 15.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var moment = require('moment');

var MessageItem = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,

            fromId: undefined,
            toId: undefined,
            status: undefined,

            content: undefined,
            timestamp: undefined,
            name: undefined,
            avatar: 'https://www.englishpatient.org/app/assets/images/chat_avatar.jpg',
            attachments: []
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
            maxWidth: 600,
            padding: 5,
            marginBottom: 0
        },

        avatarPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 48,
            height: 48,
            borderRadius: 4,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            marginRight: 10,
            marginLeft: 5
        },

        mainPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            maxWidth: 520
        },

        topPlaceholder: {

        },

        namePlaceholder: {
            fontWeight: 'bold',
            color: '#1B2432',
            display: 'inline-block'
        },

        timePlaceholder: {
            color: '#9e9ea6',
            display: 'inline-block',
            marginLeft: 10,
            fontSize: 12
        },

        messagePlaceholder: {
            maxWidth: 520
        },

        attachmentsPlaceholder: {
            marginTop: 5,
            marginBottom: 5

        },

        attLink: {
            fontSize: 12,
            color: '#1B2432',
            opacity: 0.6,
            textDecoration: 'underline'
        }
    },

    getFileIcon: function(url){
        if (url == undefined){
            return '';
        }
        if (url.indexOf('.jpg') > -1 || url.indexOf('.png') > -1 || url.indexOf('.gif') > -1){
            return 'icon file image outline';
        }
        return 'icon file outline';
    },

    render: function () {
        var sDate = moment(this.props.timestamp).format('h:m A DD.MM.YY');
        var avaSt = assign({}, this.componentStyle.avatarPlaceholder, {backgroundImage: 'url(\'' + this.props.avatar + '\')'});
        var list = this.props.attachments;

        var isNotRead = ((this.props.userId == this.props.toId) && (this.props.status == 'new'))

        return (
            <div style={this.componentStyle.placeholder} className={'patientMessageItem  ' + (isNotRead == true ? ' notRead ': '') } >

                <div style={avaSt}></div>

                <div style={this.componentStyle.mainPlaceholder}>
                    <div style={this.componentStyle.topPlaceholder}>

                        <div style={this.componentStyle.namePlaceholder}>
                            {this.props.name}
                        </div>

                        <div style={this.componentStyle.timePlaceholder}>
                            {sDate}
                        </div>

                    </div>
                    
                    <div style={this.componentStyle.messagePlaceholder}>
                        <div dangerouslySetInnerHTML={{__html: this.props.content}} ></div>

                        {list.length == 0 ? null :
                            <div style={this.componentStyle.attachmentsPlaceholder}>
                                {list.map(function(a, k){
                                    var key = 'key_att_' + k;
                                    return (
                                        <div key={key}>
                                            <a style={this.componentStyle.attLink} href={a} target="_blank" >
                                                <i className={this.getFileIcon(a)} ></i> {a.substring(a.lastIndexOf('/') + 1)}
                                            </a>
                                        </div>
                                    );
                                }, this)}
                            </div>
                        }

                    </div>

                </div>

            </div>
        );
    }

});

module.exports = MessageItem;