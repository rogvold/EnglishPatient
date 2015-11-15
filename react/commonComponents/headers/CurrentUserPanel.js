/**
 * Created by sabir on 12.08.15.
 */
var React = require('react');

var CurrentUserPanel = React.createClass({
    getDefaultProps: function () {
        return {
            isVisible: true,
            avatar: 'http://2i.tusur.ru/media/images/Lirmak_1.jpg',
            name: '',
            onClick: function(){
                console.log('user panel clicked');
            }
        }
    },


    componentStyle: {
        avatar: {
            verticalAlign: 'top',
            marginTop: 10,
            borderRadius: 100,
            width: 32,
            height: 32,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: 'white',
            borderStyle: 'solid'
        },
        placeholder: {
            display: 'inline-block',
            cursor: 'pointer',
            color: 'white',
            fontSize: 16,
            textAlign: 'right',
            minWidth: 120,
            marginBottom: 5
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    render: function () {

        return (
            <div className={'currentUserPanel'} onClick={this.props.onClick} style={this.componentStyle.placeholder} >
                <div style={{color: 'white', display: 'inline-block', fontSize: 16, marginRight: 10, paddingTop: 12}} >{this.props.name}</div>
                <img style={this.componentStyle.avatar} src={this.props.avatar} />
            </div>
        );
    }

});

module.exports = CurrentUserPanel;