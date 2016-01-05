/**
 * Created by sabir on 31.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogCard = require('../dialog_exercise/card/DialogCard');

var TestimonialCard = React.createClass({
    getDefaultProps: function () {
        return {
            avatar: undefined,
            name: undefined,
            content: undefined,
            businessTitle: undefined,

            visibleLength: 600

        }
    },

    getInitialState: function () {
        return {
            fullMode: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },



    componentStyle: {
        placeholder: {
            display: 'block',
            with: 800
        },

        left: {
            width: 300,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        right: {
            width: 495,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        contentPlaceholder: {
            fontSize: 18,
            lineHeight: '24px'
        },

        avatarPlaceholder: {
            width: 250,
            margin: '0 auto',
            height: 250
        },

        namePlaceholder: {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18,
            marginTop: 15,
        },

        businessTitlePlaceholder: {
            textAlign: 'center',
            opacity: 0.5,
            textAlign: 'center',
            width: 240,
            fontSize: 16,
            padding: 10,
            paddingTop: 5,
            margin: '0 auto'
        },

        readMorePlaceholder: {

        },

        showMore: {
            display: 'inline-block',
            borderBottom: '1px solid #EFF0F1',
            opacity: 0.6,
            fontSize: 18,
            cursor: 'pointer',
            marginTop: 20
        }
    },

    makeFullMode: function(){
        this.setState({
            fullMode: true
        });
    },

    getContent: function(){
        var text = (this.props.content == undefined) ? '' : this.props.content;
        if (this.state.fullMode == false){
            var n = this.props.visibleLength;
            if (text.length > n){
                text = text.slice(0, n) + ' ...';
            }
        }
        text = text.replace(/\n/g, '<br/>&#9;');
        return text;
    },

    readMoreVisible: function(){
        var text = (this.props.content == undefined) ? '' : this.props.content;
        if (text.length < this.props.visibleLength){
            return false
        }
        return !this.state.fullMode;
    },

    showMore: function(){
        this.setState({
            fullMode: true
        });
    },

    render: function () {
        var readMoreVisible = this.readMoreVisible();
        var content = this.getContent();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.left}>

                    <div style={this.componentStyle.avatarPlaceholder}>
                        <DialogCard width={'100%'} height={'100%'} opacity={0.1}
                            avatar={this.props.avatar} mode={'round'} />
                    </div>

                    <div style={this.componentStyle.namePlaceholder}>
                        {this.props.name}
                    </div>

                    <div style={this.componentStyle.businessTitlePlaceholder}>
                        {this.props.businessTitle}
                    </div>

                </div>

                <div style={this.componentStyle.right}>

                    <div style={this.componentStyle.contentPlaceholder}>
                        <div style={{marginBottom: 15, opacity: 0.9}} >
                            <b>{this.props.name}</b> об онлайн-платформе "Английский пациент"
                        </div>
                        <div dangerouslySetInnerHTML={{__html: content}}>

                        </div>
                    </div>


                    {readMoreVisible == false ? null :
                        <div style={this.componentStyle.readMorePlaceholder}>
                            <div style={this.componentStyle.showMore} onClick={this.showMore} >
                                Читать дальше
                            </div>
                        </div>
                    }

                </div>

            </div>
        );
    }

});

module.exports = TestimonialCard;