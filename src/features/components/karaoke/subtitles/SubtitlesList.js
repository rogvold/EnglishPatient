/**
 * Created by sabir on 01.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var SubtitlesListItem = require('./SubtitlesListItem');

var KaraokeMixin = require('../../../mixins/KaraokeMixin');

var SubtitlesList = React.createClass({
    getDefaultProps: function () {
        return {
            subtitles: [],
            time: 0,
            onItemClick: function(item){

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
            height: '100%',
            overflowY: 'auto'
        }
    },

    onItemClick: function(item){
        this.props.onItemClick(item);
    },

    getActiveId: function(){
        var p = 'kar_item_';
        var list = this.props.subtitles;
        var currentStart = 0;
        var time = this.props.time;
        var currentSubtitle = KaraokeMixin.getCurrentSubtitles(this.props.subtitles, time);
        if (currentSubtitle != undefined && currentSubtitle.current != undefined){
            currentStart = currentSubtitle.current.start;
        }
        for (var i in list){
            var item = list[i];
            var isActive = (Math.abs(+item.start - +currentStart) <= 0.01);
            if (isActive == true){
                return (p + i);
            }
        }
        return undefined;
    },

    scrollToActive: function(){
        var id = this.getActiveId();
        if (id == undefined){
            return;
        }
        var parentId = 'karaoke_subtitles_list';
        var element = document.getElementById(id);
        var parent = document.getElementById(parentId);
        if (element != undefined && parent != undefined){
            var topPos = element.offsetTop;
            parent.scrollTop = topPos - 250 - 10;
        }
    },

    componentDidUpdate: function(){
        this.scrollToActive();
    },

    render: function () {
        var list = this.props.subtitles;
        var time = this.props.time;
        var subtitles = this.props.subtitles;
        var currentSubtitle = KaraokeMixin.getCurrentSubtitles(this.props.subtitles, time);
        var currentStart = 0;
        if (currentSubtitle != undefined && currentSubtitle.current != undefined){
            currentStart = currentSubtitle.current.start;
        }


        return (
            <div style={this.componentStyle.placeholder} id="karaoke_subtitles_list" >
                {list.map(function(item, k){
                    var key = 'kar_item_' + k;
                    var id = key;
                    var isActive = (Math.abs(+item.start - +currentStart) <= 0.01);
                    var onItemClick = this.onItemClick.bind(this, item);
                    return (
                        <div id={id} key={key}>
                            <SubtitlesListItem active={isActive} text={item.text}
                                               onItemClick={onItemClick}  />
                        </div>

                    );
                }, this)}
            </div>
        );
    }

});

module.exports = SubtitlesList;