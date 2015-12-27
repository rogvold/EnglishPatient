/**
 * Created by sabir on 18.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogReplicsPanel = require('./DialogReplicsPanel');

var VimeoPlayer = require('../../player/VimeoPlayer');

var SelectRolePanel = require('./SelectRolePanel');

var DialoPreparePanel = React.createClass({
    getDefaultProps: function () {
        return {
            dialog: {

            },
            cards: [],
            onRoleSelect: function(number){

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
            width: 600,
            padding: 0,
            margin: '0 auto',
            backgroundColor: 'white'
            //border: '1px solid #EFF0F1'
        },

        topPlaceholder: {
            width: '100%'
        },

        playerPlaceholder: {
            width: '100%',
            height: 360
        },

        selectRolePlaceholder: {

        },

        taskPlaceholder: {
            padding: 10,
            fontSize: 18
        }

    },

    onRoleSelect: function(number){
        this.props.onRoleSelect(number);
    },

    render: function () {
        var dialog = this.props.dialog;
        var cards = this.props.cards;

        var task = (dialog == undefined) ? undefined : dialog.task;

        return (
            <div style={this.componentStyle.placeholder}>

                {task == undefined ? null :
                    <div style={this.componentStyle.taskPlaceholder}>
                        <div dangerouslySetInnerHTML={{__html: task}} ></div>
                    </div>
                }

                <div style={this.componentStyle.topPlaceholder}>

                    <div style={this.componentStyle.playerPlaceholder}>
                        <VimeoPlayer vimeoId={dialog.vimeoId} />
                    </div>

                </div>

                <DialogReplicsPanel
                    firstRoleName={dialog.firstRoleName}
                    secondRoleName={dialog.secondRoleName}
                    firstRoleImg={dialog.firstRoleImg}
                    secondRoleImg={dialog.secondRoleImg}
                    cards={cards} />

                <div style={this.componentStyle.selectRolePlaceholder}>

                    <div style={{textAlign: 'center', padding: 10, fontSize: 18, marginTop: 15, borderTop: '1px dotted #EFF0F1'}} >
                        Выберите роль
                    </div>

                    <SelectRolePanel
                        firstRoleName={dialog.firstRoleName}
                        secondRoleName={dialog.secondRoleName}
                        firstRoleImg={dialog.firstRoleImg}
                        secondRoleImg={dialog.secondRoleImg}
                        onSelect={this.onRoleSelect}
                        />

                </div>

            </div>
        );
    }

});

module.exports = DialoPreparePanel;