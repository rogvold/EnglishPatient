/**
 * Created by sabir on 05.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var UserListItem = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            name: undefined,
            number: undefined,
            isSelected: false,
            avatar: 'http://beta.englishpatient.org/img/profile.png',
            onClick: function(){

            },
            selectedStyle: {

            },
            customStyle: {

            }
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
            padding: 5,
            cursor: 'pointer'
        },
        selected: {
            backgroundColor: '#F3F3F3'
        }
    },

    onClick: function(){
        this.props.onClick();
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.customStyle);
        var selectedStyle = assign({}, this.componentStyle.selected, this.props.selectedStyle);
        if (this.props.isSelected == true){
            st = assign(st, selectedStyle);
        }

        return (
            <div style={st} onClick={this.onClick} className={'item'} >
                <img className="ui avatar image" src={this.props.avatar} />
                <div className="content">
                    <a className="header" >{this.props.name}</a>
                    <div className="description">
                        {this.props.email}
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = UserListItem;
