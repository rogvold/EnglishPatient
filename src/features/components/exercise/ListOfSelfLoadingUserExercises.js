/**
 * Created by sabir on 06.10.15.
 */
var React = require('react');

var SelfLoadingUserExercise = require('./SelfLoadingUserExercise');
var CommonMixin = require('../../../react/mixins/commonMixins/CommonMixin');

var ListOfSelfLoadingUserExercises = React.createClass({
    getDefaultProps: function () {
        return {
            exercisesIdsList: [],
            userId: undefined,
            teacherId: undefined,
            teacherMode: false,
            pageSize: 3
        }
    },

    getInitialState: function () {
        return {
            currentIndex: 0,
            visibleExercisesIdsList: []
        }
    },



    componentWillReceiveProps: function (nextProps) {
        var newList = nextProps.exercisesIdsList;
        var oldList = this.props.exercisesIdsList;
        if (CommonMixin.arraysAreEqual(newList, oldList) == false){
            this.setState({
                visibleExercisesIdsList: newList.slice(0, this.props.pageSize)
            });
        }
    },

    componentDidMount: function () {
        var list = this.props.exercisesIdsList;
        var pageSize = this.props.pageSize;
        this.setState({
            visibleExercisesIdsList: list.slice(0, pageSize)
        });
    },

    componentStyle: {
        placeholder: {

        },
        loadMorePlaceholder: {
            marginTop: 5,
            paddingTop: 5,
            textAlign: 'center'
        }
    },

    loadMoreClick: function(){
        var len1 = this.state.visibleExercisesIdsList.length;
        this.setState({
                visibleExercisesIdsList: this.props.exercisesIdsList.slice(0, len1 + this.props.pageSize)
        });
    },

    render: function () {
        var list = this.state.visibleExercisesIdsList;
        var loadMoreVisible = (this.state.visibleExercisesIdsList.length < this.props.exercisesIdsList.length);

        return (
            <div style={this.componentStyle.placeholder}>
                {this.props.userId == undefined ? null :
                    <div>
                        <div>
                            {list.map(function(exId){
                                var key = 'self_' + exId + '_' + this.props.userId;
                                return (
                                    <SelfLoadingUserExercise teacherId={this.props.teacherId}
                                                             teacherMode={this.props.teacherMode}
                                                             userId={this.props.userId} key={key}
                                                             exerciseId={exId} />
                                );
                            }, this)}
                        </div>
                        <div>
                            {loadMoreVisible == false ? null :
                                <div style={this.componentStyle.loadMorePlaceholder}>
                                    <button className={'ui blue button'} onClick={this.loadMoreClick} >
                                        <i className={' ui angle double down icon'} ></i>
                                        <span>load more</span>
                                    </button>
                                </div>
                            }
                        </div>


                    </div>
                }
            </div>
        );
    }

});


module.exports = ListOfSelfLoadingUserExercises;