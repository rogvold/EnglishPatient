/**
 * Created by sabir on 29.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var CategoryCheckboxesList = require('./checkbox/CategoryCheckboxesList');

var YoutubeSearchMixin = require('../../../mixins/YoutubeSearchMixin');

var SearchResultsPanel = require('./SearchResultsPanel');

var PatientPlayer = require('../../player/PatientPlayer');

var TranslatableText = require('../../text/translatable/TranslatableText');

var YoutubeSearchPanel = React.createClass({
    getDefaultProps: function () {
        return {
            intervalSpan: 0.25
        }
    },

    getInitialState: function () {
        return {
            activeCategories: [],
            allCategories: [],
            searchResult: [],
            filteredSearchResult: [],
            selectedItem: undefined,
            activeYoutubeId: undefined,
            activeStart: undefined,
            activeDuration: undefined,
            text: '',
            query: ''
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            width: 850,
            position: 'relative',
            margin: '0 auto',
            marginTop: 10,
            borderRadius: 4
        },

        searchInputPlaceholder: {
            padding: 5
        },

        contentPlaceholder: {

        },

        varCheckboxItemStyle: {
            minWidth: 190
        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 400,
            maxHeight: 400,
            overflowY: 'auto'
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 430,
            marginLeft: 10
        },

        checkboxesPlaceholder: {
            width: 772,
            padding: 5,
            margin: '0 auto',
            borderBottom: '1px solid #EFF0F1'
        },

        playerPlaceholder: {
            widht: '100%',
            height: 250
        },

        transcriptPlaceholder: {
            padding: 5,
            textAlign: 'center'
        },

        resultInfoPanel: {
            padding: 5
        }
    },

    onTextChange: function(evt){
        var text = evt.target.value;
        if (text == undefined){
            text = '';
        }
        this.setState({
            text: text,
            query: '',
            selectedItem: undefined
        });
    },

    search: function(text, callback){
        this.setState({
            loading: true,
            searchFinished: false
        });
        YoutubeSearchMixin.search(text, function(data){
            this.setState({
                loading: false,
                query: text,
                searchResult: data,
                filteredSearchResult: data,
                activeCategories: this.getCategoriesListFromSearchResult(data),
                allCategories: this.getCategoriesListFromSearchResult(data),
                searchFinished: true,
                selectedItem: undefined
            });
            if (callback != undefined){
                callback(data);
            }
        }.bind(this));

    },

    onSearchClick: function(){
        var text = this.state.text;
        this.search(text, function(data){
            console.log('search result: ', data);
        });
    },

    getCategoriesListFromSearchResult: function(result){
        var map = {};
        var list = result;
        for (var i in list){
            var r = list[i];
            map[r.videoInfo.videoCategory] = 1;
        }
        var arr = [];
        for (var key in map){
            arr.push(key);
        }
        return arr;
    },

    getCheckboxesForRendering: function(){
        var activeList = this.state.activeCategories;
        var map = {};
        for (var i in activeList){
            map[activeList[i]] = 1;
        }
        var list = this.state.allCategories;
        var arr = [];
        for (var i in list){
            var isActive = (map[list[i]] != undefined);
            arr.push({
                name: list[i],
                active: isActive
            });
        }
        return arr;
    },

    onChange: function(newList){
        var activeList = [];
        var map = {};
        for (var i in newList){
            if (newList[i].active == true){
                activeList.push(newList[i].name);
                map[newList[i].name] = 1;
            }
        }
        var arr = [];

        var sList = this.state.searchResult;
        for (var i in sList){
            var r = sList[i];
            if (map[r.videoInfo.videoCategory] != undefined){
                arr.push(r);
            }
        }

        this.setState({
            activeCategories: activeList,
            selectedItem: undefined,
            filteredSearchResult: arr
        });
    },

    onItemClick: function(youtubeId, item){
        this.setState({
            activeYoutubeId: youtubeId,
            activeStart: item.start,
            activeDuration: item.duration,
            selectedItem: item
        });
    },

    render: function () {
        var checkboxes = this.getCheckboxesForRendering();
        var materialSelected = (this.state.selectedItem != undefined);
        var start = 0, end = 0;
        if (this.state.selectedItem != undefined){
            start = this.state.selectedItem.start;
            end = +start + +this.state.activeDuration + this.props.intervalSpan;
            start-= this.props.intervalSpan;
            console.log('rendering youtube search panel: start, end = ', start, end);
            console.log(this.state.selectedItem);
        }

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.searchInputPlaceholder}>
                    <div className={'ui form'} >
                        <div className="ui action input">
                            <input type="text" placeholder={'Поиск ...'}
                                   value={this.state.text} onChange={this.onTextChange}  />
                            <button className={'ui basic button'} onClick={this.onSearchClick} >
                                <i className={'icon search'} ></i> Поиск
                            </button>
                        </div>
                    </div>
                </div>

                {this.state.query.trim() == '' ? null :
                <div>
                    {(this.state.searchResult.length == 0) ?
                        <div>
                                <div style={this.componentStyle.resultInfoPanel}>
                                    По запросу "<b>{this.state.query}</b>" ничего не найдено
                                </div>
                        </div>
                        :
                        <div style={this.componentStyle.contentPlaceholder}>

                            <div style={this.componentStyle.resultInfoPanel}>
                                Результатов по запросу
                                <TranslatableText text={this.state.text} style={{fontSize: '14px', marginLeft: 0, display: 'inline-block', fontWeight: 'bold'}} />:
                                 <b>{this.state.filteredSearchResult.length}</b>
                            </div>

                            {checkboxes.length == 0 ? null :
                                <div style={this.componentStyle.checkboxesPlaceholder}>
                                    <CategoryCheckboxesList itemStyle={this.componentStyle.varCheckboxItemStyle}
                                                            onChange={this.onChange} checkboxes={checkboxes} />
                                </div>
                            }

                            <div style={this.componentStyle.left}>
                                <SearchResultsPanel
                                    activeYoutubeId={this.state.activeYoutubeId}
                                    activeStart={this.state.activeStart}
                                    activeDuration={this.state.activeDuration}
                                    onItemClick={this.onItemClick} results={this.state.filteredSearchResult} />
                            </div>

                            <div style={this.componentStyle.right}>
                                {materialSelected == false ? null :
                                    <div>
                                        <div style={this.componentStyle.playerPlaceholder}>
                                            <PatientPlayer youtubeId={this.state.activeYoutubeId} start={start} end={end} />
                                        </div>

                                        <div style={this.componentStyle.transcriptPlaceholder}>
                                            {this.state.selectedItem.text}
                                        </div>


                                    </div>
                                }
                            </div>

                        </div>
                    }

                </div>
                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate loader"></div>
                </div>


            </div>
        );
    }

});

module.exports = YoutubeSearchPanel;