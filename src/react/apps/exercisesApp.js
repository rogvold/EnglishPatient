/**
 * Created by sabir on 26.08.15.
 */
var React = require('react');
var Parse = require('parse').Parse;
var Fluxxor = require('fluxxor');
var assign = require('object-assign');

//stores
var AuditorExercisesStore = require('../stores/adminAuditor/AuditorExercisesStore');
var stores = {AuditorExercisesStore: new AuditorExercisesStore()};

//actions
var AdminAuditorActions = require('../actions/adminAuditor/AdminAuditorActions');
var actions = assign({}, AdminAuditorActions);

//mixins
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;
var ExerciseMixin = require('../mixins/ExerciseMixin');

//flux:
var flux = new Fluxxor.Flux(stores, actions);
flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);
    }
});

var ExercisesViewer = require('../components/adminAuditor/ExercisesViewer');

var AdminExercisesPageApp = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('AuditorExercisesStore'), ExerciseMixin],
    getDefaultProps: function () {
        return {}
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        return flux.store('AuditorExercisesStore').getState();
    },

    getInitialState: function () {
        return {
            isLoading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.getFlux().actions.loadAllExercises();
    },

    componentStyle: {
        placeholder: {
            padding: 10
        },
        topBlockPlaceholder: {
            padding: 10,
            marginBottom: 20
        }
    },

    onExerciseItemClicked: function(exId){
        this.getFlux().actions.exerciseClick(exId);
    },

    render: function () {
        var exList = this.state.exercises.map(function(ex){
            return {
                name: ex.get('name'),
                description: ex.get('description'),
                imgSrc: ex.get('imageUrl'),
                id: ex.id

            }
        });
        var self = this;
        var cards = this.state.selectedCards.map(function(card){
            var c = self.getMediaObjectFromCard(card);
            c.comment = card.get('comment');
            c.transcript = card.get('transcript');
            c.number = card.get('number');
            c.id = card.id;
            return c;
        });
        console.log('cards = ', cards);
        console.log('selected exercise = ', this.state.selectedExercise);

        return (
            <div style={this.componentStyle.placeholder}>
                <div style={this.componentStyle.topBlockPlaceholder}>
                    <h2 style={{textAlign: 'center'}}>
                        Это страница просмотра всех "аудиторных" упражнений
                    </h2>
                    <p>
                    </p>

                </div>

                <ExercisesViewer selectedExercise={this.state.selectedExercise} cards={cards} onExerciseItemClicked={this.onExerciseItemClicked} exercises={exList} />
            </div>
        );
    }

});

React.render(
    <AdminExercisesPageApp flux={flux} />,
    document.getElementById('main')
);