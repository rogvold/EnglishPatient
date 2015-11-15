/**
 * Created by sabir on 11.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var VerticalUsersListItem = React.createClass({
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
        return {}
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
            //backgroundColor: '#F3F3F3'
            backgroundColor: '#1B2432',
            //backgroundColor: '#FC636B',
            color: '#FFFFFF'
        },
        avatar: {
            width: 30,
            height: 30,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundColor: 'lightgrey',
            display: 'inline-block',
            border: '1px solid #EFF0F1'
            //border: '1px solid #FC636B'
        },

        contentPlaceholder: {
            display: 'inline-block',
            color: '#8897A3'
        },

        nameBlock: {
            //color: '#1B2432 !important'
            color: '#8897A3'
        }
    },

    onClick: function(){
        this.props.onClick();
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.customStyle);
        var selectedStyle = assign({}, this.componentStyle.selected, this.props.selectedStyle);
        var textStyle = assign({}, this.componentStyle.nameBlock);
        var avaStyle = assign({}, this.componentStyle.avatar, {backgroundImage: 'url(\'' + this.props.avatar + '\')'});

        if (this.props.isSelected == true){
            st = assign(st, selectedStyle);
            textStyle = assign({}, this.componentStyle.selected);
            avaStyle = assign(avaStyle, {borderColor: '#FC636B'});
        }

        return (
            <div style={st} onClick={this.onClick} className={'item'} >

                <div className={'ui avatar image'} style={avaStyle}></div>

                <div className="content" style={this.componentStyle.contentPlaceholder} >
                    <a style={textStyle} >{this.props.name}</a>
                </div>
            </div>
        );
    }

});

module.exports = VerticalUsersListItem;