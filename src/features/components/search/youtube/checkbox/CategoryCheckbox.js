/**
 * Created by sabir on 29.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var CategoryCheckbox = React.createClass({
    getDefaultProps: function () {
        return {
            active: false,
            onChange: function(status){

            },

            name: undefined,

            style: {

            }
        }
    },

    getInitialState: function () {
        return {
            active: false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var active = nextProps.active;
        if (active == undefined){
            return;
        }
        this.setState({
            active: active
        });
    },

    componentDidMount: function () {
        this.setState({
            active: this.props.active
        });
    },

    onStatusChangeClick: function(){
        var newStatus = !this.state.active;
        this.setState({
            active: newStatus
        });
        this.props.onChange(newStatus);
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block',
            cursor: 'pointer'
            //margin: 5
        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.style);
        return (
            <div style={st} onClick={this.onStatusChangeClick} >
                {this.state.active == true ?
                    <span><i className={'icon checkmark box'} ></i></span>
                    :
                    <span><i className={'icon square outline'} ></i></span>
                }
                {this.props.name}
            </div>
        );
    }

});

module.exports = CategoryCheckbox;