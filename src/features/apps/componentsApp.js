/**
 * Created by sabir on 17.09.15.
 */
var React = require('react');

var ExerciseMixin = require('../mixins/ExerciseMixin');

var SelfInitHeader = require('../components/header/SelfInitHeader');

var SelfLoadingUserExercise = require('../components/exercise/SelfLoadingUserExercise');
var SelfLoadingCurrentUserExercise = require('../components/exercise/SelfLoadingCurrentUserExercise');

var ListOfSelfLoadingCurrentUserExercises = require('../components/exercise/ListOfSelfLoadingCurrentUserExercises');
var AuthButton = require('../components/user/AuthButton');

var SelfLoadingExercisesTabs = require('../components/tabs/SelfLoadingExercisesTabs');

var HidableText = require('../components/text/HidableText');

var SelfLoadingTeacherStudentsList = require('../components/teacher/SelfLoadingTeacherStudentsList');

var TeacherExercisesCheckingDashboard = require('../components/teacher/TeacherExercisesCheckingDashboard');

var LeftSidebarTemplate = require('../components/templates/LeftSidebarTemplate');
var HeaderTemplate = require('../components/templates/HeaderTemplate');

var CurrentUserMenuItem = require('../components/templates/CurrentUserMenuItem');

var TopbarSettingsMenu = require('../components/templates/TopbarSettingsMenu');
var HeaderLeftLinks = require('../components/templates/HeaderLeftLinks');

var DialogClickableArea = require('../components/dialog/DialogClickableArea');




var ComponentsApp = React.createClass({
    getDefaultProps: function () {
        return {

            exerciseId: '9enp2r58C4',

            userId: 'akkOJiYay9'

        }
    },

    getInitialState: function () {
        return {
            vimeoId: '140168203',
            exercise: undefined,
            cards: [],
            passedNumbers: [],
            exercisesIdsList: ['9enp2r58C4', 'n8aBTVBanf', 'icVBW4Fn5H',
                'DOyezBffE7', 'oEHA5TUmFd',
                'U1q2dNgOug', 'I4tijMOkJY',
                'J81bqbA0tB', 'p6JxV5khgm',
                'Qwk69jOK3H', 'Fr6FTFivY0',
                'IkYr6PcCy2', 'T5dyY2zNo4']
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        //ExerciseMixin.loadAllExercises(function(list){
        //    var arr = list.map(function(ex){return ex.id});
        //    console.log('loaded all exercises: ', list);
        //    this.setState({
        //        exercisesIdsList: arr
        //    });
        //}.bind(this));
    },

    componentStyle: {
        placeholder: {

        },

        userInputPlaceholder: {
            border: '1px solid whitesmoke',
            padding: 5,
            marginTop: 5
        },

        contentTypesPlaceholder: {
            border: '1px solid whitesmoke',
            padding: 5,
            marginTop: 5
        },

        contentPlaceholder: {
            display: 'block',
            margin: '0 auto',
            width: 1000
        }
    },

    onNumberClick: function(n){
        console.log(n);
    },

    getHeader: function(){
        var rightBlock = <CurrentUserMenuItem />;
        var leftBlock = <HeaderLeftLinks />;
        return (
            <HeaderTemplate leftBlock={leftBlock} rightBlock={rightBlock} />
        );
    },

    getContent: function(){
        return (
            <DialogClickableArea >
                sabir
            </DialogClickableArea>
        );
    },

    getFooter: function(){
        return undefined;
    },

    render: function () {
        var header = this.getHeader();
        var content = this.getContent();
        var footer = this.getFooter();

        return (
            <div style={this.componentStyle.placeholder}>

                <LeftSidebarTemplate footer={footer} content={content} header={header} />

            </div>
        );
    }

});

React.render(
    <ComponentsApp />,
    document.getElementById('main')
);

