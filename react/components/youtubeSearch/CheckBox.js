/**
 * Created by sabir on 20.07.15.
 */
//props:
//    -change: callback on change. change({id, value})
//    -id: id of the checkbox
//    -label: label

var CheckBox = React.createClass({displayName: "CheckBox",
    getDefaultProps: function () {
        return {
            onChange: function (event) {  },
            value: false
        };
    },
    getInitialState: function () {
        return { value: this.props.value };
    },
    render: function () {
        return (
            React.createElement("span", {className: "checkboxGroup"}, 
                    React.createElement("input", {type: "checkbox", className: "patientCheckbox", 
                           checked: this.state.value, 
                           onChange: this.onChange}), 
                    React.createElement("label", {onClick: this.onChange, htmlFor: this.props.id}, this.props.label)
                )
        );
    },
    parentCallback: function(ch){
        this.props.change(ch);
    },
    onChange: function (event){
        this.props.change({id: this.props.id, val: !this.state.value});
        this.setState({ value: !this.state.value });
    }

});