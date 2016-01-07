/**
 * Created by sabir on 06.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var ArticleMixin = require('../../../mixins/ArticleMixin');

var MigratePanel = React.createClass({
    getDefaultProps: function () {
        return {

        }
    },

    getInitialState: function () {
        return {
            map: {}
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    getArticlesList: function(){
        var map = this.state.map;
        var arr = [];
        for (var key in map){
            if (map[key].iframes.length == 0){
                continue;
            }
            arr.push(map[key]);
        }
        return arr;
    },


    load: function(){
        ArticleMixin.loadMigrationData(function(map){
            this.setState({
                map: map
            });
        }.bind(this));
    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {

        var list = this.getArticlesList();



        return (
            <div style={this.componentStyle.placeholder}>

                <div>

                </div>

                {list.map(function(art, k){
                    var key = 'art_' + k;

                    var iframes = art.iframes;

                    return (
                        <div key={key}>
                            <b>{art.name}</b>
                            <br/>


                            {iframes.map(function(ifr, j){
                                var key_ = key + '_' + j;

                                return (
                                    <div key={key_} >
                                        {ifr}
                                    </div>
                                );

                            }, this)}

                            <br/>
                            <hr/>
                            <br/>


                        </div>
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = MigratePanel;