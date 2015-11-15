/**
 * Created by sabir on 19.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var EditBunchDialog = require('../../dialog/bunch/EditBunchDialog');

var CreateNewExerciseGroupButton = React.createClass({
    getDefaultProps: function () {
        return {
            buttonClassName: 'ui basic grey button',
            teacherId: undefined,
            addGroupButtonName: 'Новая категория',
            onGroupCreate: function(){

            },
            style: {

            }
        }
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
            display: 'inline-block'
        },

        buttonPlaceholder: {

        },

        addGroupButtonName: {

        }
    },

    onShowButtonClick: function(){
        this.setState({
            dialogVisible: true
        });
    },

    onModalClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    onGroupUpdate: function(g){
        this.setState({
            dialogVisible: false
        });
        this.props.onGroupCreate();
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.style);

        return (
            <div style={st}>

                <div style={this.componentStyle.buttonPlaceholder}>
                    <button className={this.props.buttonClassName} onClick={this.onShowButtonClick} >
                        <i className={'plus icon'} ></i> {this.props.addGroupButtonName}
                    </button>
                </div>


                <EditBunchDialog teacherId={this.props.teacherId} onGroupUpdate={this.onGroupUpdate}
                                 visible={this.state.dialogVisible} onClose={this.onModalClose} />

            </div>
        );
    }

});

module.exports = CreateNewExerciseGroupButton;