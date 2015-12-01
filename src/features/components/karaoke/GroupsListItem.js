/**
 * Created by sabir on 01.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var GroupsListItem = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            avatar: undefined,
            style: {

            },

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
            padding: 10,
            cursor: 'pointer',
            borderRadius: 5,
            textAlign: 'center',
            verticalAlign: 'top',
            display: 'inline-block',
            border: '1px solid #EFF0F1',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            width: 160,
            height: 160,
            margin: 5,
            paddingTop: 70
        },

        namePlaceholder: {
            color: 'white',
            fontSize: 20,
            padding: 5,
            background: 'background:rgba(255,255,255,0.5)'
        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.style , {backgroundImage: 'url(\'' + this.props.avatar + '\')'});
        return (
            <div style={st} onClick={this.props.onItemClick} >
                <div style={this.componentStyle.namePlaceholder}>
                    {this.props.name}
                </div>
            </div>
        );
    }

});

module.exports = GroupsListItem;