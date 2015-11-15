/**
 * Created by sabir on 12.08.15.
 */

var React = require('react');
var CurrentUserDropdownItem = require('./CurrentUserDropdownItem');
var CurrentUserPanel = require('./CurrentUserPanel');
var assign = require('object-assign');

var CurrentUserHeaderDropdown = React.createClass({
    getDefaultProps: function () {
        return {
            user: undefined,
            links: [
                {
                    name: 'N/A',
                    onClick: function(){
                        alert('n/a clicked');
                    }
                }
            ],
            onLinkClick: function(num){
                console.log('link[' + num + '] clicked');
            }
        }
    },

    getInitialState: function () {
        return {
            dropdownVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            //backgroundColor: 'red',

        },
        currentUserPanelPlaceholder:{
            cursor: 'pointer',
            zIndex: 10
        },

        dropdownPlaceholder: {
            display: 'block',
            borderBottom: '1px solid lightgray',
            backgroundColor: 'whitesmoke'
        }
    },

    itemClicked: function(a, b){
        var num = +a;
        //console.log(a, b);
        //this.props.links[num].onClick();
        this.props.onLinkClick(num);
    },

    currentUserClicked: function(){
        this.setState({
            dropdownVisible: !this.state.dropdownVisible
        });
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                {this.props.user == undefined ?
                    (<div>

                    </div>)
                    :
                    (<div style={this.componentStyle.currentUserPanelPlaceholder} >
                        <CurrentUserPanel onClick={this.currentUserClicked} name={this.props.user.name} avatar={this.props.user.avatar} />

                        <div style={assign({}, this.componentStyle.dropdownPlaceholder, {display: (this.state.dropdownVisible == false ? ' none ' : this.componentStyle.dropdownPlaceholder.display) } )}>
                            {this.props.links.map(function(item, i){
                                var key =  i;
                                var boundClick = this.itemClicked.bind(this, key);
                                return (
                                    <CurrentUserDropdownItem key={key} onClick={boundClick} name={item.name} icon={item.icon} />
                                );
                            }, this)}
                        </div>

                    </div>)

                }
            </div>
        );
    }

});

module.exports = CurrentUserHeaderDropdown;