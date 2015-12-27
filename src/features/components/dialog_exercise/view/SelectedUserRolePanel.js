/**
 * Created by sabir on 18.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogCard = require('../card/DialogCard');

var SelectedUserRolePanel = React.createClass({
    getDefaultProps: function () {
        return {
            roleNumber: 0,
            dialog: {}

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
            width: 600,
            padding: 10,
            margin: '0 auto',
            backgroundColor: 'white'
        },

        left: {
            width: '50%',
            display: 'inline-block',
            verticalAlign: 'top',
            textAlign: 'left'
        },

        right: {
            width: '50%',
            display: 'inline-block',
            verticalAlign: 'top',
            textAlign: 'right'
        },

        cardPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top'
        },

        textPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top'
        }
    },



    render: function () {
        var leftInfo = {avatar: this.props.dialog.firstRoleImg, name: this.props.dialog.firstRoleName};
        var rightInfo = {avatar: this.props.dialog.secondRoleImg, name: this.props.dialog.secondRoleName};

        if (this.props.roleNumber == 1){
            var c = leftInfo;
            leftInfo = rightInfo;
            rightInfo = c;
        }

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.left}>

                    <DialogCard style={this.componentStyle.roleAvaStyle}
                                opacity={0.3}
                                mode={'round'} width={36}
                                avatar={leftInfo.avatar} />

                    <div style={this.componentStyle.textPlaceholder}>
                        Ваша роль <br/> <b>{leftInfo.name}</b>
                    </div>

                </div>

                <div style={this.componentStyle.right}>

                    <div style={this.componentStyle.textPlaceholder}>
                        Ваш собеседник <br/> <b>{rightInfo.name}</b>
                    </div>

                    <DialogCard style={this.componentStyle.roleAvaStyle}
                                opacity={0.3}
                                mode={'round'} width={36}
                                avatar={rightInfo.avatar} />

                </div>

            </div>
        );
    }

});

module.exports = SelectedUserRolePanel;