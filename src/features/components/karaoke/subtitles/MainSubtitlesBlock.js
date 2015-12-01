/**
 * Created by sabir on 01.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var MainSubtitle = require('./MainSubtitle');

var MainSubtitlesBlock = React.createClass({
    getDefaultProps: function () {
        return {
            currentSubtitle: {
                current: undefined,
                prev: undefined,
                next: undefined
            }
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            textAlign: 'center',
            padding: 10
        },

        subBlock: {
            marginTop: 17,
            color: '#A1A4AA'
        },

        supBlock: {
            color: '#A1A4AA',
            marginTop: 15
        },

        mainBlock: {
            marginTop: 17
        }
    },

    render: function () {
        var current = this.props.currentSubtitle.current;
        var next = this.props.currentSubtitle.next;
        var prev = this.props.currentSubtitle.prev;

        return (
            <div style={this.componentStyle.placeholder} className={'mainSubtitlesBlock'} >

                {prev == undefined ? null :
                    <div style={this.componentStyle.supBlock}>
                        <MainSubtitle style={{fontSize: 24, lineHeight: '24px'}} text={prev.text} />
                    </div>
                }

                {current == undefined ? null :
                    <div style={this.componentStyle.mainBlock}>
                        <MainSubtitle style={{fontSize: 40, lineHeight: '40px'}} text={current.text} />
                    </div>
                }

                {next == undefined ? null :
                    <div style={this.componentStyle.subBlock}>
                        <MainSubtitle style={{fontSize: 24, lineHeight: '24px'}} text={next.text} />
                    </div>
                }

            </div>
        );
    }

});

module.exports = MainSubtitlesBlock;