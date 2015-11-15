/**
 * Created by sabir on 30.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var MaterialDialog = require('../dialogs/MaterialDialog');

var MaterialHoverPanel = React.createClass({
    getDefaultProps: function () {
        return {
            materialId: undefined,
            selectMode: true,
            playMode: true,

            selectButtonClassName: 'ui  button inverted tiny',
            selectButtonName: 'Выбрать',
            selectButtonIcon: 'icon check circle outline',

            playButtonClassName: 'ui button inverted tiny',
            playButtonName: 'Посмотреть',
            playButtonIcon: 'icon video play outline',

            onSelect: function(){

            },

            onPlay: function(){

            }

        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    showDialog: function(){
        this.setState({
            dialogVisible: true
        });
    },


    hideDialog: function(){
        this.setState({
            dialogVisible: false
        });
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            textAlign: 'center',
            display: 'table',
            height: '100%'
        },

        buttonsPlaceholder: {
            display: 'table-cell',
            verticalAlign: 'middle'
        },

        button:{
            marginBottom: 5,
            width: 120,
            padding: 10
        }
    },

    onSelect: function(){
        this.props.onSelect(this.props.materialId);
    },

    onPlay: function(){
        this.props.onPlay(this.props.materialId);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.buttonsPlaceholder}>


                    {this.props.playMode == false ? null :
                        <button className={this.props.playButtonClassName}  style={this.componentStyle.button}
                                onClick={this.onPlay} >
                            <i className={this.props.playButtonIcon} ></i>
                            {this.props.playButtonName}
                        </button>
                    }


                    {this.props.selectMode == false ? null :
                        <button className={this.props.selectButtonClassName}
                                onClick={this.props.onSelect} style={this.componentStyle.button} >
                            <i className={this.props.selectButtonIcon} ></i>
                            {this.props.selectButtonName}
                        </button>
                    }

                </div>


                {this.state.dialogVisible == false ? null :
                    <MaterialDialog materialId={this.props.materialId} visible={this.state.dialogVisible}
                                    onClose={this.hideDialog} level={1000}
                        />
                }

            </div>
        );
    }

});

module.exports = MaterialHoverPanel;