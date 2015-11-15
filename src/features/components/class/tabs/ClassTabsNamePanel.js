/**
 * Created by sabir on 11.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var ClassTabsNamePanel = React.createClass({
    getDefaultProps: function () {
        return {
            items: [
                {
                    name: 'users',
                    displayName: 'Ученики'
                },
                {
                    name: 'tasks',
                    displayName: 'Задания'
                },
                {
                    name: 'check',
                    displayName: 'Проверка'
                }
            ],
            selectedTabName: 'users',
            onTabClick: function(index, name){
                console.log('tab clicked:', name, index);
            },
            enabled: true
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
            width: '100%',
            height: 30,
            textAlign: 'center',
            backgroundColor: 'white',
            borderBottom: '1px solid #EFF0F1 '
        },

        tabs: {

        },

        nameItem: {
            marginRight: 30,
            color: '#A1A4AA',
            boxSizing: 'border-box',
            display: 'inline-block',
            height: '100%',
            paddingBottom: 8,
            cursor: 'pointer'
        },

        selected: {
            color: '#1B2432',
            borderBottom: '3px solid #FC636B',
            paddingBottom: 5,
            paddingTop: 3
        },

        disabled: {
            opacity: 0.5
        }

    },

    onItemClick: function(n, name){
        if (this.props.enabled == false){
            return;
        }
        this.props.onTabClick(n, name);
    },

    render: function () {
        var list = this.props.items;
        var st = assign({}, this.componentStyle.placeholder);
        if (this.props.enabled == false){
            st = assign(st, this.componentStyle.disabled);
        }

        return (
            <div style={st}>
                <div style={this.componentStyle.tabs}>
                    {list.map(function(item, n){
                        var name = item.name;
                        var key = 'top-item-' + n;
                        var st = assign({}, this.componentStyle.nameItem);
                        if (this.props.selectedTabName == name){
                            st = assign(st, this.componentStyle.selected);
                        }
                        if (n == list.length - 1){
                            st = assign(st, {marginRight: 0});
                        }
                        var boundClick = this.onItemClick.bind(this, n, name);

                        return (
                            <div style={st} onClick={boundClick} key={key}>
                                {item.displayName}
                            </div>
                        );

                    }, this)}
                </div>
            </div>
        );
    }

});


module.exports = ClassTabsNamePanel;