/**
 * Created by sabir on 18.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogCard = require('../card/DialogCard');

var SelectRolePanel = React.createClass({
    getDefaultProps: function () {
        return {
            firstRoleImg: undefined,
            secondRoleImg: undefined,

            firstRoleName: undefined,
            secondRoleName: undefined,

            //0 or 1
            onSelect: function(number){
                console.log(number);
            }
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

        },

        avatarPlaceholder: {
            height: 150,
            width: 230,
            marginBottom: 5
        },

        avasBlock: {
            textAlign: 'center',
            width: 390,
            margin: '0 auto'
        },

        avaPlaceholder: {
            margin: 7,
            marginTop: 0,
            width: 180,
            textAlign: 'center',
            display: 'inline-block'

        },

        roleAva: {
            width: 120,
            height: 120,
            cursor: 'pointer',
            margin: '0 auto',
            marginBottom: 5
        },

        roleAvaStyle: {
            borderRadius: 200,
            border: '3px solid #EFF0F1'
        },

        namePlaceholder: {
            fontSize: 16,
            fontWeight: 'bold'
        }
    },

    onClick: function(number){
        this.props.onSelect(number);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder} className={'selectRolePanel'} >

                <div style={this.componentStyle.avasBlock}>

                    <div style={this.componentStyle.avaPlaceholder}  onClick={this.onClick.bind(this, 0)}  >

                        <div style={this.componentStyle.roleAva} className={'roleAva'} >
                            <DialogCard style={this.componentStyle.roleAvaStyle}
                                        opacity={0.3}
                                        avatar={this.props.firstRoleImg} />
                        </div>

                        <div style={this.componentStyle.namePlaceholder}>
                            {this.props.firstRoleName}
                        </div>



                    </div>

                    <div style={this.componentStyle.avaPlaceholder} onClick={this.onClick.bind(this, 1)}  >
                        <div style={this.componentStyle.roleAva} className={'roleAva'} >
                            <DialogCard style={this.componentStyle.roleAvaStyle}
                                        opacity={0.3}
                                        avatar={this.props.secondRoleImg} />
                        </div>
                        <div style={this.componentStyle.namePlaceholder}>
                            {this.props.secondRoleName}
                        </div>
                    </div>

                </div>

            </div>
        );
    }

});

module.exports = SelectRolePanel;