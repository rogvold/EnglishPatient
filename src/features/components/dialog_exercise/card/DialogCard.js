/**
 * Created by sabir on 17.12.15.
 */

var React = require('react');
var assign = require('object-assign');



var DialogCard = React.createClass({
    getDefaultProps: function () {
        return {
            avatar: 'http://www.unoosa.org/res/timeline/index_html/space-2.jpg',
            name: undefined,
            opacity: 0.7,
            style: {

            },

            mode: 'square',
            radius: 200,
            width: 120
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
            display: 'inline-block',
            //cursor: 'pointer',
            marginRight: 5,
            height: '100%',
            width: '100%',
            border: '1px solid #EFF0F1',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            borderRadius: '4px',
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
            borderRadius: '4px'
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
            borderRadius: '4px'
        },

        namePlaceholder: {
            position: 'absolute',
            bottom: 5,
            left: 5,
            color: 'white',
            maxWidth: '98%'
        },

        roundStyle: {
            borderRadius: 1000
        }
    },

    render: function () {
        var name = this.props.name;
        var st = assign({}, this.componentStyle.placeholder,
            {backgroundImage: 'url(\'' + this.props.avatar + '\')'}, this.props.style);
        if (this.props.mode == 'round'){
            st = assign({}, st, this.componentStyle.roundStyle, {width: this.props.width, height: this.props.width});
        }

        var overlayStyle = assign({}, this.componentStyle.overlay, {borderRadius: st.borderRadius, opacity: this.props.opacity});


        return (
            <div style={st} className={'dialogCard'} >
                <div style={overlayStyle} >
                </div>

                <div style={this.componentStyle.overlayPanel} onClick={this.onPanelClick} >
                    {name == undefined ? null :
                        <div style={this.componentStyle.namePlaceholder}>
                            {name}
                        </div>
                    }
                </div>
            </div>
        );
    }

});

module.exports = DialogCard;