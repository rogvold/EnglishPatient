/**
 * Created by sabir on 20.07.15.
 */
/**
 *  materials: [{youtubeId, imgSrc, name, category, viewsNumber, panels:[{start, end, text}, {}, ...]}, {}]
 *  change: func
 *
 */

var PanelsBunchesList = React.createClass({displayName: "PanelsBunchesList",
    getDefaultProps: function(){
        return ({
            change: function(){},
            materials: [],
            activePanel: {start: -2, end: -1, text: ''}
        });
    },
    //getInitialState: function(){
    //    return {
    //        materials: this.props.materials
    //    }
    //},
    selectOccured: function(i, data){
        this.props.change(data);
        this.setState({
            materials: this.props.materials.map(function(m){var panels = m.panels.map(function(p){ p.active = false; if (p.start == data.start && data.end == p.end){p.active = true;} return p;}); m.panels = panels; return m;} )
        });
    },

    componentWillReceiveProps: function(nextProps) {
        this.forceUpdate();
    },

    render: function(){
        console.log('Bunches render occured', this.props.materials);
        return (
            React.createElement("div", {className: 'sixteen wide column '}, 
                
                    this.props.materials.map(function(item, i){
                        var boundChange = this.selectOccured.bind(this, i);
                        return (
                            React.createElement("div", {className: 'sixteen wide column panelBunch ', key: 'PBlock_' + item.youtubeId + item.state + item.end + i}, 
                                React.createElement(PanelBlock, {key: 'PanelBlock' + i, panelClicked: boundChange, imgSrc: item.imgSrc, name: item.name, category: item.category, viewsNumber: item.viewsNumber, youtubeId: item.youtubeId, panels: item.panels})
                            )
                        );
                    }, this)
                
            )
        );
    }
});