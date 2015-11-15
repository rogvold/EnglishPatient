/**
 * Created by sabir on 13.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var TopicDialog = React.createClass({
    getDefaultProps: function () {
        return {
            visible: false,
            dialogLevel: 10,

            onClose: function(){
                console.log('onClose occured');
            },

            content: null
        }
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {

        placeholder: {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: 'left'
        },

        prePlaceholder: {
            width: '100%',
            height: '100%',
            position: 'relative'
        },

        overlay: {
            position: 'absolute',
            //position: 'fixed',
            zIndex: 1,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#F6F6F7',
            //opacity: 0.98
            opacity: 1
        },

        overlayPanel: {
            position: 'absolute',
            //position: 'fixed',
            zIndex: 2,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        },

        closeBlock: {
            height: '100%',
            verticalAlign: 'top',
            width: 150,
            borderLeft: '1px solid #f0efef',
            padding: 10,
            paddingTop: 30,
            textAlign: 'center',
            display: 'inline-block'
        },

        mainBlock: {
            height: '100%',
            verticalAlign: 'top',
            overflowY: 'auto',
            width: window.innerWidth - 150,
            display: 'inline-block'
        }

        //absolutePlaceholder: {
        //
        //}

    },

    onClose: function(){
        this.props.onClose();
    },

    render: function () {
        //var overlayStyle = assign({}, this.componentStyle.overlay, {zIndex: this.props.dialogLevel});
        //var overlayPanelStyle = assign({}, this.componentStyle.overlayPanel, {zIndex: this.props.dialogLevel + 1});

        var overlayStyle = assign({}, this.componentStyle.overlay);
        var overlayPanelStyle = assign({}, this.componentStyle.overlayPanel);

        var plStyle = assign({}, this.componentStyle.placeholder, {zIndex: this.props.dialogLevel});


        return (
            <div style={plStyle}>

                <div style={this.componentStyle.prePlaceholder}>
                    <div style={overlayStyle} ></div>

                    <div style={overlayPanelStyle} >
                        <div style={this.componentStyle.mainBlock}>
                            {this.props.content}
                        </div>

                        <div style={this.componentStyle.closeBlock}>
                            <button style={{marginRight: 0}} onClick={this.onClose}
                                    className="circular ui icon inverted orange button">
                                <i className="icon remove"></i>
                            </button>
                        </div>
                    </div>
                </div>



            </div>
        );
    }

});

module.exports = TopicDialog;