/**
 * Created by sabir on 25.01.16.
 */
var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TestComponent = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('MaterialsStore')],

    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('MaterialsStore');
        return store.getState();
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        }
    },

    playSound: function(){
        var flux = this.getFlux();
        flux.actions.playSound('http://loudlinks.rocks/sounds/mp3/cat-meow.mp3');
    },

    render: function(){
        var materialsLoading = this.state.materialsLoading;
        var groupsFactoryList = this.state.groupsFactoryList;
        console.log('groupsFactoryList = ', groupsFactoryList);

        return (
            <div>

                {materialsLoading == false ? null :
                    <div>
                        materials are loading...
                    </div>
                }

                <button onClick={this.playSound} >
                    play sound
                </button>

            </div>

        );
    }

});

module.exports = TestComponent;