/**
 * Created by sabir on 21.07.15.
 */

var PatientMenu = React.createClass({

    getInitialState: function(){
        return {
            menuPanels: [],
            rawPanels: []
        }
    },

    componentDidMount: function(){
        var appId = 'h1QhtsSjeoyQSa8RDQBDPvgbnI7Ix6nadHTsepwN';
        var jsKey = 'Ci34OXCgbv7TuVOiUJFOmoSwULbC7JRnxvFaT1ZI';
        Parse.initialize(appId, jsKey);
        this.loadMaterials();
    },

    prettifyMaterials: function(list){
        var map = {};
        var arr = [];
        var remarkable = new Remarkable();
        for (var i in list){
            var p = list[i];
            if (list[i].get('parentId') == undefined){
                map[list[i].id] = {
                    mainPanel: {
                        name: p.get('name'),
                        imgSrc: p.get('imgSrc'),
                        description: p.get('description'),
                        blockDescription: p.get('blockDescription'),
                        id: p.id
                    },
                    panels: []
                }
            }
        }

        for (var i in list){
            if (list[i].get('parentId') != undefined){
                var p = list[i];
                if (map[p.get('parentId')] == undefined){
                    continue;
                }
                map[p.get('parentId')].panels.push({
                    name: p.get('name'),
                    imgSrc: p.get('imgSrc'),
                    description: p.get('description'),
                    id: p.id
                });
            }
        }
        for (var key in map){
            arr.push(map[key]);
        }
        return arr;
    },

    loadMaterials: function(){
        var q = new Parse.Query(Parse.Object.extend('PatientMenuBlock'));
        q.limit(1000);
        q.addAscending('number');
        var self = this;
        q.find(function(results){
            var arr = self.prettifyMaterials(results);
            console.log(arr);
            self.setState({
                menuPanels: arr,
                rawPanels: results
            });
        });
    },

    panelClicked: function(n, panelId){
        var list = this.state.rawPanels;
        for (var i in list){
            if (panelId == list[i].id){
                var p = list[i];
                if (p.get('vimeoId') != undefined){
                    showPanelModal(p.get('vimeoId'), p.get('videoText'));
                }
            }
        }
    },

    render: function(){

        return (
            <div>
                {this.state.menuPanels.map(function(panel, i){
                    var key = i;
                    var boundClicked = this.panelClicked.bind(this, key);
                    return (
                     <div key={key}>
                        <PanelsBunch panelClicked={boundClicked} mainPanel={panel.mainPanel} description={panel.mainPanel.blockDescription} panels={panel.panels} />
                     </div>
                    )
                }, this)}
            </div>
        );
    }
});