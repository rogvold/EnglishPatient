/**
 * Created by sabir on 29.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var ResultsItemPanel = React.createClass({
    getDefaultProps: function () {
        return {
            youtubeId: undefined,
            name: undefined,
            category: undefined,
            avatar: undefined,
            viewCount: undefined,
            items: [],
            activeInfo: {

            },
            onItemClick: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            itemsVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var activeInfo = nextProps.activeInfo;
        var items = nextProps.items;
        var youtubeId = nextProps.youtubeId;
        var active = this.isActive(activeInfo, youtubeId, items);
        if (active == false){
            this.setState({
                itemsVisible: false
            });
        }
    },

    componentDidMount: function () {

    },

    isActive: function(activeInfo, youtubeId, items){
        if (activeInfo.youtubeId != youtubeId){
            return false;
        }
        if (items == undefined){
            items = [];
        }
        var f = false;
        for (var i in items){
            var item = items[i];
            if (item.start == activeInfo.start && item.duration == activeInfo.duration){
                f = true;
            }
        }
        return f;
    },

    componentStyle: {
        placeholder: {
            marginBottom: 10,
            backgroundColor: 'white',
            borderBottom: '1px solid #EFF0F1'
        },

        headBlock: {
            padding: 5,
            cursor: 'pointer'
        },

        contentBlock: {

        },

        itemPanel: {
            borderTop: '1px solid #EFF0F1',
            padding: 7,
            //lineHeight: '24px',
            cursor: 'pointer'
        },

        active: {
            backgroundColor: '#2E3C54',
            color: 'white'
        },

        avatarPlaceholder: {
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            display: 'inline-block',
            verticalAlign: 'top',
            height: 80,
            width: 120,
            borderRadius: 4
        },

        infoPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 265,
            padding: 5
        },

        infoTitle: {
            fontWeight: 'bold'
        }
    },

    onHeadClick: function(){
        var newVisible = !this.state.visible;
        this.setState({
            itemsVisible: newVisible
        });
        setTimeout(function(){
            if (newVisible == true){
                this.onItemClick(this.props.items[0]);
            }
        }.bind(this), 100);

    },

    onItemClick: function(item){
        this.props.onItemClick(this.props.youtubeId, item);
    },

    render: function () {

        var avatar = assign({}, this.componentStyle.avatarPlaceholder, {backgroundImage: 'url(\'' + this.props.avatar + '\')'});

        var items = this.props.items;

        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.headBlock} onClick={this.onHeadClick} >
                    <div style={avatar}></div>
                    <div style={this.componentStyle.infoPlaceholder}>
                        <div style={this.componentStyle.infoTitle}>{this.props.name}</div>
                    </div>
                </div>

                {this.state.itemsVisible == false ? null :
                    <div style={this.componentStyle.contentBlock}>
                        {items.map(function(item, k){
                            var key = 'item_' + this.props.youtubeId + '_' + item.duration + '_' + item.start;
                            var info = this.props.activeInfo;
                            var isActive = (info.duration == item.duration && info.start == item.start && info.youtubeId == this.props.youtubeId);
                            var st = assign({}, this.componentStyle.itemPanel);
                            if (isActive){
                                st = assign(st, this.componentStyle.active);
                            }
                            var onClick = this.onItemClick.bind(this, item);
                            return (
                                <div key={key} style={st} onClick={onClick}>
                                    {item.text}
                                </div>
                            );
                        }, this)}
                    </div>
                }




            </div>
        );
    }

});

module.exports = ResultsItemPanel;