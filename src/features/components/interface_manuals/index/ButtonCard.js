/**
 * Created by sabir on 14.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var ButtonCard = React.createClass({
    getDefaultProps: function () {
        return {
            image: undefined,
            name: 'Создать упражнение',
            icon: 'icon plus'
        }
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 270,
            height: 180,
            backgroundColor: 'white',
            padding: 15,
            paddingBottom: 25,
            borderRadius: 2,
            cursor: 'pointer',
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            display: 'inline-block'
        },

        topBlock: {
            textAlign: 'center'
        },

        imagePlaceholder: {
            display: 'inline-block',
            width: 110,
            height: 110,
            //borderRadius: 1000,
            marginBottom: 5
        },

        firstLine: {
            //fontWeight: 'bold',
            fontSize: 18,
            color: '#2E3C54',
            textAlign: 'center',
            marginBottom: 5
        },

        secondLine: {
            textAlign: 'center',
            marginBottom: 5,
            fontSize: 14,
            opacity: 0.6
        }

    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder} className={'patientAirCard patientHoverBorderCard'} >

                <div style={this.componentStyle.topBlock}>

                    <div style={this.componentStyle.imagePlaceholder}>
                        <BackgroundImageContainer image={this.props.image} />
                    </div>


                    {this.props.name == undefined ? null :
                        <div style={this.componentStyle.firstLine}>

                            {this.props.icon == undefined ? null :
                                <i className={this.props.icon} ></i>
                            }
                            {this.props.name}
                        </div>
                    }


                </div>

            </div>
        );
    }

});

module.exports = ButtonCard;