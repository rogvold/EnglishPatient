/**
 * Created by sabir on 08.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var ArchiveClassButton = React.createClass({
    getDefaultProps: function () {
        return {
            status: 'active',
            onStatusChange: function(status){

            }
        }
    },

    getInitialState: function () {
        return {
            status: this.props.status
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onStatusChange: function(){
        if (this.state.status == 'active'){
            this.setState({
                status: 'archived'
            });
            this.props.onStatusChange('archived');
        }else{
            this.setState({
                status: 'active'
            });
            this.props.onStatusChange('active');
        }
    },

    componentStyle: {
        placeholder: {

        },

        link:{
            textDecoration: 'underline',
            cursor: 'pointer',
            marginLeft: 15,
            opacity: 0.8,
            cursor: 'pointer',
            fontStyle: 'italic',
            float: 'right'
        }
    },



    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                {this.state.status == 'archived' ?
                    <div>
                        <i className={'archive icon'} ></i> Класс нахоится в архиве.
                        <span onClick={this.onStatusChange} style={this.componentStyle.link} >
                            Достать из архива
                        </span>
                    </div>
                    :
                    <div>
                        <i className={'icon lightning'} ></i> Класс активен.
                        <span onClick={this.onStatusChange} style={this.componentStyle.link} >
                            Положить в архив
                        </span>
                    </div>
                }

            </div>
        );
    }

});

module.exports = ArchiveClassButton;