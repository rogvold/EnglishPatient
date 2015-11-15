/**
 * Created by sabir on 04.11.15.
 */

var React = require('react');

var ParseMixin = require('../../../../react/mixins/commonMixins/ParseMixin');
var CommonMixin = require('../../../../react/mixins/commonMixins/CommonMixin');

var ClassMixin = require('../../../mixins/ClassMixin');

var LeftSidebarClassesList = require('./LeftSidebarClassesList');

var AddNewClassButton = require('../../class/buttons/AddNewClassButton');

var AddClassPlusButton = require('../../class/buttons/student/AddClassPlusButton');

var StudentSelfLoadingLeftSidebarClassesList = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            selectedClassId: undefined,
            beforeLoading: function(){
                console.log('SelfLoadingLeftSidebarClassesList: beforeLoading');
            },

            afterLoading: function(){
                console.log('SelfLoadingLeftSidebarClassesList: afterLoading');
            },

            addClassMode: false
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            classes: [],
            selectedClassId: this.props.selectedClassId
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var selectedClassId = nextProps.selectedClassId;
        this.setState({
            selectedClassId: selectedClassId
        });
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

        preloaderPlaceholder: {
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
        ClassMixin.loadUserClasses(this.props.userId, function(classes){
            this.setState({
                loading: false,
                classes: classes
            });
            this.props.afterLoading();
            callback();
        }.bind(this));

    },


    render: function () {
        var items = this.state.classes.map(function(cl){
            return {
                name: cl.name,
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
                            <AddClassPlusButton userId={this.props.userId} />
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
                    <div style={this.componentStyle.preloaderPlaceholder} >
                        <i className={'icon spinner'} ></i> загрузка классов...
                    </div>
                }



            </div>
        );
    }

});

module.exports = StudentSelfLoadingLeftSidebarClassesList;