/**
 * Created by sabir on 20.07.15.
 */

var PatientYoutubeSearch = React.createClass({displayName: "PatientYoutubeSearch",
    getDefaultProps: function(){
        return {
            text: ''
        }
    },
    getInitialState: function(){
        return {
            materials: [],
            filteredMaterials: [],
            text: '',
            isSearching: false,
            selectedMaterial: {

            }
        }
    },

    componentDidMount: function(){
        var appId = 'h1QhtsSjeoyQSa8RDQBDPvgbnI7Ix6nadHTsepwN';
        var jsKey = 'Ci34OXCgbv7TuVOiUJFOmoSwULbC7JRnxvFaT1ZI';
        Parse.initialize(appId, jsKey);
    },

    prepareFoundData: function(data){
        var list = data;
        var arr = [];
        for (var i in list){
            var m = list[i];
            var panels = m.items.map(function(item){return {start: item.start, end: (item.start + item.duration), text: item.text}});
            arr.push({
                youtubeId: m.videoInfo.youtubeId,
                category: m.videoInfo.videoCategory,
                name: m.videoInfo.videoTitle,
                viewsNumber: m.videoInfo.viewCount,
                imgSrc: m.videoInfo.imgSrc,
                panels: panels
            });
        }
        this.setState({
            materials: arr,
            isSearching: false,
            selectedMaterial: {
                youtubeId: 'YPdHRiIWpoM',
                start: 0,
                end: 1000
            }
        });
    },

    searchClicked: function(text){
        console.log(text);
        this.setState({
            text: text,
            selectedMaterials: {

            }
        });
        if (text == ''){
            return;
        }
        this.setState({
            text: text,
            isSearching: true
        });
        var self = this;
        Parse.Cloud.run('searchPhrase', {
            query: text
        }, {
            success: function(data){
                console.log(data);
                self.prepareFoundData(data);
            }
        });
    },

    adjustClicked: function(data){
        var start = data.left;
        var end = data.right;
        var youtubeId = this.state.selectedMaterial.youtubeId;
        var text = this.state.selectedMaterial.text;
        this.setState({
            selectedMaterial: {
                youtubeId: youtubeId,
                start: start,
                end: end,
                text: text
            }
        });
    },

    panelClicked: function(data){
        console.log('panel clicked', data);
        this.setState({
            selectedMaterial: data
        });
    },

    render: function(){
        console.log('selected material is ', this.state.selectedMaterial);
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: ''}, 
                    React.createElement(InputComponent, {enabled: !this.state.isSearching, change: this.searchClicked})
                ), 
                React.createElement("div", {className: 'ui grid'}, 
                    React.createElement("div", {className: 'eight wide column'}, 
                        React.createElement(PanelsBunchesList, {change: this.panelClicked, materials: this.state.materials})
                    ), 

                    React.createElement("div", {className: 'eight wide column playerPlaceholder ' + (this.state.materials.length > 0 ? '  ' : ' displaynone ') + ' ', style: {textAlign: 'center'}}, 
                        React.createElement("div", {className: 'ui segment'}, 
                            this.state.selectedMaterial.youtubeId == undefined ? (React.createElement("div", null)) : (
                                React.createElement("div", null, 
                                    React.createElement("h5", null, this.state.selectedMaterial.text), 
                                    React.createElement("p", {style: {textAlign: 'right'}}, React.createElement("a", {target: "_blank", href: 'http://www.youtube.com/watch?v=' + this.state.selectedMaterial.youtubeId}, React.createElement("i", {className: 'ui icon youtube'})))
                                )
                            ), 

                            React.createElement("div", null, 
                                React.createElement(YoutubePlayer, {youtubeId: this.state.selectedMaterial.youtubeId, start: this.state.selectedMaterial.start, end: this.state.selectedMaterial.end})
                            ), 
                            React.createElement("div", {style: {paddingTop: 10, paddingBottom: 10}}, 
                                React.createElement(AdjustBlock, {change: this.adjustClicked, visible: this.state.selectedMaterial.youtubeId != undefined, left: this.state.selectedMaterial.start, right: this.state.selectedMaterial.end})
                            )


                        )
                    )

                )

            )
        );

    }
});