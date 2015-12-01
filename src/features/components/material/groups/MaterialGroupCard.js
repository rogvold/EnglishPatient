/**
 * Created by sabir on 29.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var MaterialGroupCard = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            name: undefined,
            description: undefined,
            avatar: 'https://d13yacurqjgara.cloudfront.net/users/31348/screenshots/2376060/explorer_series_1-01.jpg',
            materials: [],
            user: []
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
            width: 250,
            height: 300,
            margin: 10
        },

        imagePlaceholder: {
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        },

        contentPlaceholder: {
            padding: 5
        }

    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.style);
        var imageSt = assign({}, this.componentStyle.imagePlaceholder,  {backgroundImage: 'url(\'' + this.props.avatar + '\')'});


        return (
            <div style={st}>


                <div style={imageSt}></div>

                <div style={this.componentStyle.contentPlaceholder}>

                    this is test

                </div>

            </div>
        );
    }

});

module.exports = MaterialGroupCard;