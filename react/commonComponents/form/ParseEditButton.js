/**
 * Created by sabir on 15.08.15.
 */
var React = require('react');
var ReactModalOverlay = require('../modal/ReactModalOverlay');
var ParseMixin = require('../../../mixins/common/ParseMixin');
var ParseEditForm = require('./ParseEditForm');
var assign = require('object-assign');

var ParseEditButton = React.createClass({
    mixins: [ParseMixin],
    getDefaultProps: function () {
        return {
            objectId: undefined,
            parseClassName: undefined,
            fields: [],
            name: 'Обновить',
            loadingName: 'загрузка...',
            icon: 'icon write',
            modalName: '',
            modalDescription: '',
            buttonClassName: 'ui button',
            buttonStyle: {
                cursor: 'pointer'
            },
            placeholderStyle: {

            }
        }
    },

    getInitialState: function () {
        return {
            parseObject: undefined,
            modalIsVisible: false,
            isLoading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    beforeUpdate: function(){
        this.setState({
            isLoading: true
        });
    },

    afterUpdate: function(o){
        this.setState({
            isLoading: false,
            parseObject: o,
            modalIsVisible: false
        });
    },

    onClick: function(){
        console.log('buttonClicked');
        var self = this;
        self.setState({
            modalIsVisible: false,
            isLoading: true
        });
        this.loadClassItem(this.props.parseClassName, this.props.objectId, function(o){
            self.setState({
                parseObject: o,
                modalIsVisible: true,
                isLoading: false
            });
        }, function(e){console.log('ParseEditButton: error = ', e);});
    },

    componentStyle: {
        placeholder: {

        },
        buttonPlaceholder:{

        }
    },

    render: function () {

        return (
            <div style={assign({}, this.componentStyle.placeholder, this.props.placeholderStyle)}>
                <div style={this.componentStyle.buttonPlaceholder}>
                    <div className={this.props.buttonClassName} style={assign({}, this.props.buttonStyle)} onClick={this.onClick} >
                        <i className={this.props.icon} ></i>
                        {this.state.isLoading ? this.props.loadingName : this.props.name }
                    </div>
                </div>
                <ReactModalOverlay isVisible={this.state.modalIsVisible}>
                    <ParseEditForm parseObject={this.state.parseObject} fields={this.props.fields} name={this.props.modalName} description={this.props.modalDescription} beforeUpdate={this.beforeUpdate} afterUpdate={this.afterUpdate} />
                </ReactModalOverlay>
            </div>
        );
    }

});

module.exports = ParseEditButton;