/**
 * Created by sabir on 29.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var MaterialsMixin = require('../../../mixins/MaterialsMixin');
var MaterialsBunch = require('../../material/list/MaterialsBunch');

var MaterialCard = require('../../material/list/MaterialCard');

var MaterialsSearchPanel = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            topicId: undefined,
            selectedMaterialIds: [],
            multipleSelect: true,
            dialogLevel: 10,

            onSelect: function(selectedMaterialIds){

            }
        }
    },

    getInitialState: function () {
        return {
            query: '',
            loading: false,
            changed: false,
            groupsFactoryList: [],
            searchGroupsFactoryList: [],
            selectedMaterialIds: this.props.selectedMaterialIds
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var selectedMaterialIds = nextProps.selectedMaterialIds;
        if (selectedMaterialIds != undefined){
            this.setState({
                selectedMaterialIds: selectedMaterialIds
            });
        }
        this.load(nextProps.teacherId, function(groupsFactoryList){
            console.log('loaded: ', groupsFactoryList);
        });
    },

    componentDidMount: function () {
        var teacherId = this.props.teacherId;
        this.load(teacherId, function(groupsFactoryList){
            console.log('loaded: ', groupsFactoryList);
        });
    },

    componentStyle: {
        placeholder: {
            margin: '0 auto',
            width: 760,
            margin: '0 auto',
            backgroundColor: 'white',
            //borderLeft: '1px solid #EFF0F1',
            //borderRight: '1px solid #EFF0F1',
            paddingTop: 5
        },

        searchPlaceholder: {

        },

        searchResultsPlaceholder: {

        },

        leftPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 550,
            borderRight: '1px solid #EFF0F1'
        },


        rightPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            padding: 5,
            paddingBottom: 40,
            //width: 340
            //width: 240
            width: 200

        },

        bottomRightPlaceholder: {
            //borderTop: '1px solid #EFF0F1',
            padding: 5,
            paddingRight: 15,
            position: 'absolute',
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            textAlign: 'right'
            //width: 340

        },

        itemStyle: {
            width: 130,
            height: 90,
            fontSize: '11px',
            lineHeight: '12px',
            marginRight: 4
        },

        topPlaceholder: {

        },

        middlePlaceholder: {
            marginTop: 10
        },

        searchNumberPlaceholder: {
            padding: 5,
            borderBottom: '1px solid #EFF0F1'
        },

        noMaterialsPlaceholder: {
            padding: 5,
            fontSize: '11px',
            lineHeight: '15px'
        },

        selectButton: {

        },

        closePlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            lineHeight: '90px',
            fontSize: '40px',
            color: '#FC636B'
            //cursor: 'pointer'
        },

        selectedItem: {
            //borderBottom: '1px solid #EFF0F1'
        }
    },

    search: function(q){

        var qq = q.trim().toLowerCase();
        var l = MaterialsMixin.searchInGroupsFactoryList(this.state.groupsFactoryList, qq);
        this.setState({
            searchGroupsFactoryList: l,
            query: q
        });
    },

    load: function(teacherId, callback){
        if (teacherId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        MaterialsMixin.loadGroupsAndMaterials(teacherId, this.props.topicId, function(groupsFactoryList){
            this.setState({
                groupsFactoryList: groupsFactoryList,
                searchGroupsFactoryList: groupsFactoryList,
                loading: false
            });
            callback('groupsFactoryList loaded: ', groupsFactoryList);
        }.bind(this));
    },

    onMaterialClick: function(card){
        //alert();
        console.log('MaterialSearchPanel: onMaterialClick : card = ', card);
    },

    getSearchNumber: function(){
        var map = {};
        var gList = this.state.searchGroupsFactoryList;
        for (var i in gList){
            var materials = gList[i].materials;
            for (var j in materials){
                map[materials[j].id] = 1;
            }
        }
        var k = 0;
        for (var key in map){
            k++;
        }
        return k;
    },


    onItemRemove: function(itemId){
        var list = this.state.selectedMaterialIds;
        var arr = [];
        for (var i in list){
            if (list[i] == itemId){
                continue;
            }
            arr.push(list[i]);
        }
        this.setState({
            selectedMaterialIds: arr,
            changed: true
        });
    },

    getMaterial: function(materialId){
        var gList = this.state.groupsFactoryList;
        for (var i in gList){
            var materials = gList[i].materials;
            for (var j in materials){
                if (materials[j].id == materialId){
                    return materials[j];
                }
            }
        }
        return undefined;
    },

    getSelectedMaterials: function(){
        var arr = [];
        var list = (this.state.selectedMaterialIds ==undefined) ? [] : this.state.selectedMaterialIds;
        for (var i in list){
            arr.push(this.getMaterial(list[i]));
        }
        return arr;
    },

    getBunchesContent: function(){
        var list = this.state.searchGroupsFactoryList;
        var arr = [];
        for (var i in list){
            var materials = list[i].materials;
            if (materials == undefined || materials.length == 0){
                continue;
            }
            arr.push(list[i]);
        }
        list = arr;
        var c = list.map(function(g, k){
            var key = 'search_bunch_' + k + '_' + g.group.id;
            var group = g.group;


            return (
                <MaterialsBunch key={key} showDialogOnMaterialClick={false} hoverMode={true}
                                materials={g.materials} onMaterialClick={this.onMaterialClick}
                                groupId={group.id} teacherId={this.props.teacherId} name={group.name}
                                dialogLevel={this.props.dialogLevel}
                                description={group.description} editMode={false}
                                itemStyle={this.componentStyle.itemStyle} onSelect={this.onSearchItemSelect}
                    />
            );
        }, this);

        return (
            <div>{c}</div>
        );
    },

    onQueryChange: function(evt){
        var val = evt.target.value;
        console.log('searching: ', val);
        this.search(val);
    },

    onSearchItemSelect: function(card){
        console.log('onSearchItemSelect occured: card = ', card);
        var list = this.state.selectedMaterialIds;

        console.log('list = ', list);

        if (list.indexOf(card.id) == -1){
            list.push(card.id);
        }

        console.log('setting state: selectedMaterialIds: ', list);

        if (this.props.multipleSelect == false){
            this.setState({
                selectedMaterialIds: [card.id],
                changed: true
            });
        }else{
            this.setState({
                selectedMaterialIds: list,
                changed: true
            });
        }

        if (this.props.multipleSelect == false){
            this.props.onSelect([card]);
        }

    },

    onOk: function(){
        var data = this.state.selectedMaterialIds;
        this.props.onSelect(data);
    },

    render: function () {
        var leftStyle = assign({}, this.componentStyle.leftPlaceholder);
        var rightStyle = assign({}, this.componentStyle.leftPlaceholder);
        var searchNumber = this.getSearchNumber();

        var selectedMaterials = this.getSelectedMaterials();
        //console.log('rendering selectedMaterials: selectedMaterials = ', selectedMaterials);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.topPlaceholder}>

                    <div style={this.componentStyle.searchPlaceholder}>
                        <div className={'ui form'} >
                            <div className="field">
                                <input type="text" value={this.state.query} onChange={this.onQueryChange} placeholder="Введите поисковый запрос..." />
                            </div>
                        </div>
                    </div>

                </div>

                <div style={this.componentStyle.middlePlaceholder}>
                    <div style={this.componentStyle.leftPlaceholder}>

                        <div style={this.componentStyle.searchNumberPlaceholder}>
                            {searchNumber == 0 ?
                                <div>По данному запросу ничего не найдено</div>
                                :
                                <div>
                                    Результатов: <b>{searchNumber}</b>
                                </div>
                            }
                        </div>


                        <div style={this.componentStyle.searchResultsPlaceholder}>
                            {this.getBunchesContent()}
                        </div>

                    </div>

                    <div style={this.componentStyle.rightPlaceholder}>
                        {this.state.groupsFactoryList.length == 0 ? <div></div> :
                            <div>

                                {selectedMaterials.length == 0 ?
                                    <div style={this.componentStyle.noMaterialsPlaceholder} >

                                        Вы не выбрали ни одного видео-материала.
                                        Наведите курсор на найденный материал из списка слева и нажмите кнопку
                                        "<b>Выбрать</b>"

                                        <div style={{textAlign: 'center'}}>
                                            <img src="http://beta.englishpatient.org/img/selectMaterial.gif" />
                                        </div>

                                    </div> :
                                    <div>
                                        <span style={{fontSize: '14px'}} >
                                            Выбрано: <b>{selectedMaterials.length}</b>
                                        </span>
                                        <div>
                                            {selectedMaterials.map(function(material, k){
                                                var key = 'selected_material_' + material.id + '_' + k;
                                                var onItemRemove = this.onItemRemove.bind(this, material.id);
                                                return (
                                                    <div style={this.componentStyle.selectedItem} >
                                                        <MaterialCard key={key} name={material.name}
                                                                      avatar={material.avatar}
                                                                      materialId={material.id}
                                                                      style={this.componentStyle.itemStyle} />


                                                        <div style={this.componentStyle.closePlaceholder}>
                                                            <i onClick={onItemRemove} style={{cursor: 'pointer'}}
                                                                                      className={'icon remove'} ></i>
                                                        </div>

                                                    </div>
                                                );
                                            }, this)}
                                        </div>
                                    </div>
                                }

                            </div>}

                            {this.state.changed == false ? null :
                                <div style={this.componentStyle.bottomRightPlaceholder}>

                                    <button className={'ui primary button'} onClick={this.onOk} >
                                        <i className={'icon check'} ></i> ОК
                                    </button>

                                </div>
                            }

                    </div>

                </div>


                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = MaterialsSearchPanel;