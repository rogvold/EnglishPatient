/**
 * Created by sabir on 10.10.15.
 */
var React = require('react');
var assign = require('object-assign');

//var Navigation = require('react-router').;
var History = require('react-router').History;

var HeaderLeftLinks = React.createClass({
    mixins:  [History],
    getDefaultProps: function () {
        return {
            items: [{
                name: 'first',
                displayName: 'First Link',
                icon: '',
                onClick: function(){
                    console.log('First Link clicked');
                }
            },{
                displayName: 'Second Link',
                name: 'second',
                icon: '',
                onClick: function(){
                    console.log('Second Link clicked');
                }
            }],
            onItemClicked: function(){

            },
            activeNumber: 0,
            activeName: 'first',
            activeTab: undefined
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
            marginLeft: 10,
            display: 'inline-block',
            height: '100%'
        },

        item: {
            height: '100%',
            boxSizing: 'borderBox',
            display: 'inline-block',
            marginRight: 25,
            color: '#A1A4AA',
            paddingTop: 10,
            cursor: 'pointer'
        },
        active: {
            borderBottom: '3px solid #FC636B',
            color: '#1B2432'
        }
    },

    onItemClick: function(n){
        //this.props.items[n].onClick();
        this.props.onItemClicked(n);
    },

    render: function () {
        var list = this.props.items;
        console.log('rendering Header Left Links: activeTab = ', this.props.activeTab);

        return (
            <div style={this.componentStyle.placeholder}>
                {list.map(function(item, n){
                    var key = 'left-links-item-' + n;
                    var name = item.name;
                    var icon = item.icon;
                    var active = ((name == this.props.activeName) || (name == this.props.activeTab));
                    var st = assign({}, this.componentStyle.item);
                    if (active == true) {st = assign(st, this.componentStyle.active)}
                    var boundClick = this.onItemClick.bind(this, n);
                    return (
                        <div onClick={boundClick} style={st} key={key} >
                            {icon == undefined || icon == '' ? null :
                                <i className={icon}></i>
                            }
                            {item.displayName}
                        </div>
                    );
                }, this)}
            </div>
        );
    }

});


module.exports = HeaderLeftLinks;