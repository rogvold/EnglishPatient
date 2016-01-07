/**
 * Created by sabir on 06.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var DialogCard = require('../dialog_exercise/card/DialogCard');

var ArticleItem = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            avatar: undefined,

            onClick: function(){

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
            display: 'inline-block'
        },

        cardPlaceholder: {
            width: 200,
            height: 140
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.cardPlaceholder}>
                    <DialogCard
                        name={this.props.name}
                        avatar={this.props.avatar}
                        style={{width: '100%', height: '100%'}}
                        />
                </div>



            </div>
        );
    }

});

module.exports = ArticleItem;