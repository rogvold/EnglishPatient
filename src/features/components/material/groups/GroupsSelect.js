/**
 * Created by sabir on 24.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var Select = require('react-select');

var GroupsSelect = React.createClass({
    getDefaultProps: function () {
        return {
            groups: [],
            selectedGroups: [], // list of ids
            onSelect: function(selectedIds){
                console.log('on default onSelect occured', selectedIds);
            }
        }
    },

    getInitialState: function () {
        var list = (this.props.selectedGroups == undefined) ? [] : this.props.selectedGroups;
        return {
            selectedGroups: list
        }
    },

    componentWillReceiveProps: function (np) {
        //var list = (np.selectedGroups == undefined) ? [] : np.selectedGroups.map(function(g){return g.value});
        this.setState({
            selectedGroups: np.selectedGroups
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        }
    },

    onChange: function(val, list){
        console.log('onChange occured = ', val, list);
        var arr = [];
        for (var i in list){
            if (list[i] != undefined && list[i].value != '' && list[i].value != 'undefined'){
                arr.push(list[i]);
            }
        }


        var res = arr;
        res = res.map(function(r){return r.value});
        this.setState({
            selectedGroups: res
        });

        console.log('INVOCKING this.props.onSelect: res = ', res);

        this.props.onSelect(res);
    },

    render: function () {
        console.log('GroupsSelect: render occured: this.props.groups = ', this.props.groups);


        var list = (this.props.groups == undefined) ? [] : this.props.groups;

        var options = list.map(function(g, n){
            return {
                value: g.id,
                label: g.name
            }
        });

        console.log('this.state.selectedGroups = ', this.state.selectedGroups);

        var selectedGroups = (options.length == 0) ? [] : this.state.selectedGroups;
        if (selectedGroups == undefined){
            selectedGroups = [];
        }

        var value = selectedGroups.join(',');
        if (value == ''){
            value = undefined;
        }
        console.log('rendering Select: options = ', options , ' value = ', value);


        return (
            <div style={this.componentStyle.placeholder}>
                {options == undefined || options.lenght == 0 ? null :
                    <Select

                        options={options}
                        onChange={this.onChange}
                        value={value}
                        values={selectedGroups}
                        multi={true}
                        delimiter={','}
                        />
                }

            </div>
        );
    }

});

module.exports = GroupsSelect;