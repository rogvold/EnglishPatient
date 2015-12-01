/**
 * Created by sabir on 29.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var CategoryCheckbox = require('./CategoryCheckbox');

var CategoryCheckboxesList = React.createClass({
    getDefaultProps: function () {
        return {
            checkboxes: [],
            onChange: function(newCheckboxesList){

            },
            itemStyle: {

            }
        }
    },

    getInitialState: function () {
        return {
            checkboxes: this.props.checkboxes
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var checkboxes = nextProps.checkboxes;
        if (checkboxes == undefined){
            checkboxes = [];
        }
        this.setState({
            checkboxes: checkboxes
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    onChange: function(number, status){
        console.log('ch list: onChange occured: n, st = ', number, status);
        var arr = [];
        var list = this.state.checkboxes;
        list[number].active = status;
        this.setState({
            checkboxes: list
        });
        this.props.onChange(list);
    },

    render: function () {
        var list = this.state.checkboxes;

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(c, k){
                    var key = 'youtube_checkbox_' + k;
                    var name = c.name;
                    var onChange = this.onChange.bind(this, k);
                    return (
                        <CategoryCheckbox style={this.props.itemStyle} onChange={onChange}
                                          key={key} name={name} active={c.active} />
                    );
                }, this)}

            </div>
        );
    }

});

module.exports = CategoryCheckboxesList;