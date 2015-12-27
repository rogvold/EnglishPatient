/**
 * Created by sabir on 18.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogOneReplicPanel = require('./DialogOneReplicPanel');

var DialogReplicsPanel = React.createClass({
    getDefaultProps: function () {
        return {
            firstRoleImg: undefined,
            firstRoleName: undefined,

            secondRoleName: undefined,
            secondRoleImg: undefined,

            cards: []
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
            width: 560,
            backgroundColor: 'white',
            margin: '0 auto'
        }
    },

    render: function () {
        var list = this.props.cards;

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(c, k){
                    var key = 'card_' + c.id + '_' + k;
                    var avatar = (k % 2 == 0) ? this.props.firstRoleImg : this.props.secondRoleImg;
                    var name = (k % 2 == 0) ? this.props.firstRoleName : this.props.secondRoleName;
                    var text = c.text;
                    var orientation = (k % 2 == 0) ? 'left' : 'right';
                    return(
                        <div key={key} style={{marginTop: 10}} >
                            <DialogOneReplicPanel orientation={orientation}  avatar={avatar} name={name} text={text} />
                        </div>
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = DialogReplicsPanel;