/**
 * Created by sabir on 30.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var MaterialDialog = require('../material/dialogs/MaterialDialog');

var PatientPlayer = require('../player/PatientPlayer');

var MaterialLink = React.createClass({
    getDefaultProps: function () {
        return {
            materialId: undefined,
            name: undefined,

            style: {

            }
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        linkStyle: {
            textDecoration: 'underline',
            display: 'inline-block',
            cursor: 'pointer'
        }
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    show: function(){
        this.setState({
            dialogVisible: true
        });
    },


    render: function () {
        var st = assign({}, this.props.linkStyle);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.linkStyle} onClick={this.show} >
                   {this.props.name}
               </div>


                {this.state.dialogVisible == false ? null :
                    <MaterialDialog visible={true}  editMode={false}
                        materialId={this.props.materialId} onClose={this.onClose} />
                }

            </div>
        );
    }

});

module.exports = MaterialLink;