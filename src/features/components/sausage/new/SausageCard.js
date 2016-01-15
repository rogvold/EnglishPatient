/**
 * Created by sabir on 10.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var DialogCard = require('../../dialog_exercise/card/DialogCard');

var Dialog = require('../../dialog/Dialog');

var PatientPlayer = require('../../player/PatientPlayer');

var SelfLoadingUpdatableFeed = require('../../feed/SelfLoadingUpdatableFeed');

var SignUpNowBlock = require('../../front/SignUpNowBlock');

var SausageCard = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            description: undefined,
            vimeoId: undefined,
            feedId: undefined,

            backgroundImg: undefined,

            joinUsText: 'Зарегистрируйтесь сейчас!',

            style: {
                width: 300,
                height: 200,
                margin: 5
            }
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false,
            currentTab: 'info'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            display: 'inline-block',
            cursor: 'pointer'
        },

        cardPlaceholder: {
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
        },

        dialogPanelStyle: {
            width: 800,
            fontWeight: 'normal'
        },

        videoPlaceholder: {
            width: '100%',
            height: 450
        },

        contentPlaceholder: {
            padding: 10,
            paddingTop: 0
        },

        description: {
            fontSize: 16,
            textAlign: 'justify',
            paddingTop: 20
        },

        tabsPlaceholder: {
            textAlign: 'center',
            borderTop: '1px solid #EFF0F1',
            display: 'none'
        },

        tabItem: {
            marginLeft: 10,
            marginRight: 10,
            cursor: 'pointer',
            padding: 5,
            display: 'inline-block'
        },

        active: {
            borderBottom: '3px solid #FC636B'
        },

        bodyPlaceholder: {

        }

    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    show: function(){
        this.setState({
            dialogVisible: true
        });
    },

    switchTab: function(tabName){
        this.setState({
            currentTab: tabName
        });
    },

    getDialogContent: function(){
        var tab = this.state.currentTab;

        return (
            <div>
                <div style={this.componentStyle.videoPlaceholder}>
                    <PatientPlayer vimeoId={this.props.vimeoId} />
                </div>

                <div style={this.componentStyle.contentPlaceholder}>

                    <div style={this.componentStyle.tabsPlaceholder}>

                        <div style={assign({}, this.componentStyle.tabItem, (tab == 'info') ? this.componentStyle.active : {})} onClick={this.switchTab.bind(this, 'info')} >
                            Информация
                        </div>

                        <div style={assign({}, this.componentStyle.tabItem, (tab == 'feed') ? this.componentStyle.active : {})} onClick={this.switchTab.bind(this, 'feed')} >
                            Примеры заданий
                        </div>

                    </div>

                    <div style={this.componentStyle.bodyPlaceholder}>

                            <div style={this.componentStyle.description}>
                                <div dangerouslySetInnerHTML={{__html: this.props.description}} ></div>
                            </div>

                            <SignUpNowBlock />

                            {this.props.feedId == undefined ? null :
                                <div>
                                    <SelfLoadingUpdatableFeed
                                        editMode={false} feedId={this.props.feedId} />
                                </div>
                            }

                    </div>

                </div>

            </div>
        );
    },

    render: function () {
        var cardSt = assign({}, this.componentStyle.cardPlaceholder, this.props.style);
        cardSt = assign({}, cardSt, {backgroundImage: 'url(\'' + this.props.backgroundImg + '\')'});

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={cardSt} onClick={this.show} >
                    <div style={{fontSize: 34, lineHeight: '32px', paddingTop: 80, color: 'white', textAlign: 'center'}} >
                        {this.props.name}
                    </div>
                </div>


                {this.state.dialogVisible == false ? null :
                    <Dialog
                        onClose={this.onClose} dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        visible={true} content={this.getDialogContent()} />
                }

            </div>
        );
    }

});

module.exports = SausageCard;