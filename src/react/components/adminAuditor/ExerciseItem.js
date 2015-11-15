/**
 * Created by sabir on 26.08.15.
 */

var React = require('react');
var assign = require('object-assign');


var ExerciseItem = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'no name',
            description: 'n/a',
            imgSrc: 'https://randomuser.me/api/portraits/med/men/81.jpg',
            onClick: function(){
                console.log('clicked');
            }
        }
    },

    getInitialState: function () {
        return {
            isActive: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            display: 'block',
            width: '100%',
            borderBottom: '1px solid lightgrey',
            padding: 5,
            cursor: 'pointer'
        },
        img: {
            width: 80,
            height: 80,
            borderRadius: 4,
            display: 'inline-block'
        },
        imgPlaceholder: {
            display: 'inline-block'
        },
        contentPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            paddingLeft: 5,
            maxWidth: 200
        },
        namePlaceholder: {
            display: 'block',
            fontWeight: 'bold'
        },
        descriptionPlaceholder: {
            display: 'block'
        }
    },

    onClick: function(){
        this.props.onClick();
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder} className={'adminExerciseItem ' + (this.props.isActive == true ? ' active ' : '  ') } onClick={this.onClick} >
                <div style={this.componentStyle.imgPlaceholder}>
                    <img src={this.props.imgSrc} style={this.componentStyle.img} />
                </div>
                <div style={this.componentStyle.contentPlaceholder}>
                    <div style={this.componentStyle.namePlaceholder} >
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

module.exports = ExerciseItem;