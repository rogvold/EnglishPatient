/**
 * Created by sabir on 17.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var FirstLevelPanelsList = require('./FirstLevelPanelsList');

var SausageDialog = require('./dialog/SausageDialog');

var Sausage = React.createClass({
    getDefaultProps: function () {
        return {
            textBlockEnabled: false
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false,
            selectedPanel: {}
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            marginTop: 40
        },

        headerPlaceholder: {
            width: 765,
            margin: '0 auto',
            marginTop: 15,
            marginBottom: 15
        },

        headerBlock: {
            padding: 10,
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            marginRight: 15
        }
    },

    onPanelClick: function(panel){
        this.setState({
            dialogVisible: true,
            selectedPanel: panel
        });
    },

    onDialogClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    render: function () {
        var panel = this.state.selectedPanel;
        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.headerPlaceholder}>

                    {this.props.textBlockEnabled == false ? null :
                        <div style={this.componentStyle.headerBlock}>

                            <div style={{fontWeight: 'bold', fontSize: '16px'}} >
                                Under construction
                            </div>

                            <div>
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris
                            </div>

                        </div>
                    }



                </div>


                <FirstLevelPanelsList onPanelClick={this.onPanelClick} />

                {this.state.dialogVisible == false ? null :
                    <div>
                        <SausageDialog
                            name={panel.name}
                            description={panel.description}
                            avatar={panel.avatar}
                            items={panel.items}
                            onClose={this.onDialogClose} />
                    </div>
                }



            </div>
        );
    }

});

module.exports = Sausage;