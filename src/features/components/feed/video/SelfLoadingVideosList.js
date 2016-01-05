/**
 * Created by sabir on 27.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var CardsList = require('../../material/list/CardsList');

var MaterialsMixin = require('../../../mixins/MaterialsMixin');
var CommonMixin = require('../../../../react/mixins/commonMixins/CommonMixin');

var SelfLoadingVideosList = React.createClass({
    getDefaultProps: function () {
        return {
            materialIds: [],

            itemStyle: {
                width: 117,
                height: 78,
                fontSize: '11px',
                lineHeight: '12px',
                marginRight: 4
            }
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            materials: []
        }
    },

    componentWillReceiveProps: function (nextProps) {
        console.log('SelfLoadingVideosList: componentWillReceiveProps');
        var materialIds = nextProps.materialIds;
        if (materialIds == undefined){
            return;
        }
        var oldMaterialIds = this.props.materialIds;

        console.log('old / new ', oldMaterialIds, materialIds);
        //console.log('checking equilibrium');
        var eq = CommonMixin.arraysAreEqual(materialIds, this.props.materialIds, function(item1, item2){
                return (item1 == item2);
            });
        console.log('eq = ', eq);
        var needToLoad = this.needToLoad(materialIds);

        if (needToLoad == false){
            return;
        }

        this.load(materialIds, function(materials){
            console.log('loaded materials: ', materials);
        });
    },

    needToLoad: function(materialIds){


        console.log('!! ---->>>>> !!! -->> SelfLoadingVideosList: needToLoad: this.state.materials = ', this.state.materials);
        var arr = [];
        var list = this.state.materials;
        for (var i in list){
            if (list[i] == undefined){
                continue;
            }
            arr.push(list[i].id);
        }
        list = arr;

        //var list = this.state.materials.map(function(m){return m.id});

        var eq = CommonMixin.stringArraysAreMaplyEqual(materialIds, list);
        return !eq;
    },

    componentDidMount: function () {
        console.log('SelfLoadingVideosList: componentDidMount occured ');
        this.load(this.props.materialIds, function(materials){
            console.log('loaded materials: ', materials);
        });
    },

    load: function(list, callback){
        console.log('SelfLoadingVideosList: load occured: list = ', list);
        var self = this;
        if (list == undefined){
            list = [];
        }
        //var arr = [];
        //for (var i in list){
        //    if (list[i] == undefined){
        //        continue;
        //    }
        //    arr.push(list[i]);
        //}
        //list = arr;
        //console.log('list after filtration: ', list);
        this.setState({
            loading: true
        });
        MaterialsMixin.loadMaterialsByIds(list, function(arr){
            var arr2 = [];
            if (arr == undefined){
                arr = [];
            }
            for (var i in arr){
                if (arr[i] == undefined){
                    continue;
                }
                arr2.push(arr[i]);
            }

            self.setState({
                loading: false,
                materials: arr2
            });
            callback(arr);
        });
    },

    componentStyle: {
        placeholder: {
            width: '100%',
            backgroundColor: 'white',
            margin: '0 auto',
            minHeight: 80
        },

        materialsPlaceholder: {

        }
    },

    render: function () {

        console.log('rendering SelfLoadingVideosList: materials = ', this.state.materials);


        return (
            <div style={this.componentStyle.placeholder}>

                {this.state.materials.length == 0 ? null :
                    <div style={this.componentStyle.materialsPlaceholder}>
                        <CardsList itemStyle={this.props.itemStyle} cards={this.state.materials} />
                    </div>
                }


                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingVideosList;