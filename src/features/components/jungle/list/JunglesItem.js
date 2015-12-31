/**
 * Created by sabir on 28.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var JunglesItem = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            description: undefined,
            avatar: 'http://www.unoosa.org/res/timeline/index_html/space-2.jpg',
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
            width: 820,
            padding: 4,
            cursor: 'pointer',
            backgroundColor: 'white',
            borderRadius: 4,
            border: '1px solid #EFF0F1'
        },

        avatarPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 130,
            padding: 5
        },

        avatar: {
            width: 120,
            height: 120,
            borderRadius: 4,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
        },

        content: {
            width: 680,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        namePlaceholder: {
            fontSize: 18,
            fontWeignt: 'bold'
        },

        descriptionPlaceholder: {
            fontSize: 14
        }


    },

    render: function () {
        var avatarStyle = assign({}, this.componentStyle.avatar, {backgroundImage: 'url(\'' + this.props.avatar + '\')'});

        return (
            <div style={this.componentStyle.placeholder} onClick={this.props.onItemClick} >

                <div style={this.componentStyle.avatarPlaceholder}>
                    <div style={this.componentStyle.avatar}></div>
                </div>

                <div style={this.componentStyle.content}>

                    <div style={this.componentStyle.namePlaceholder}>
                        {this.props.name}
                    </div>

                    <div style={this.componentStyle.descriptionPlaceholder}>
                        {this.props.description}
                    </div>

                </div>

            </div>
        );
    }

});

module.exports = JunglesItem;