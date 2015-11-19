/**
 * Created by sabir on 17.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var FirstLevelPanelItem = require('./FirstLevelPanelItem');

var DataFactory = require('../../data/DataFactory');

var FirstLevelPanelsList = React.createClass({
    getDefaultProps: function () {
        return {
            panels: DataFactory.SAUSAGE_ITEMS,

            onPanelClick: function(panel){

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
            width: 765,
            margin: '0 auto',
            marginTop: 30
        }
    },

    onPanelClick: function(panel){
        console.log('panel clicked');
        this.props.onPanelClick(panel);
    },

    render: function () {
        var list = this.props.panels;
        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(panel, k){
                    var key = 'first_level_panel_' + k + '_' + panel.id;
                    var onPanelClick= this.onPanelClick.bind(this, panel);
                    return (
                        <FirstLevelPanelItem key={key} onPanelClick={onPanelClick}
                                             name={panel.name} avatar={panel.avatar} />
                    );
                }, this)}

            </div>
        );
    }

});

module.exports = FirstLevelPanelsList;