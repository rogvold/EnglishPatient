/**
 * Created by sabir on 28.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var JungleMixin = require('../../../mixins/JungleMixin');

var PagedJunglesList = require('./PagedJunglesList');

var CreateJungleButton = require('../update/CreateJungleButton');

var SelfLoadingJunglesList = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            materials: []
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        var userId = this.props.userId;
        this.load(userId);
    },

    componentStyle: {
        placeholder: {

        },

        listPlaceholder: {

        },

        addNewButtonPlaceholder: {
            width: '100%',
            padding: 5,
            textAlign: 'right'
        }
    },

    load: function(userId){
        if (userId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        JungleMixin.loadUserJungleMaterials(userId, function(materials){
            this.setState({
                loading: false,
                materials: materials
            });
        }.bind(this))
    },

    onCreated: function(){
        var userId = this.props.userId;
        this.load(userId);
    },

    render: function () {
        var materials = this.state.materials;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.addNewButtonPlaceholder}>
                    <CreateJungleButton userId={this.props.userId} onCreated={this.onCreated} />
                </div>

                {materials.length == 0 ? null :
                    <div style={this.componentStyle.listPlaceholder}>
                        <PagedJunglesList
                            userId={this.props.userId}
                            materials={materials} />
                    </div>
                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingJunglesList;