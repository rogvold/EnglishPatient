/**
 * Created by sabir on 02.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var ToggledText = React.createClass({
    getDefaultProps: function () {
        return {
            text: undefined,
            showText: 'показать',
            hideText: 'скрыть',
            showHideLink: true,
            defaultVisibility: false,
            inlineToggler: false
        }
    },

    getInitialState: function () {
        return {
            visible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var vis = nextProps.defaultVisibility;
        if (vis == undefined){
            return;
        }
        if (vis != this.props.defaultVisibility){
            this.setState({
                visible: vis
            });
        }
    },

    componentDidMount: function () {

    },

    onClick: function(){
        var visible = this.state.visible;
        this.setState({
            visible: !visible
        });
    },

    componentStyle: {
        placeholder: {
            width: '100%',
            textAlign: 'center',
            marginBottom: 5
        },
        textPlaceholder: {

        },

        togglerPlaceholder: {
            textAlign: 'right'
        },

        toggler: {
            textDecoration: 'underline',
            color: 'grey',
            display: 'inline-block',
            cursor: 'pointer'
        },

        inline: {
            display: 'inline-block',
            textAlign: 'none'
        }

    },

    render: function () {
        var text = this.props.text;
        var togglerPlaceholderStyle= assign({}, this.componentStyle.togglerPlaceholder, (this.props.inlineToggler == true) ? this.componentStyle.inline : {});
        var togglerStyle= assign({}, this.componentStyle.toggler, (this.props.inlineToggler == true) ? this.componentStyle.inline : {});


        return (
            <div style={this.componentStyle.placeholder}>

                {(text == undefined || text == '') ? null :

                    <div>
                        <div style={this.componentStyle.textPlaceholder}>

                            {this.state.visible ? <div>{text}</div> : null}

                        </div>


                        <div style={togglerPlaceholderStyle}>
                            <div style={togglerStyle} onClick={this.onClick}>

                                {this.state.visible ?
                                    <span>{this.props.hideText}</span>
                                        :
                                        <span>
                                            {this.props.showHideLink ? <span>{this.props.showText}</span>: null}
                                        </span>
                                }

                            </div>
                        </div>
                    </div>
                }

            </div>
        );
    }

});

module.exports = ToggledText;