/**
 * Created by sabir on 09.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../dialog/Dialog');

var SelfLoadingUpdatableFeed = require('../feed/SelfLoadingUpdatableFeed');

var SignUpNowBlock = require('../front/SignUpNowBlock');

var PricingItem = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'Plan 1',
            price: 999,
            isPopular: false,
            options: [{
                text: 'до <b>5</b> учеников'
            }],
            description: undefined
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

    componentStyle: {
        placeholder: {
            display: 'inline-block',
            verticalAlign: 'top'
        },

        innerPlaceholder: {
            width: 220,
            height: 400,
            borderRadius: 6,
            verticalAlign: 'top',
            display: 'inline-block',
            margin: 5,
            backgroundColor: 'white',
            textAlign: 'center',
            cursor: 'pointer',
            position: 'relative',
            border: '1px solid #EFF0F1'
        },

        head: {
            fontSize: 22,
            paddingTop: 15,
            paddingBottom: 15
        },

        pricePanel: {
            fontSize: 16,
            color: 'white',
            backgroundColor: '#2E3C54',
            padding: 10
        },

        option: {
            padding: 10,
            color: '#2E3C54',
            fontSize: 16
        },

        buttonPlaceholder: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: 'center',
            padding: 10
        },

        popularHead: {
            color: 'white',
            borderRadius: 6,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: '#2E3C54'
        },

        popularPrice: {
            color: 'white',
            backgroundColor: '#F7814D'
        },

        headLink: {
            opacity: 0.6,
            fontSize: 12,
            marginTop: 10,
            cursor: 'pointer',
            textDecoration: 'underline'
        },

        dialogPanelStyle: {
            width: 800
        },

        dialogDescriptionPlaceholder: {
            padding: 20,
            borderBottom: '1px solid #EFF0F1',
            fontSize: 16
        },

        exampleContent: {

        },

        exampleFeeds: {

        },

        exampleItem: {
            padding: 10,
            fontSize: 16
        }

    },

    getDialogContent: function(){
        var examples = (this.props.examples == undefined) ? [] : this.props.examples;
        return (
            <div>
                <div style={this.componentStyle.dialogDescriptionPlaceholder}>
                    <div dangerouslySetInnerHTML={{__html: this.props.description}} ></div>
                </div>

                {examples.length == 0 ? null :
                    <div>
                        {examples.map(function(ex, k){
                            var key = 'ex_' + k;
                            var feeds = (ex.feedsList == undefined) ? [] : ex.feedsList;
                            return (
                                <div key={key} style={this.componentStyle.exampleItem} >
                                    <div style={this.componentStyle.exampleContent}>
                                        <div dangerouslySetInnerHTML={{__html: ex.content}} ></div>
                                    </div>


                                    {feeds.length == 0 ? null :
                                        <div style={this.componentStyle.exampleFeeds}>

                                            {feeds.map(function(feedId, j){
                                                var key2 = key + '_feed_' + j;
                                                return (
                                                    <div key={key2} >
                                                        <SelfLoadingUpdatableFeed
                                                            editMode={false}
                                                            feedId={feedId} />
                                                    </div>
                                                );
                                            } ,this)}

                                        </div>
                                    }

                                </div>
                            );

                        }, this)}
                    </div>
                }

                <SignUpNowBlock />

            </div>
        );
    },

    show: function(){
        var description = this.props.description;
        if (description == undefined){
            return;
        }
        this.setState({
            dialogVisible: true
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    render: function () {
        var options = this.props.options;

        var hs = assign({}, this.componentStyle.head);
        var ps = assign({}, this.componentStyle.pricePanel);

        if (this.props.isPopular == true){
            hs = assign({}, hs, this.componentStyle.popularHead);
            ps = assign({}, ps, this.componentStyle.popularPrice);
        }

        return (
            <div style={this.componentStyle.placeholder}  >

                <div style={this.componentStyle.innerPlaceholder} onClick={this.show} className={'PatientPricingItem'}  >
                    <div style={hs}>
                        <div>
                            {this.props.name}
                        </div>


                        <div style={this.componentStyle.headLink}>
                            подробнее
                        </div>

                    </div>

                    <div style={ps}>

                        <b style={{fontSize: 26}} >{this.props.price}</b>
                        <br/>
                        <span style={{opacity: 0.7}} > руб. / месяц</span>

                    </div>

                    {options.map(function(option, k){
                        var key = 'opt_' + k;
                        return (
                            <div style={this.componentStyle.option}>
                                <div dangerouslySetInnerHTML={{__html: option.text}} ></div>
                            </div>
                        );
                    }, this)}

                    <div style={this.componentStyle.buttonPlaceholder}>

                        <button className={'ui inverted fluid green button'} >
                            НАЧАТЬ
                        </button>

                    </div>
                </div>

                {this.state.dialogVisible == false ? null :
                    <Dialog
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        onClose={this.onClose}
                        content={this.getDialogContent()}
                        visible={true} />
                }

            </div>
        );
    }

});

module.exports = PricingItem;