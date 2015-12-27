/**
 * Created by sabir on 27.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var MaterialsMixin = require('../../../mixins/MaterialsMixin');

var PatientPlayer = require('../../player/PatientPlayer');

var MosesTimePanel = require('./adjust/MosesTimePanel');

var SelfLoadingMosesEditor = React.createClass({
    getDefaultProps: function () {
        return {
            materialId: undefined,

            onUpdated: function(m){

            }
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            durations: [],
            needToSave: false,
            vimeoId: undefined,
            seconds: undefined,
            selectedNumber: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    load: function(){
        var materialId = this.props.materialId;
        if (materialId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        console.log('SelfLoadingMosesEditor: mterialId = ', materialId);
        MaterialsMixin.loadMaterial(materialId, function(m){
            console.log('material loaded: m = ', m);
            var durations = m.mosesDurations;
            this.setState({
                vimeoId: m.vimeoId,
                durations: durations,
                needToSave: false,
                loading: false
            });

        }.bind(this));

    },

    componentStyle: {
        placeholder: {
            width: 710,
            backgroundColor: 'white',
            margin: '0 auto',
            padding: 5,
            minHeight: 120,
            position: 'relative'
        },

        playerPlaceholder: {
            width: 700,
            height: 450,
            margin: '0 auto'
        },

        durationsPlaceholder: {

        },

        bottomButtonsPlaceholder: {
            padding: 5,
            textAlign: 'center'
        },

        saveButtonPlaceholder: {
            marginTop: 10,
            paddingTop: 10,
            paddingBottom: 5,
            borderTop: '1px dotted #EFF0F1',
            textAlign: 'right'
        },

        currentSecondsPlaceholder: {
            backgroundColor: 'white',
            position: 'absolute',
            top: 0,
            left: 0,
            padding: 10,
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            borderBottomRightRadius: 4
        }
    },

    onDurChange: function(n, data){
        var arr = [];
        var list = this.state.durations;
        for (var i in list){
            var d = list[i];
            if (i == n){
                d.start = data.start;
                d.end = data.end;
                d.text = data.text;
                arr.push(d);
            } else{
                arr.push(d);
            }
        }
        this.setState({
            durations: arr,
            needToSave: true
        });
    },

    getSelectedDuration: function(){
        var n = this.state.selectedNumber;
        if (n == undefined){
            return undefined;
        }
        var list = this.state.durations;
        if (list == undefined || list.length == 0){
            return;
        }
        return list[n];
    },

    getStart: function(){
        var d = this.getSelectedDuration();
        if (d == undefined){
            return undefined;
        }
        return d.start;
    },

    getEnd: function(){
        var d = this.getSelectedDuration();
        if (d == undefined){
            return undefined;
        }
        return d.end;
    },

    onPanelSelect: function(n){
        if (n == this.state.selectedNumber){
            return;
        }
        this.setState({
            selectedNumber: n
        });
    },

    canAddMoreDuration: function(){
        var list = this.state.durations;
        var f = true;
        if (list == undefined || list.length == 0){
            return true;
        }
        for (var i in list){
            if (list[i].start == undefined || list[i].end == undefined || list[i].start == list[i].end){
                f = false;
            }
        }
        return f;
    },

    addDuration: function(){
        var list = (this.state.durations == undefined) ? [] : this.state.durations;
        if (this.canAddMoreDuration() == false){
            return;
        }
        list.push({
            start: 0,
            end: 0,
            text: undefined
        });
        this.setState({
            durations: list,
            needToSave: true
        });
    },

    canDeleteLastDuration: function(){
        var list = (this.state.durations == undefined) ? [] : this.state.durations;
        if (list.length == 0){
            return false;
        }
        return true;
    },

    deleteLastDuration: function(){
        var list = (this.state.durations == undefined) ? [] : this.state.durations;
        if (this.canDeleteLastDuration() == false){
            return;
        }
        list = list.slice(0, list.length - 1);
        this.setState({
            durations: list,
            needToSave: true,
            selectedNumber: undefined
        });
    },

    save: function(){
        var list = this.state.durations;
        var materialId = this.props.materialId;
        var arr = [];
        for (var i in list){
            var d = list[i];
            if (d.start == undefined || d.end == undefined || d.start == d.end){
                continue;
            }
            arr.push(d);
        }
        this.setState({
            loading: true
        });
        MaterialsMixin.updateMosesDurations(materialId, arr, function(m){
            this.setState({
                loading: false,
                durations: m.mosesDurations,
                needToSave: false,
                selectedNumber: undefined
            });
            this.props.onUpdated(m);
        }.bind(this))

    },

    canSave: function(){
        return this.state.needToSave;
    },

    onProgress: function(seconds){
        this.setState({
            seconds: seconds
        });
    },

    render: function () {
        var list = this.state.durations;
        var start = this.getStart();
        var end = this.getEnd();
        var vimeoId = this.state.vimeoId;
        var canAddMoreDuration = this.canAddMoreDuration();
        var canDeleteLastDuration = this.canDeleteLastDuration();
        var canSave = this.canSave();
        var seconds = this.state.seconds;
        if (seconds != undefined){
            seconds = Math.floor(100.0 * seconds) / 100.0;
        }

        return (
            <div style={this.componentStyle.placeholder}>

                {seconds == undefined ? null :
                    <div style={this.componentStyle.currentSecondsPlaceholder}>
                        <i className={'icon wait'} ></i>
                        {seconds}
                    </div>
                }


                {vimeoId == undefined ? null :
                    <div style={this.componentStyle.playerPlaceholder}>
                        <PatientPlayer onProgress={this.onProgress}
                            abMode={true} vimeoId={vimeoId} start={start} end={end} />
                    </div>
                }

                {list == undefined ? null :
                    <div style={this.componentStyle.durationsPlaceholder}>
                        {list.map(function(dur, k){
                            var key = 'dur_' + k;
                            var onClick = this.onPanelSelect.bind(this, k);
                            var onChange = this.onDurChange.bind(this, k);
                            var isActive = (k == this.state.selectedNumber);
                            return (
                                <div key={key} onClick={onClick} style={{marginTop: 5}} >
                                    <MosesTimePanel active={isActive}
                                        onChange={onChange} start={dur.start} end={dur.end} text={dur.text} />
                                </div>
                            );
                        }, this)}
                    </div>
                }


                    <div style={this.componentStyle.bottomButtonsPlaceholder}>

                        {canDeleteLastDuration == false ? null :
                            <button className={'ui basic red button'} onClick={this.deleteLastDuration} >
                                <i className={'icon close'}></i> Удалить последний временной отрезок
                            </button>
                        }

                        {canAddMoreDuration == false ? null :
                            <button className={'ui basic green button'} onClick={this.addDuration}>
                                <i className={'icon plus'}></i> Добавить новый временной отрезок
                            </button>
                        }

                    </div>

                    <div style={this.componentStyle.saveButtonPlaceholder}>
                        <button className={'ui primary button'} disabled={!canSave} onClick={this.save} >
                            <i className={'icon save'} ></i> Сохранить
                        </button>
                    </div>



                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate loader"></div>
                </div>


            </div>
        );
    }

});

module.exports = SelfLoadingMosesEditor;