/**
 * Created by sabir on 06.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var ClassListItem = React.createClass({
    getDefaultProps: function () {
        return {
            name: '',
            code: '',
            isSelected: false,
            classId: undefined,
            onClick: function(){

            }
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
            padding: 11,
            paddingLeft: 5,
            paddingRight: 5,
            cursor: 'pointer'
        },
        selected: {
            backgroundColor: '#F3F3F3'
        }
    },

    onClick: function(){
        this.props.onClick(this.props.userId);
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder);
        if (this.props.isSelected == true){
            st = assign(st, this.componentStyle.selected);
        }

        return (
            <div style={st} onClick={this.onClick} className={'item'} >
                <div className={'content'}>
                    {this.props.name} <span style={{fontWeight: 'bold', float: 'right'}} >{this.props.code}</span>
                </div>
            </div>
        );
    }

});

module.exports = ClassListItem;