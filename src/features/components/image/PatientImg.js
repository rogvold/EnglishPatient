/**
 * Created by sabir on 27.09.15.
 */
var React = require('react');
var assign = require('object-assign');
var Image = require('legit-image');

var PatientImg = React.createClass({
    getDefaultProps: function () {
        return {
            url: 'http://image.vsco.co/1/51cfb5232d9859046/5560560b0c561519328b4586/600x800/vsco_052315.jpg',
            height: 400
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
            textAlign: 'center',
            width: '100%',
            height: '100%'
        },
        imgStyle: {
            maxWidth: '100%'
        }
    },

    render: function () {
        var height = this.props.height;
        var style = assign({}, this.componentStyle.imgStyle, {height: height});

        return (
            <div style={this.componentStyle.placeholder}>
                <Image src={this.props.url} style={style} />
            </div>
        );
    }

});


module.exports = PatientImg;

