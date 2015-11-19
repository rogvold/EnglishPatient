/**
 * Created by sabir on 17.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var TopicDialog = require('../../topics/dialog/TopicDialog');

var SecondLevelPanelItem = require('../SecondLevelPanelItem');

var SausageDialog = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            avatar: undefined,
            items: undefined,
            description: undefined,

            onClose: function(){

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
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
            overflowY: 'auto'
        },

        headerPanel: {
            width: '100%',
            height: 140,
            textAlign: 'center',
            paddingTop: 40,
            fontSize: 40,
            lineHeight: '45px',
            color: 'white',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            borderBottom: '1px solid #EFF0F1 '
        },

        contentPlaceholder: {
            padding: 5,
            width: 800,
            margin: '0 auto'

        },

        descriptionPlaceholder: {
            paddingTop: 10,
            fontSize: 18,
            lineHeight: '22px',
            paddingBottom: 10
        },

        itemsPlaceholder: {
            marginTop: 20
        }
    },

    getDialogContent: function(){
        var headerStyle = assign({}, this.componentStyle.headerPanel,
            {backgroundImage: 'url(\'' + this.props.avatar + '\')'});
        var items = (this.props.items == undefined) ? [] : this.props.items;

        return (
            <div style={this.componentStyle.placeholder} >
                <div style={headerStyle}>
                    {this.props.name}
                </div>

                <div style={this.componentStyle.contentPlaceholder}>

                    {this.props.description == undefined ? null :
                        <div style={this.componentStyle.descriptionPlaceholder}>
                            {this.props.description}
                        </div>
                    }

                    <div style={this.componentStyle.itemsPlaceholder}>
                        {items.map(function(item, k){
                            var key = 'second_item_' + k;
                            return (
                                <SecondLevelPanelItem key={key}
                                                      vimeoId={item.vimeoId}
                                                      name={item.name}
                                                      description={item.description}
                                                      content={item.content}
                                />
                            );
                        }, this)}
                    </div>



                </div>

            </div>

        );
    },

    render: function () {

        return (
            <div >

                <TopicDialog onClose={this.props.onClose}
                             content={this.getDialogContent()}
                    />

            </div>
        );
    }

});

module.exports = SausageDialog;