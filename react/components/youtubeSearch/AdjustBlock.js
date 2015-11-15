/**
 * Created by sabir on 20.07.15.
 */
//  left, right, visible
//  change : func ({left, right})


var AdjustBlock = React.createClass({displayName: "AdjustBlock",
    getDefaultProps: function(){
      return {
          left: 0,
          right: 0,
          visible: true
      }
    },

    getInitialState: function(){
        return {
            left: this.props.left,
            right: this.props.right
        }
    },

    isNumeric: function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },

    handleLeftChange: function(evt){
        var newVal = evt.target.value;
        this.setState({
            left: newVal
        });
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            left: nextProps.left,
            right: nextProps.right
        });
    },

    handleRightChange: function(evt){
        var newVal = evt.target.value;
        this.setState({
            right: newVal
        });
    },
    applyButtonClick: function(){
        if (this.isNumeric(this.state.left) == false || this.isNumeric(this.state.right) == false){
            return;
        }
        this.props.change({left: +this.state.left, right: +this.state.right});
    },

    render: function(){
        return (
            React.createElement("div", {className: 'adjustBlock ui input  ' + (this.props.visible == true ? '' : 'displaynone')}, 
                React.createElement("input", {type: "text", style: {textAlign: 'center', width: 150}, value: this.state.left, onChange: this.handleLeftChange, className: "leftInput adjustInput "}), 
                React.createElement("input", {type: "text", style: {textAlign: 'center', width: 150, marginLeft: 10}, value: this.state.right, onChange: this.handleRightChange, className: "rightInput adjustInput "}), 
                React.createElement("button", {style: {marginLeft: 15}, onClick: this.applyButtonClick, className: "ui button primary playerApplyButton"}, "Apply")
            )
        );
    }

});