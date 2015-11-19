/**
 * Created by sabir on 17.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var FirstLevelPanelItem = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'Аудирование',
            avatar: 'http://www.unoosa.org/res/timeline/index_html/space-2.jpg',
            panelId: undefined,

            onPanelClick: function(){

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
            cursor: 'pointer',
            display: 'inline-block',
            width: 240,
            height: 160,
            marginRight: 15,
            marginBottom: 15,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            borderRadius: 3,
            textAlign: 'center',
            fontSize: '32px',
            paddingTop: 50,
            color: 'white',
            lineHeight: '45px',
            boxSizing: 'border-box',
            border: '3px solid white'
        }

    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, {backgroundImage: 'url(\'' + this.props.avatar + '\')'});

        return (
            <div style={st} onClick={this.props.onPanelClick} className={'sausageItem'} >
                {this.props.name}
            </div>
        );
    }

});

module.exports = FirstLevelPanelItem;