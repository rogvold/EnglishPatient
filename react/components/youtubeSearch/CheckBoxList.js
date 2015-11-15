/**
 * Created by sabir on 20.07.15.
 */

var CheckBoxList = React.createClass({displayName: "CheckBoxList",
    getDefaultProps: function(){
        return {
            checkboxes: [],
            change: function(){},
            visible: true
        }
    },
    getInitialState: function(){
        return {
            checkboxes: this.props.checkboxes
        };
    },
    checkboxChange: function(n, ch){
        for (var i in this.props.checkboxes){
            if (this.props.checkboxes[i].id == ch.id){
                this.props.checkboxes[i].value= ch.val;
            }
        }
        var list = this.props.checkboxes;
        console.log('invoking parent callback from props: checkboxes list = ');
        console.log(list);
        this.props.change({
            checkboxes: list
        });
        this.setState({ checkboxes: list});
    },
    render: function(){
        return (
            React.createElement("div", {className: 'checkboxesGroup' + (this.props.visible == true ? '' : 'displaynone') }, 
                this.state.checkboxes.map(function(item, i) {
                    var boundClick = this.checkboxChange.bind(this, i);
                    return (
                        React.createElement("div", {className: "col-sm-3 col-md-3", key: i}, 
                            React.createElement(CheckBox, {key: i, change: boundClick, value: item.value, id: item.id, label: item.label})
                        )
                    );
                }, this)

            )
        );
    }
});