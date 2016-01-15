/**
 * Created by sabir on 14.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var ButtonCard = require('../index/ButtonCard');

var CreateClassAreaWrapper = require('./CreateClassAreaWrapper');

var CreateClassCardButton = React.createClass({
    getDefaultProps: function () {
        return {

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
            display: 'inline-block'
        }
    },


    render: function () {

        return (
            <div style={this.componentStyle.placeholder}  >
                <CreateClassAreaWrapper>
                    <ButtonCard name={'Создать класс'}
                                image={'http://www.englishpatient.org/app/assets/images/smile_pc2.png'} />
                </CreateClassAreaWrapper>

            </div>
        );
    }

});

module.exports = CreateClassCardButton;