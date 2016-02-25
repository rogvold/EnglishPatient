/**
 * Created by sabir on 14.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var YouHaveNoClassesPanel = require('../classes/YouHaveNoClassesPanel');

var ButtonCard = require('./ButtonCard');

var PatientPlayer = require('../../player/PatientPlayer');

var VimeoPlayer = require('../../player/VimeoPlayer');

var CreateClassCardButton = require('../classes/CreateClassCardButton');

var CreateExerciseCardButton = require('../exercises/CreateExerciseCardButton');

var CreateCourseCardButton = require('../courses/CreateCourseCardButton');

var IndexPanel = React.createClass({
    getDefaultProps: function () {
        return {}
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
            width: 850,
            margin: '0 auto'
        },

        preVideoPlaceholder: {
            padding: 10,
            paddingTop: 0
        },

        videoPlaceholder: {
            width: '100%',
            padding: 10,
            height: 380,
            border: '1px solid #EFF0F1',
            margin: '0 auto',
            backgroundColor: 'white',
            marginTop: 5
        },

        bottomButtonsPlaceholder: {
            textAlign: 'center'
        },

        buttonCardItem: {
            margin: 5,
            display: 'inline-block',
            verticalAlign: 'top'
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={{padding: 10, paddingBottom: 5}} >
                    <YouHaveNoClassesPanel />
                </div>

                <div style={this.componentStyle.bottomButtonsPlaceholder}>

                    <div style={this.componentStyle.buttonCardItem}>
                        <CreateClassCardButton />
                    </div>

                    <div style={this.componentStyle.buttonCardItem}>
                        <CreateExerciseCardButton />
                    </div>

                    <div style={this.componentStyle.buttonCardItem}>
                        <CreateCourseCardButton />
                    </div>

                </div>

                <div style={this.componentStyle.preVideoPlaceholder}>
                    <div style={this.componentStyle.videoPlaceholder}>
                        <VimeoPlayer style={{width: '100%', height: '100%'}} vimeoId={'155704762'} />
                    </div>
                </div>

            </div>
        );
    }

});

module.exports = IndexPanel;