/**
 * Created by sabir on 28.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var JunglesList = require('./JunglesList');

var PagedJunglesList = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            materials: [],
            pageSize: 10
        }
    },

    getInitialState: function () {
        return {
            visibleNumber: this.props.pageSize
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 820,
            margin: '0 auto'
            //backgroundColor: 'white'
        },

        listPlaceholder: {

        },

        morePlaceholder: {
            padding: 5,
            textAlign: 'center'
        }
    },

    getMaterials: function(){
        var n = this.state.visibleNumber;
        var list = this.props.materials;
        if (list == undefined || list.length == 0){
            return [];
        }
        return list.slice(0, n);
    },

    canAddMore: function(){
        var n = this.state.visibleNumber;
        var list = (this.props.materials == undefined) ? [] : this.props.materials;
        if (n >= list.length){
            return false;
        }
        return true;
    },

    loadMore: function(){
        var n = this.state.visibleNumber;
        n+= this.props.pageSize;
        this.setState({
            visibleNumber: n
        });
    },

    render: function () {
        var materials = this.getMaterials();
        var canAddMore = this.canAddMore();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>
                    <JunglesList
                        userId={this.props.userId}
                        materials={materials} />
                </div>


                {canAddMore == false ? null :
                    <div style={this.componentStyle.morePlaceholder}>
                        <button className={'ui basic button'} onClick={this.loadMore} >
                            Загрузить еще {this.props.pageSize}
                        </button>
                    </div>
                }


            </div>
        );
    }

});

module.exports = PagedJunglesList;