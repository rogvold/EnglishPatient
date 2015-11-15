/**
 * Created by sabir on 14.08.15.
 */
var React = require('react');
var assign = require('object-assign');

var ReactModalOverlay = React.createClass({
    getDefaultProps: function () {
        return {
            isVisible: false,
            closeLabelName: 'Закрыть [X]',
            onClose: function(){
                console.log('overlay hidden');
            }
        }
    },

    getInitialState: function () {
        return {
            isVisible: this.props.isVisible
        }
    },

    onClose: function(){
        this.props.onClose();
        this.setState({
            isVisible: false
        });
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.isVisible != this.state.isVisible){
            this.setState({
                isVisible: nextProps.isVisible
            });
        }
    },

    componentStyle: {
        overlay: {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000000000,
            backgroundColor: 'whitesmoke',
            padding: 10,
            opacity: 0.97
        },
        closePlaceholder: {
            width: '100%',
            height: 60,
            textAlign: 'right',
            fontSize: 20,
            color: 'black'
        },
        placeholder: {
            width: 851,
            margin: '0 auto',
            marginTop: 10,
            overflow: 'auto'
        }
    },

    componentDidMount: function () {

    },

    render: function () {

        return (

            <div style={assign({}, this.componentStyle.overlay, {display: (this.state.isVisible == true ? ' block ' : ' none ')}) }>
                <div style={this.componentStyle.closePlaceholder}>
                    <div className={'modalCloseButton'} style={{display: 'inline-block', cursor: 'pointer'}} onClick={this.onClose} >
                        {this.props.closeLabelName}
                    </div>
                </div>
                <div style={this.componentStyle.placeholder}>
                    {this.props.children}
                </div>
            </div>

        );

    }
});

module.exports = ReactModalOverlay;

