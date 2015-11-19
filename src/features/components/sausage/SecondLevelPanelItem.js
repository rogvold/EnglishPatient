/**
 * Created by sabir on 17.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var VideoDialog = require('../video/dialog/VideoDialog');


var SecondLevelPanelItem = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            description: undefined,
            vimeoId: undefined,
            content: undefined,

            additionalContent: undefined
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onDialogClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    onClick: function(){
        if (this.props.vimeoId == undefined){
            return;
        }
        this.setState({
            dialogVisible: true
        });
    },

    componentStyle: {
        placeholder: {

        },

        cardPlaceholder: {
            marginBottom: 15,
            cursor: 'pointer'
        }
    },

    //getDialogContent: function(){
    //    return (
    //
    //        <div>
    //
    //            {this.props.content}
    //
    //        </div>
    //
    //    );
    //},

    getAdditionalContent: function(){
        return (

            <div style={{fontSize: 20, lineHeight: '28px', color: 'grey', marginTop: 30, borderTop: '1px solid grey', textAlign: 'center'}}>


                <div>
                    UNDER CONSTRUCTION
                </div>

                <div>
                    тут будут примеры упражнений
                </div>


                <div>
                    <span  style={{color: 'red'}}>
                    *
                    </span>
                    видео скоро будет актуализировано
                </div>

            </div>

        );
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.cardPlaceholder} className={'ui message'} onClick={this.onClick} >
                    <div className={'header'}>
                        {this.props.name}
                    </div>

                    {this.props.description == undefined ? null :
                        <p>
                            {this.props.description}
                        </p>
                    }


                </div>

                {this.state.dialogVisible == false ? null :
                    <VideoDialog videoId={this.props.vimeoId}
                                 content={this.props.content}
                                 videoType={'vimeo'}
                                 additionalContent={this.getAdditionalContent()}
                                 onClose={this.onDialogClose}
                        />
                }


            </div>
        );
    }

});

module.exports = SecondLevelPanelItem;