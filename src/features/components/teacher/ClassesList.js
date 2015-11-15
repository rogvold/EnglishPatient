/**
 * Created by sabir on 06.10.15.
 */
var React = require('react');
var ClassListItem = require('./ClassListItem');

var ClassesList = React.createClass({
    getDefaultProps: function () {
        return {
            classes: [],
            onItemClick: function(classId){

            },
            selectedClassId: undefined
        }
    },

    getInitialState: function () {
        return {
            selectedClassId: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var clId = nextProps.classId;
        if (clId != this.props.selectedClassId){
            this.setState({
                selectedClassId: clId
            });
        }
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 240
        }
    },

    onItemClick: function(classId){
        console.log('ClassesList: onItemClick occured: classId = ' + classId);
        this.props.onItemClick(classId);
        this.setState({
            selectedClassId: classId
        });
    },

    render: function () {
        var list = this.props.classes;
        return (
            <div style={this.componentStyle.placeholder} className={'ui middle aligned divided list'} >
                {list.map(function(cl, k){
                    var key = 'class_item_' + cl.id;
                    var name = cl.name;
                    var code = cl.code;
                    var boundClick = this.onItemClick.bind(this, cl.id);
                    var selected = (this.state.selectedClassId != undefined && this.state.selectedClassId == cl.id);
                    return (
                        <ClassListItem isSelected={selected} key={key} onClick={boundClick} classId={cl.id} code={code} name={name} />
                    );

                }, this)}
            </div>
        );
    }

});

module.exports = ClassesList;