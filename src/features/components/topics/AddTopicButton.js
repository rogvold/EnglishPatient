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
            topicType: 'basic',
            onTopicCreated: function(topic){

            },

            buttonClassName: '',
            icon: undefined,
            buttonName: 'Добавить топик',

            style: {
                backgroundImage: 'url("http://englishpatient.org/app/assets/img/newTopic.jpg")',
                display: 'inline-block',
                width: 160,
                height: 160,
                cursor: 'pointer',
                color: 'white',
                textAlign: 'center',
                borderRadius: 3,
                lineHeight: '24px',
                paddingTop: 30
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
        var buttonsSt = assign({}, this.componentStyle.buttonPlaceholder, this.props.style);

        return (
            <div style={this.componentStyle.placeholder} className={this.props.buttonClassName}>

                <div style={buttonsSt} onClick={this.onAddClick} >
                    <div style={this.componentStyle.namePlaceholder}>
                        {this.props.icon == undefined ? null :
                            <i className={'plus icon'} ></i>
                        }

                        {this.props.buttonName}

                    </div>
                </div>


                {this.state.dialogVisible == false ? null :
                    <div>

                        <UpdateTopicDialog
                            topicType={this.props.topicType}
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