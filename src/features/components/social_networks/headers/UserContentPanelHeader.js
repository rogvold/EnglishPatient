/**
 * Created by sabir on 18.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');
var CommonMixin = require('../../../../react/mixins/commonMixins/CommonMixin');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var UserContentHeaderPanel = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function () {
        return {
            userId: undefined,

            name: undefined,
            //name: 'Susanna Bekker',
            avatar: undefined,
            //avatar: 'https://pp.vk.me/c629310/v629310418/3582a/luBWVrId-hc.jpg',
            description: undefined
        }
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        nameBlock: {
            padding: 0,
            width: '100%',
            marginBottom: 10
        },

        avaPlaceholder: {
            width: 40,
            height: 40,
            borderRadius: 5,
            display: 'inline-block',
            verticalAlign: 'top',
            cursor: 'pointer'
        },

        name: {
            display: 'inline-block',
            verticalAlign: 'top',
            paddingLeft: 8
        },

        date: {
            fontSize: 12,
            opacity: 0.6
        }
    },

    onAvaClick: function(){
        var userId = this.props.userId;
        var url = '/#/profile/' + userId;
        CommonMixin.forceTransitionTo(url);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <div style={this.componentStyle.nameBlock}>
                    <div style={this.componentStyle.avaPlaceholder} onClick={this.onAvaClick} >
                        <BackgroundImageContainer style={{borderRadius: 2}} image={this.props.avatar} />
                    </div>
                    <div style={this.componentStyle.name}>
                        <div style={{fontWeight: 'bold', color: '#2E3C54', fontSize: 14}} >
                            {this.props.name}
                        </div>
                        {this.props.description == undefined ? null :
                            <div style={this.componentStyle.date}>
                                {this.props.description}
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = UserContentHeaderPanel;