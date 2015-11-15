/**
 * Created by sabir on 01.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var PatientPreloader = React.createClass({
    getDefaultProps: function () {
        return {
            loadingText: 'Загрузка...',
            isVisible: false
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
            position: 'fixed',
            zIndex: 100000000,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'whitesmoke',
            textAlign: 'center',
            paddingTop: 300,
            fontSize: 30,
            opacity: 0.9
        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder);
        if (this.props.isVisible == false){
            st = assign({}, st, {display: 'none'});
        }

        return (
            <div style={st}>
                <i className={'ui spinner icon'}></i>
                {this.props.loadingText}
            </div>
        );
    }

});

module.exports = PatientPreloader;