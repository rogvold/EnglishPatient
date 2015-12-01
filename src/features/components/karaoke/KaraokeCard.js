/**
 * Created by sabir on 01.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var KaraokeCard = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            avatar: undefined,
            materialId: undefined,

            onItemClick: function(){

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
            display: 'inline-block',
            margin: 5,
            backgroundColor: 'white'
        },

        headBlock: {
            padding: 5,
            cursor: 'pointer'
        },

        avatarPlaceholder: {
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            display: 'inline-block',
            verticalAlign: 'top',
            height: 80,
            width: 120,
            borderRadius: 4
        },

        infoPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 265,
            padding: 5
        },

        infoTitle: {
            fontWeight: 'bold'
        }
    },

    onItemClick: function(){
        this.props.onItemClick();
    },

    render: function () {
        var avatarStyle = assign({}, this.componentStyle.avatarPlaceholder, {backgroundImage: 'url(\'' + this.props.avatar + '\')'});

        return (
            <div style={this.componentStyle.placeholder} onClick={this.onItemClick} >

                <div style={this.componentStyle.headBlock}  >
                    <div style={avatarStyle}></div>
                    <div style={this.componentStyle.infoPlaceholder}>
                        <div style={this.componentStyle.infoTitle}>{this.props.name}</div>
                    </div>
                </div>

            </div>
        );
    }

});

module.exports = KaraokeCard;