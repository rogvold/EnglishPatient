/**
 * Created by sabir on 13.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var CommentItem = require('./CommentItem');

var CommentsList = React.createClass({
    getDefaultProps: function () {
        return {
            comments: [],
            objectId: '',
            visibleNumber: 5
        }
    },

    getInitialState: function () {
        return {
            showAll: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: '100%',
            backgroundColor: 'white',
            borderLeft: '1px solid #EFF0F1',
            borderRight: '1px solid #EFF0F1',
            borderTop: '1px solid #EFF0F1'
        },

        listPlaceholder: {

        },

        item: {
            padding: 5
        },

        showAllPlaceholder: {
            padding: 5,
            fontSize: 12,
            textDecoration: 'underline',
            cursor: 'pointer',
            textAlign: 'center'
        }

    },

    showAll: function(){
        this.setState({
            showAll: true
        });
    },

    showAllButtonVisible: function(){
        var n = this.props.comments.length;
        var k = this.props.visibleNumber;
        if (this.state.showAll == true){
            return false;
        }
        return (n > k);
    },

    render: function () {
        var list = this.props.comments;
        var showAllButtonVisible = this.showAllButtonVisible();
        if (this.state.showAll == false){
            if (this.props.comments.length > this.props.visibleNumber){
                list = list.slice(-this.props.visibleNumber);
            }
        }

        return (
            <div style={this.componentStyle.placeholder}>

                {showAllButtonVisible == false ? null :
                    <div style={this.componentStyle.showAllPlaceholder} onClick={this.showAll} >
                        показать все комментарии ({this.props.comments.length})
                    </div>
                }

                <div style={this.componentStyle.listPlaceholder} >

                    {list.map(function(item, k){
                        var key = 'comment_' + this.props.objectId + '_' + k;
                        var st = assign({}, this.componentStyle.item);
                        if (k > 0){
                            st = assign({}, st, {borderTop: '1px solid #EFF0F1'});
                        }
                        return (
                            <div style={st}>
                                <CommentItem content={item.content} timestamp={item.timestamp}
                                             userId={item.userId} attachments={item.attachments} />
                            </div>
                        );
                    }, this)}

                </div>

            </div>
        );
    }

});

module.exports = CommentsList;