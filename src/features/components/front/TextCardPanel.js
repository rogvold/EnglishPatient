/**
 * Created by sabir on 11.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var SausageCard = require('../sausage/new/SausageCard');

var DataMap = require('../../data/DataFactory').NEW_SAUSAGE_MAP;

var TextCardPanel = React.createClass({
    getDefaultProps: function () {
        return {

            cardName: undefined,

            image: undefined,

            text: undefined,
            name: undefined,

            textAlign: 'left'
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
            width: 900,
            margin: '0 auto',
            height: 220,
            padding: 10,
            marginTop: 30
        },

        imagePlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            textAlign: 'center',
            //fontSize: 30,
            width: '50%'
            //padding: 10
            //color: 'white'
        },

        textPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: '50%',
            fontSize: 30,
            padding: 10,
            lineHeight: '42px'
        },

        image: {
            paddingTop: 85,
            //fontSize: 36,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            width: 300,
            height: 200
        }
    },

    render: function () {

        var data = DataMap[this.props.cardName];
        var image = data.backgroundImg;
        var name = data.name;
        var description = data.description;
        var feedId = data.feedId;
        var vimeoId = data.vimeoId;

        return (
            <div style={this.componentStyle.placeholder}>

                {this.props.textAlign == 'left' ?
                    <div>

                        <div style={this.componentStyle.textPlaceholder}>
                            {this.props.text}
                        </div>

                        <div style={this.componentStyle.imagePlaceholder}>
                            <div style={assign({}, {float: 'right'})} >
                                <SausageCard
                                    feedId={feedId} vimeoId={vimeoId}
                                    description={description} backgroundImg={image} name={name}  />
                            </div>
                        </div>

                    </div> :

                    <div>

                        <div style={this.componentStyle.imagePlaceholder}>
                            <div style={assign({}, {float: 'left'})} >
                                <SausageCard
                                    feedId={feedId} vimeoId={vimeoId}
                                    description={description} backgroundImg={image} name={name}  />
                            </div>
                        </div>

                        <div style={this.componentStyle.textPlaceholder}>
                            {this.props.text}
                        </div>

                    </div>
                }

            </div>
        );
    }

});


module.exports = TextCardPanel;