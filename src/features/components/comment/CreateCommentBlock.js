/**
 * Created by sabir on 13.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BackgroundImageContainer = require('../image/BackgroundImageContainer');

var CreateCommentBlock = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('CommentsStore')],
    getDefaultProps: function(){
        return {
            objectId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('CommentsStore');
        return {
            loading: store.loading
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        var width = React.findDOMNode(this).offsetWidth;
        this.setState({
            width: width
        });
    },

    componentStyle: {
        placeholder: {
            padding: 5,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: '#f6f7f8',
            borderLeft: '1px solid #EFF0F1',
            borderRight: '1px solid #EFF0F1',
            borderBottom: '1px solid #EFF0F1'
        },

        inputPlaceholder: {

        },

        buttonPlaceholder: {
            paddingTop: 5
            //borderTop: '1px solid #EFF0F1'
        },

        textareaStyle: {
            minHeight: '2em',
            height: 40,
            fontSize: 12,
            padding: 3,
            borderRadius: 0,
            marginLeft: 5
        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 40
        },

        avatarPlaceholder: {
            width: 40,
            height: 40,
            margin: '0 auto'
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 300
        }

    },

    makeComment: function(){

    },

    onSubmit: function(){
        var content = this.state.content;
        if (content == undefined || content.trim() == ''){
            return;
        }
        var attachments = [];
        this.getFlux().actions.makeComment(this.props.objectId, content, attachments);
        this.setState({
            content: ''
        });
    },

    onContentChange: function(evt){
        var val = evt.target.value;
        if (val == undefined || val.trim() == ''){
            val = undefined;
        }
        this.setState({
            content: val
        });
    },

    render: function(){
        var w = this.state.width;
        var rightStyle = assign({}, this.componentStyle.right);
        if (w != undefined){
            rightStyle = assign({}, rightStyle, {width: w - this.componentStyle.left.width - 15});
        }
        var user = this.getFlux().store('UsersStore').getCurrentUser();
        var image = (user == undefined) ? undefined : user.avatar;

        return (
            <div style={this.componentStyle.placeholder} >

            <div style={this.componentStyle.left}>
                <div style={this.componentStyle.avatarPlaceholder}>
                    <BackgroundImageContainer image={image} />
                </div>
            </div>

            <div style={rightStyle}>
                <div style={this.componentStyle.inputPlaceholder}>
                    <div className={'ui form'} >
                        <textarea className={'ui transparent input'}
                                  placeholder={'Ваш комментарий'} style={this.componentStyle.textareaStyle}
                              onChange={this.onContentChange} value={this.state.content} ></textarea>
                    </div>
                </div>

                <div style={this.componentStyle.buttonPlaceholder}>
                    <button className={'ui button mini patientPrimary'}
                            style={{borderRadius: 0, marginLeft: 5}}
                            onClick={this.onSubmit} >
                        Отправить
                    </button>
                </div>
            </div>


            </div>
        );
    }

});

module.exports = CreateCommentBlock;