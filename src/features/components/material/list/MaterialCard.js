/**
 * Created by sabir on 23.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var MaterialDialog = require('../dialogs/MaterialDialog');
var MaterialHoverPanel = require('./MaterialHoverPanel');

var MaterialCard = React.createClass({
    getDefaultProps: function () {
        return {
            avatar: 'http://beta.englishpatient.org/img/void.jpg',
            name: undefined,
            materialId: undefined,
            editMode: false,
            teacherId: undefined,
            allGroupsList: [],

            showDialogOnMaterialClick: true,

            onMaterialUpdated: function(data){

            },
            onMaterialDeleted: function(){

            },

            onMaterialClick: function(){

            },

            onSelect: function(){

            },

            style: {

            },

            dialogLevel: 10,

            hoverMode: false
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false,
            hover: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },


    componentStyle: {
        placeholder: {
            display: 'inline-block',
            cursor: 'pointer',
            marginRight: 5,
            height: 140,
            width: 210,
            border: '1px solid #EFF0F1',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            borderRadius: '8px',
            fontSize: '16px'
        },


        overlay: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            opacity: 0.7,
            backgroundColor: '#2E3C54',
            borderRadius: '8px'
        },

        overlayPanel: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            //zIndex: 2,
            padding: 5,
            borderRadius: '8px'
        },

        namePlaceholder: {
            position: 'absolute',
            bottom: 5,
            left: 5,
            color: 'white',
            maxWidth: '98%'
        },

        hoverOverlay: {
            zIndex: 3,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.95,
            backgroundColor: '#2E3C54',
            borderRadius: '8px'
        },

        hoverOverlayPanel: {
            zIndex: 4,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            padding: 5,
            borderRadius: '8px',
            color: 'white',
            display: 'table',
            textAlign: 'center'
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

    onMaterialUpdated: function(data){
        console.log('MaterialCard: onMaterialUpdated iccured: data = ', data);
        this.props.onMaterialUpdated(data);
    },

    onMaterialDeleted: function(){
        this.props.onMaterialDeleted();
        this.hideDialog();
    },

    onPanelClick: function(){
        if (this.props.showDialogOnMaterialClick == true){
            this.showDialog();
        }
        this.props.onMaterialClick();
    },

    onPlay: function(){
        this.showDialog();
    },


    onMouseOver: function(){
        if (this.state.hover == true){
            return;
        }
        //console.log('setting hover to TRUE');
        this.setState({
            hover: true
        });
    },

    onMouseLeave: function(){
        //console.log('setting hover to FALSE');
        this.setState({
            hover: false
        });
    },

    onSelect: function(materialId){
        this.props.onSelect(this.props.materialId);
    },

    render: function () {

        var st = assign({}, this.componentStyle.placeholder,  {backgroundImage: 'url(\'' + this.props.avatar + '\')'}, this.props.style);

        var name = (this.props.name == undefined) ? '' : this.props.name;
        var addS = (name.length > 90) ? ' ...' : '';
        name = name.substr(0, 90) + addS;
        var hoverContent = undefined;

        if (this.props.hoverMode == true){
            hoverContent = <MaterialHoverPanel onSelect={this.onSelect} onPlay={this.onPlay}
                                               materialId={this.props.materialId} />;
        }

        return (
            <div style={st} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} >


                    {( (this.state.hover == true) && (this.props.hoverMode == true)) ? null :
                        <div>
                            <div style={this.componentStyle.overlay}   >
                            </div>

                            <div style={this.componentStyle.overlayPanel} onClick={this.onPanelClick} >
                                <div style={this.componentStyle.namePlaceholder}>
                                    {name}
                                </div>
                            </div>
                        </div>
                    }



                    {this.state.dialogVisible == false ? null :
                        <MaterialDialog visible={this.state.dialogVisible} onClose={this.hideDialog}
                                        materialId={this.props.materialId} allGroupsList={this.props.allGroupsList}
                                        editMode={this.props.editMode} teacherId={this.props.teacherId}
                                        level={this.props.dialogLevel}
                                        onMaterialUpdated={this.onMaterialUpdated} onMaterialDeleted={this.onMaterialDeleted}
                            />
                    }



                {hoverContent == undefined ? null :
                    <div style={{display: (this.state.hover == true)? 'block' : 'none'}} >
                        <div>
                            <div style={this.componentStyle.hoverOverlay}></div>
                            <div style={this.componentStyle.hoverOverlayPanel}>
                                {hoverContent}
                            </div>
                        </div>
                    </div>
                }


            </div>
        );
    }

});

module.exports = MaterialCard;