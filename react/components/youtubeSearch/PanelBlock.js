
/**
 * Created by sabir on 20.07.15.
 */

/**
 * imgSrc
 * name
 * viewsNumber
 * panels: list[{text, start, end}]
 * visible
 * youtubeId
 * customObject
 * panelClicked - callback (start, end, youtubeId, text)
 *
 */



var PanelBlock = React.createClass({displayName: "PanelBlock",
    getDefaultProps: function() {
        return {
            imgSrc: 'http://vignette3.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png/revision/latest?cb=20130527163652',
            name: 'No Name',
            category: 'No Category',
            viewsNumber: 100,
            panels: [{text: 'first panel', start: 0, end: 10}, {text: 'second panel', start: 0, end: 10}],
            panelClicked: function(c){console.log(c);},
            visible: true,
            youtubeId: '',
            customObject: {}
        }
    },

    getInitialState: function(){
        return {
            cardsVisible: false,
            panels: this.props.panels.map(function(p){p.active=false; return p;})
        }
    },

    componentDidUpdate: function(){

    },

    headClicked: function(){
        var newVal = !this.state.cardsVisible;
        if (newVal == true){
            this.panelItemClicked(0, this.state.panels[0]);
        }else{
            this.setState({
                cardsVisible: newVal
            });
        }

    },

    panelItemClicked: function(i, p) {
        //console.log('panelItemClicked occured i,p', i, p);
        var arr = this.state.panels;
        for (var i in arr){
            arr[i].active = false;
            if (arr[i].start == p.start && arr[i].end == p.end){
                arr[i].active = true;
            }
        }
        this.props.panelClicked(this.myAssign({}, {youtubeId: this.props.youtubeId}, this.props.customObject, p));
        this.setState({
            panels: arr,
            cardsVisible: true
        });
    },

    myAssign: function(){
        var o = {};
        for (var i in arguments){
            var a = arguments[i];
            if (a == undefined){continue}
            for (var key in a){
                o[key] = a[key];
            }
        }
        return o;
    },

    render : function(){
        //console.log('PanelBlock rendering: panels = ', this.state.panels);
        var self = this;
        return (
            React.createElement("div", {className: 'segment ui '}, 
                React.createElement("div", {onClick: this.headClicked, className: 'panelsBunchHeader item  raised  ' + (this.props.visible == true ? '' : 'displaynone')}, 

                        React.createElement("img", {className: ' ui middle aligned tiny image  ', src: this.props.imgSrc}), 


                        React.createElement("span", {className: 'infoPlaceholder middle inline ui aligned content '}, 
                            React.createElement("div", {className: 'header '}, this.props.name), 
                            React.createElement("div", {className: 'meta'}, 
                                React.createElement("span", null)
                            ), 
                            React.createElement("a", {className: "ui blue right label"}, this.props.category), 
                            React.createElement("a", {className: "ui gray right label"}, this.props.viewsNumber)

                        )
                ), 
                React.createElement("div", {className: "ui divider"}), 

                React.createElement("div", {className: 'cardsPlaceholder ' + (this.state.cardsVisible == true ? '' : 'displaynone') }, 
                    React.createElement("div", {className: 'ui items  '}, 
                        
                            this.state.panels.map(function(p, i){
                                var boundClick = this.panelItemClicked.bind(this, i, p);
                                return (React.createElement("div", {key: 'panelItemClicked' + i, onClick: boundClick, className: ' cardItem ui segment ' + (p.active == undefined || p.active == false ? '' : 'active')}, 
                                    React.createElement("div", {className: ' content '}, p.text)
                                ));
                            }, this)
                        
                    )
                )

            )
        );
    }

});