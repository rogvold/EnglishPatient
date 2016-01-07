/**
 * Created by sabir on 06.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var ArticleItem = require('./ArticleItem');

var Dialog = require('../dialog/Dialog');

var SelfLoadingArticlePanel = require('./SelfLoadingArticlePanel');

var ArticlesList = React.createClass({
    getDefaultProps: function () {
        return {
            articles: []
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false,
            selectedArticle: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        listPlaceholder: {

        },

        item: {
            cursor: 'pointer',
            margin: 5,
            display: 'inline-block'
        },

        dialogPanelStyle: {
            width: 670,
            padding: 10
        }
    },

    onItemClick: function(a){
        this.setState({
            dialogVisible: true,
            selectedArticle: a
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false,
            selectedArticle: undefined
        });
    },

    getDialogContent: function(){
        var a = this.state.selectedArticle;
        return (
            <div>
                <SelfLoadingArticlePanel articleId={a.id} />
            </div>
        );
    },

    render: function () {

        var list = this.props.articles;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>
                    {list.map(function(a){
                        var key = 'article_' + a.id;
                        var onClick = this.onItemClick.bind(this, a);
                        return (
                            <div style={this.componentStyle.item} onClick={onClick} >
                                <ArticleItem name={a.name} avatar={a.avatar} />
                            </div>
                        );
                    }, this)}
                </div>

                {this.state.dialogVisible == false ? null :
                    <Dialog visible={true}
                            content={this.getDialogContent()} onClose={this.onClose}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle} />
                }


            </div>
        );
    }

});

module.exports = ArticlesList;