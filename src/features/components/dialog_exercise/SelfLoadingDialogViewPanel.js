/**
 * Created by sabir on 19.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogViewPanel = require('./DialogViewPanel');

var DialogMixin = require('../../mixins/DialogMixin');

var SelfLoadingDialogViewPanel = React.createClass({
    getDefaultProps: function () {
        return {
            dialogId: undefined,
            userId: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            dialog: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {

        }
    },

    load: function(){
        var dialogId = this.props.dialogId;
        this.setState({
            loading: true
        });
        DialogMixin.loadDialog(dialogId, function(dialog){
            this.setState({
                loading: false,
                dialog: dialog
            });
        }.bind(this));
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                {this.state.dialog == undefined ? null :
                    <DialogViewPanel userId={this.props.userId} dialog={this.state.dialog} />
                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate loader"></div>
                </div>

            </div>

        );
    }

});

module.exports = SelfLoadingDialogViewPanel;