/**
 * Created by sabir on 11.10.15.
 */
var React = require('react');

var ParseMixin = require('../../../../react/mixins/commonMixins/ParseMixin');
var CommonMixin = require('../../../../react/mixins/commonMixins/CommonMixin');


var ClassMixin = require('../../../mixins/ClassMixin');


var LeftSidebarClassesList = require('./LeftSidebarClassesList');

var AddNewClassButton = require('../../class/buttons/AddNewClassButton');



var SelfLoadingLeftSidebarClassesList = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            selectedClassId: undefined,
            beforeLoading: function(){
                console.log('SelfLoadingLeftSidebarClassesList: beforeLoading');
            },

            afterLoading: function(){
                console.log('SelfLoadingLeftSidebarClassesList: afterLoading');
            },

            onClassCreated: function(cl){

            },

            addClassMode: false
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            classes: [],
            selectedClassId: this.props.selectedClassId,
            lastUpdated: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var selectedClassId = nextProps.selectedClassId;
        var lastUpdated = nextProps.lastUpdated;
        //if (selectedClassId != this.props.selectedClassId){
        //    return;
        //} // !
        this.setState({
            selectedClassId: selectedClassId
        });
        if (lastUpdated != undefined && lastUpdated != this.props.lastUpdated){
            this.reloadClassesList(function(classes){

            });
        }

    },

    reloadClassesList: function(callback){
        this.setState({
            loading: true
        });
        ClassMixin.loadTeacherClasses(this.props.teacherId, function(classes){
            this.setState({
                loading: false,
                classes: classes
            });
            if (callback != undefined){
                callback(classes);
            }
        }.bind(this));
    },

    setSelectedClassId: function(selectedClassId, callback){
        console.log('setSelectedClassId occured: selectedClassId = ', selectedClassId);
        var f = false;
        var list = this.state.classes;
        for (var i in list){
            var cl = list[i];
            if (cl.id == selectedClassId){
                f = true;
                break;
            }
        }
        console.log('f = ', f);
        if (f == true){
            //this.setState({
            //    selectedClassId: selectedClassId
            //});
            //history.pushState(null, null,  '/#/class/' + selectedClassId)
            return;
        }
        this.setState({
            loading: true
        });
        ClassMixin.loadTeacherClasses(this.props.teacherId, function(classes){
            this.setState({
                loading: false,
                classes: classes
                //selectedClassId: selectedClassId
            });
            console.log('classes loaded: ', classes);
            //history.pushState(null, null,  '/#/class/' + selectedClassId)
            if (callback != undefined){
                callback();
            }
        }.bind(this));
    },


    componentDidMount: function () {
        ParseMixin.initParse();
        this.load(function(){
            console.log('classes loaded');
        });
    },

    componentStyle: {
        placeholder: {
            marginBottom: 10
        },

        preloaderPlacegholder: {
            width: '100%',
            height: '26px',
            padding: 10,
            paddingLeft: '10px',
            fontSize: '14px',
            lineHeight: '16px',
            color: '#8897A3'
        },

        listPlaceholder: {
            width: '100%'
        },

        headerPlaceholder: {
            color: '#B3BCC4',
            fontSize: '14px',
            //paddingLeft: 10,
            marginLeft: 10,
            marginRight: 10,
            position: 'relative',
            borderBottom: '1px solid rgba(103, 109, 118, 0.18)',
            paddingBottom: 5
        },

        addClassPlaceholder: {
            position: 'absolute',
            right: 0,
            top: 0
        }
    },

    load: function(callback){
        this.props.beforeLoading();
        this.setState({
            loading: true
        });
        ClassMixin.loadTeacherClasses(this.props.teacherId, function(classes){
            this.setState({
                loading: false,
                classes: classes
            });
            this.props.afterLoading();
            callback();
        }.bind(this));

    },

    onClassCreated: function(cl){
        var selectedClassId = cl.id;
        this.reloadClassesList(function(){
            this.props.onClassCreated(cl);
            CommonMixin.forceTransitionTo('/#/class/' + cl.id);
        }.bind(this));
    },

    onClassUpdated: function(cl){
        var list = this.state.classes;
        for (var i in list){
            if (list[i].id == cl.id){
                list[i] = cl;
            }
        }
        this.setState({
            classes: cl
        });
    },


    render: function () {
        var items = this.state.classes.map(function(cl){
            return {
                name: cl.name,
                status: cl.status,
                classId: cl.id
            }
        });

        console.log('!!! selectedClassId = ', this.props.selectedClassId);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.headerPlaceholder} >
                    Мои классы

                    {this.props.addClassMode == false ? null :
                        <div style={this.componentStyle.addClassPlaceholder}>
                            <AddNewClassButton teacherId={this.props.teacherId}
                                               onClassCreated={this.onClassCreated}
                                />
                        </div>
                    }

                </div>

                {this.state.loading == true ? null :
                    <div style={this.componentStyle.listPlaceholder} >
                        <LeftSidebarClassesList
                            selectedClassId={this.state.selectedClassId}
                                                items={items} />
                    </div>
                }

                {this.state.loading == false ? null :
                    <div style={this.componentStyle.preloaderPlacegholder} >
                        <i className={'icon spinner'} ></i> загрузка классов...
                    </div>
                }



            </div>
        );
    }

});

module.exports = SelfLoadingLeftSidebarClassesList;