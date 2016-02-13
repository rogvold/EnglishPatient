/**
 * Created by sabir on 16.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var AccessSwitcher = React.createClass({
    getDefaultProps: function () {
        return {
            items: [
                {
                    name: 'private',
                    icon: undefined,
                    displayName: 'Приватный'
                },
                {
                    name: 'public',
                    icon: undefined,
                    displayName: 'Публичный'
                }
            ],
            activeName: undefined,
            onAccessChange: function(newAccess){

            },

            publicAccessMessage: 'Это упражнение смогут использовать другие преподаватели',
            privateAccessMessage: 'Это упражнение доступно только Вам',
            noAccessMessage: 'Выберите режим доступа к данному упражнению'
        }
    },

    getInitialState: function () {
        return {
            activeName: this.props.activeName
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var newName = nextProps.activeName;
        this.setState({
            activeName: newName
        });
    },

    componentDidMount: function () {

    },

    onClick: function(name){
        console.log('changing access to', name);
        this.setState({
            activeName: name
        });
        this.props.onAccessChange(name);
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },
        accessMessage: {
            color: 'rgba(0,0,0,0.87)',
            fontSize: '12px'
        }
    },

    render: function () {
        var list = this.props.items;

        console.log('rendering AccessSwitcher: this.state.activeName = ', this.state.activeName);

        return (
            <div style={this.componentStyle.placeholder} className={'ui buttons'} >

                <div className={'accessButtonsPlaceholder'} >
                    {list.map(function(item, n){
                        var name = item.name;
                        var icon = item.icon;
                        var displayName = item.displayName;
                        var key = name + '-' + n;
                        var active = (this.state.activeName == name);
                        var boundClick = this.onClick.bind(this, name);
                        return (
                            <div key={key} onClick={boundClick} className={'ui button ' + (active == true ? ' teal active ' : ' ')}>
                                {icon == undefined ? null :
                                    <i className={icon} ></i>
                                }
                                {displayName}
                            </div>
                        );
                    }, this)}
                </div>


                <div style={this.componentStyle.accessMessage} className={'accessMessagePlaceholder'} >
                    {this.state.activeName == undefined ? <span>{this.props.noAccessMessage}</span> : null}
                    {this.state.activeName == 'public' ? <span>{this.props.publicAccessMessage}</span> : null }
                    {this.state.activeName == 'private' ? <span>{this.props.privateAccessMessage}</span> : null}
                </div>

            </div>
        );
    }

});

module.exports = AccessSwitcher;