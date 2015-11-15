/**
 * Created by sabir on 05.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var SausageCard = React.createClass({
    getDefaultProps: function () {
        return {}
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
            display: 'inline-block',
            cursor: 'pointer',
            marginRight: 5,
            height: 140,
            width: 210,
            border: '1px solid #EFF0F1',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            borderRadius: '8px',
            fontSize: '16px'
        },


        overlay: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            opacity: 0.7,
            backgroundColor: '#2E3C54',
            borderRadius: '8px'
        },

        overlayPanel: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            padding: 5,
            borderRadius: '8px'
        },

        namePlaceholder: {
            position: 'absolute',
            bottom: 5,
            left: 5,
            color: 'white',
            maxWidth: '98%'
        },
    },

    onPanelClick: function(){
        this.showDialog();
    },

    showDialog: function(){
        this.setState({
            dialogVisible: true
        });
    },

    hideDialog: function(){
        this.setState({
            dialogVisible: false
        });
    },

    render: function () {

        var st = assign({}, this.componentStyle.placeholder,  {backgroundImage: 'url(\'' + this.props.avatar + '\')'}, this.props.style);

        var name = (this.props.name == undefined) ? '' : this.props.name;
        var addS = (name.length > 90) ? ' ...' : '';
        name = name.substr(0, 90) + addS;


        return (
            <div style={st} >

                <div style={this.componentStyle.overlay} ></div>

                <div style={this.componentStyle.overlayPanel} onClick={this.onPanelClick} >
                    <div style={this.componentStyle.namePlaceholder}>
                        {name}
                    </div>
                </div>

            </div>
        );
    }

});

module.exports = SausageCard;