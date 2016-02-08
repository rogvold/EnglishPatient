/**
 * Created by sabir on 07.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var LeftSidebarClassesList = require('./LeftSidebarClassesList');

var AddNewClassButton = require('../buttons/AddNewClassButton');

var LoginMixin = require('../../../mixins/LoginMixin');

var TeacherClassesList = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ClassesStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var store = this.getFlux().store('ClassesStore');
        var classes = store.getClasses();
        return {
            loading: store.loading,
            classes: classes
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

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

    onClassCreated: function(cl){

    },

    render: function(){
        var items = this.state.classes.map(function(cl){
            return {
                name: cl.name,
                status: cl.status,
                classId: cl.id
            }
        });
        var teacherId = LoginMixin.getCurrentUserId();

        return (
            <div style={this.componentStyle.placeholder} >


                <div style={this.componentStyle.headerPlaceholder} >
                    Мои классы

                    {this.props.addClassMode == false ? null :
                        <div style={this.componentStyle.addClassPlaceholder}>
                            <AddNewClassButton teacherId={teacherId}
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
                    <div style={this.componentStyle.preloaderPlaceholder} >
                        <i className={'icon spinner'} ></i> загрузка классов...
                    </div>
                }

            </div>
        );
    }

});

module.exports = TeacherClassesList;