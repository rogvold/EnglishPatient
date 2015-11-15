/**
 * Created by sabir on 13.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var UpdateTopicDialog = require('./dialog/UpdateTopicDialog');

var AddTopicButton = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            onTopicCreated: function(topic){

            }
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
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
            backgroundImage: 'url("http://app.englishpatient.org/assets/img/newTopic.jpg")',
            display: 'inline-block',
            width: 160,
            height: 160,
            cursor: 'pointer',
            color: 'white',
            textAlign: 'center',
            borderRadius: 3,
            lineHeight: '24px',
            paddingTop: 30
        },

        namePlaceholder: {

        }
    },

    onAddClick: function(){
        this.setState({
            dialogVisible: true
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    onTopicCreated: function(topic){
        console.log('topic created: ', topic);
        this.setState({
            dialogVisible: false
        });
        this.props.onTopicCreated(topic);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.buttonPlaceholder} onClick={this.onAddClick} >
                    <div style={this.componentStyle.namePlaceholder}>
                        <div style={{fontSize: 30}}>
                            <i className={'plus icon'} ></i>
                        </div>

                        <div style={{fontSize: 24}}>
                            Добавить топик
                        </div>

                    </div>
                </div>


                {this.state.dialogVisible == false ? null :
                    <div>

                        <UpdateTopicDialog
                            onClose={this.onClose}
                            teacherId={this.props.teacherId}
                            onTopicCreated={this.onTopicCreated}
                            />

                    </div>
                }

            </div>
        );
    }

});

module.exports = AddTopicButton;