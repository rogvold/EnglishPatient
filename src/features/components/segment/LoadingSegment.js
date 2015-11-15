/**
 * Created by sabir on 11.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var LoadingSegment = React.createClass({
    getDefaultProps: function () {
        return {
            loading: false,
            segmentClassName: 'ui segment',
            loadingText: 'Загрузка...',
            segmentStyle: {}
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
            width: '100%',
            minHeight: 200,
            borderRadius: 0,
            padding: 0
        },

        contentPlaceholder: {

        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.segmentStyle);
        return (
            <div style={st} className={this.props.segmentClassName} >

                {this.props.children == undefined ? null :
                    <div style={this.componentStyle.contentPlaceholder}>
                        {this.props.children}
                    </div>
                }
                    <div className={'ui inverted dimmer ' + (this.props.loading == true ? ' active ' : '' )}>
                        <div className="ui medium text loader">{this.props.loadingText}</div>
                    </div>

            </div>
        );
    }

});

module.exports = LoadingSegment;