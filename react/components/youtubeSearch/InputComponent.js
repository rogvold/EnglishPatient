/**
 * Created by sabir on 20.07.15.
 */
//text: text
//change: func (text)

var InputComponent = React.createClass({displayName: "InputComponent",
    getDefaultProps: function(){
        return {
            text: '',
            enabled: true
        }
    },

    getInitialState: function(){
        return {
            text: this.props.text
        }
    },

    onInputChange: function(evt){
        var val = evt.target.value;
        this.setState({
            text: val
        });
    },

    submitClicked: function(){
        this.props.change(this.state.text);
    },

    render: function(){
        return (
            React.createElement("div", {className: 'ui segment center aligned '},
                React.createElement("div", {className: 'ui action input center aligned inputPlaceholder '},
                    React.createElement("input", {onChange: this.onInputChange, value: this.state.text, type: "text", className: '', placeholder: "Search..."}),
                    React.createElement("button", {onClick: this.submitClicked, placeholder: 'Search... ', value: this.state.text, className: 'button ui primary'}, React.createElement("i", {className: ' icon search '}), " search...")
                ),
                React.createElement("div", {className: 'ui ' + (this.props.enabled == true ? '  ' : ' active ') + '  inverted dimmer'},
                    React.createElement("div", {className: 'ui loader'})
                )
            )
        );
    }

});