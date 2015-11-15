/**
 * Created by sabir on 10.10.15.
 */
var React = require('react');

var HeaderTemplate = React.createClass({
    getDefaultProps: function () {
        return {
            rightBlock: undefined,
            leftBlock: undefined
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
            width: '100%',
            paddingLeft: 5,
            paddingRight: 5,
            display: 'inline-block',
            height: '100%'
        },

        leftBlock: {
            height: '100%',
            float: 'left',
            display: 'inline-block'
        },

        rightBlock: {
            height: '100%',
            float: 'right',
            display: 'inline-block'
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                {this.props.leftBlock == undefined ? <span>no left block</span> :
                    <div style={this.componentStyle.leftBlock}>
                        {this.props.leftBlock}
                    </div>
                }


                {this.props.rightBlock == undefined ? <span>no right block</span> :
                    <div style={this.componentStyle.rightBlock}>
                        {this.props.rightBlock}
                    </div>
                }

            </div>
        );
    }

});

module.exports = HeaderTemplate;