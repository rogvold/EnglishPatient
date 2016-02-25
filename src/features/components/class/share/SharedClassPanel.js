/**
 * Created by sabir on 02.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var TopBrandContainer = require('../../containers/TopBrandContainer');

var ClassMixin = require('../../../mixins/ClassMixin');

var SelfLoadingClassFeed = require('../../feed/SelfLoadingClassFeed');

var SelfInitHeader = require('../../../components/header/SelfInitHeader');

var SharedClassPanel = React.createClass({
    getDefaultProps: function () {
        return {
            classId: undefined,
            user: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            patientClass: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        var classId = this.props.classId;
        this.loadClass(classId, function(data){
            console.log('class loaded: ', data);
        }.bind(this));
    },

    componentStyle: {
        placeholder: {

        },

        feedPlaceholder: {
            //backgroundColor: 'white',
            //border: '1px solid #EFF0F1',
            width: 655,
            margin: '0 auto',
            marginTop: 10,
            borderRadius: 4
        },

        descriptionPlaceholder: {
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            padding: 10,
            width: 650,
            margin: '0 auto',
            marginTop: 10
        }
    },

    loadClass: function(classId, callback){
        if (classId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        ClassMixin.loadClass(classId, function(patientClass){
            this.setState({
                patientClass: patientClass,
                loading: false
            });
            callback(patientClass);
        }.bind(this));

    },

    render: function () {
        var patientClass = this.state.patientClass;
        var user = (this.props.user == undefined || this.props.user.id == undefined) ? undefined : this.props.user;

        return (
            <div style={this.componentStyle.placeholder}>

                {patientClass == undefined ? null :
                    <div>
                        <SelfInitHeader />

                        <TopBrandContainer
                            backgroundImg={patientClass.avatar}
                            mainText={patientClass.name} bottomText={patientClass.description} />

                        <div style={this.componentStyle.descriptionPlaceholder}>
                            <div dangerouslySetInnerHTML={{__html: patientClass.extendedDescription}} ></div>
                        </div>

                        {user == undefined ?

                            <div>
                                <div style={this.componentStyle.feedPlaceholder}>
                                    <SelfLoadingClassFeed
                                        teacherMode={false}
                                        classId={this.props.classId} />
                                </div>

                            </div>
                            :
                            <div style={this.componentStyle.feedPlaceholder}>
                                <SelfLoadingClassFeed
                                    teacherMode={false}
                                    classId={this.props.classId} userId={user.id} />
                            </div>
                        }

                    </div>
                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SharedClassPanel;