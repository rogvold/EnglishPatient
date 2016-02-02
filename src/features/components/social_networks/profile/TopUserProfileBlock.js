/**
 * Created by sabir on 15.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var TopUserProfileBlock = React.createClass({
    getDefaultProps: function () {
        return {
            //avatar: 'https://www.englishpatientdrive.pw/dropzone/uploads/kbJGdXWAVH64c7OSuM7M.png',
            //avatar: 'https://pp.vk.me/c629310/v629310418/3582a/luBWVrId-hc.jpg',
            avatar: undefined,
            backgroundImage: 'http://www.unoosa.org/res/timeline/index_html/space-2.jpg',
            //name: 'Susanna Bekker'
            name: undefined
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
            height: 250,
            //paddingLeft: 10,
            //paddingTop: 50,
            backgroundColor: '#2E3C54',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            borderBottom: '1px solid #EFF0F1',
            position: 'relative',
            border: '1px solid #EFF0F1'
        },

        avatarPrePlaceholder: {
            width: 170,
            height: 170,
            position: 'absolute',
            bottom: 15,
            left: 15,
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            borderRadius: 2,
            padding: 5,
            zIndex: 2
        },

        avatarPlaceholder: {
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
        },

        bottomPanel: {
            position: 'absolute',
            width: '100%',
            bottom: 0,
            height: 45,
            borderTop: '1px solid #EFF0F1',
            backgroundColor: 'white',
            zIndex: 1,
            paddingLeft: 200
        },

        item: {
            borderLeft: '1px solid #EFF0F1',
            height: '100%',
            display: 'inline-block',
            verticalAlign: 'top'
        },

        namePlaceholder: {
            bottom: 60,
            left: 200,
            position: 'absolute',
            fontSize: 24,
            color: 'white'
        }

    },

    render: function () {
        var avaSt = assign({}, this.componentStyle.avatarPlaceholder,
            {backgroundImage: 'url(\'' + this.props.avatar + '\')'});
        var st = assign({}, this.componentStyle.placeholder,
            {backgroundImage: 'url(\'' + this.props.backgroundImage + '\')'});

        return (
            <div style={st}>

                <div style={this.componentStyle.avatarPrePlaceholder}>
                    <div style={avaSt}></div>
                </div>

                <div style={this.componentStyle.namePlaceholder}>
                    {this.props.name}
                </div>

                <div style={this.componentStyle.bottomPanel}>

                    <div style={this.componentStyle.item}>

                    </div>

                </div>



            </div>
        );
    }

});

module.exports = TopUserProfileBlock;