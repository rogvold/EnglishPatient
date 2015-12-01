/**
 * Created by sabir on 01.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var KaraokeMixin = require('../../mixins/KaraokeMixin');

var KaraokeCardsList = require('./KaraokeCardsList');

var SelfLoadingCategoryKaraokeCardsList = React.createClass({
    getDefaultProps: function () {
        return {
            categoryName: undefined
        }
    },

    getInitialState: function () {
        return {
            materials: [],
            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var name = nextProps.categoryName;
        if (name == undefined){
            return;
        }
        this.load(name, function(data){
            console.log('data loaded: ', data);
        });
    },

    componentDidMount: function () {
        var name = this.props.categoryName;
        if (name == undefined){
            return;
        }
        this.load(name, function(data){
            console.log('data loaded: ', data);
        });
    },

    componentStyle: {
        placeholder: {

        },

        contentPlaceholder: {

        }
    },

    load: function(catName){
        this.setState({
            loading: true
        });
        KaraokeMixin.loadGrouppedKaraokesByCategoryName(catName, function(data){
            this.setState({
                loading: false,
                materials: data
            });
        }.bind(this))
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.contentPlaceholder}>
                    <KaraokeCardsList materials={this.state.materials} />
                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>


            </div>
        );
    }

});

module.exports = SelfLoadingCategoryKaraokeCardsList;