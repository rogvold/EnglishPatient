/**
 * Created by sabir on 12.08.15.
 */
var React = require('react');

var CurrentUserDropdownItem = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'N/A',
            icon: ' icon plane ',
            onClick: {

            }
        }
    },

    getInitialState: function () {
        return {}
    },

    _onClick: function(){
        this.props.onClick();
    },

    componentStyle: {
        placeholder: {
            padding: 10,
            //backgroundColor: 'whitesmoke',
            border: '1px solid lightgray',
            borderBottom: 'none',
            borderTop: 'none',
            minWidth: 120
        }
    },

    render: function () {
        return (
            <div className={'currentUserDropdownItem'} style={this.componentStyle.placeholder} onClick={this._onClick} >
                <i className={this.props.icon} ></i>
                {this.props.name}
            </div>
        );
    }

});

module.exports = CurrentUserDropdownItem;