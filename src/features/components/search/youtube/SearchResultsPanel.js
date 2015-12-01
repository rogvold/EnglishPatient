/**
 * Created by sabir on 29.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var ResultsItemPanel = require('./ResultsItemPanel');

var SearchResultsPanel = React.createClass({
    getDefaultProps: function () {
        return {
            results: [],
            activeYoutubeId: undefined,
            activeStart: undefined,
            activeDuration: undefined,
            onItemClick: function(youtubeId, item){

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
            marginBottom: 10,
            borderRight: '1px solid #EFF0F1'
        }
    },

    onItemClick: function(youtubeId, item){
        this.props.onItemClick(youtubeId, item);
    },

    render: function () {
        var list = this.props.results;
        return (
            <div style={this.componentStyle.placeholder}>
                {list.map(function(r, k){
                    var key = 'res_' + '_' + r.videoInfo.youtubeId + '_' + k + '_';
                    var info = r.videoInfo;
                    var activeInfo = {start: this.props.activeStart,
                                      duration: this.props.activeDuration,
                                      youtubeId: this.props.activeYoutubeId};
                    return (
                        <ResultsItemPanel
                            category={info.videoCategory}
                            youtubeId={info.youtubeId}
                            items={r.items}
                            activeInfo={activeInfo}
                            onItemClick={this.onItemClick}
                            name={info.videoTitle}
                            avatar={info.imgSrc} key={key} />
                    );
                }, this)}

            </div>
        );
    }

});

module.exports = SearchResultsPanel;