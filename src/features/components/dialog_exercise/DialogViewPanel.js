/**
 * Created by sabir on 19.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogCard = require('./card/DialogCard');

var SelfLoadingDialogPanel = require('./view/SelfLoadingDialogPanel');

var moment = require('moment');

var DialogViewPanel = React.createClass({
    getDefaultProps: function () {
        return {
            dialog: {},
            userId: undefined
        }
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 900,
            padding: 4,
            height: '100%'
        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            borderRight: '1px solid #EFF0F1',
            width: 280,
            pading: 5
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 610,
            padding: 5
        },

        avatarPlaceholder: {
            width: 270,
            height: 180
        },

        infoPlaceholder: {
            padding: 5
        }

    },

    render: function () {
        var dialog = this.props.dialog;
        var sDate = moment(dialog.timestamp).format('LLL');


        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.left}>

                    <div style={this.componentStyle.avatarPlaceholder}>
                        <DialogCard avatar={dialog.avatar} name={dialog.name} />
                    </div>

                    <div style={this.componentStyle.infoPlaceholder}>
                        <span style={{marginRight: 5}} >
                            <b><i className={'icon calendar'} ></i> дата создания:</b>
                        </span>
                        {sDate}

                        <br/>

                        <span style={{marginRight: 5}} >
                            <b><i className={'icon file'} ></i> описание:</b>
                        </span>

                        {dialog.description}

                    </div>

                </div>

                <div style={this.componentStyle.right}>
                    <SelfLoadingDialogPanel userId={this.props.userId} dialogId={dialog.id} />
                </div>

            </div>
        );
    }

});

module.exports = DialogViewPanel;