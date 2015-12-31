/**
 * Created by sabir on 29.12.15.
 */

var React = require('react');
var assign = require('object-assign');

//todo: add icon classNames

var LikeButton = React.createClass({
    getDefaultProps: function () {
        return {
            liked: false,
            loading: false,

            //likedClassName: 'icon thumbs up',
            likedClassName: 'icon star',
            //notLikedClassName: 'icon thumbs outline up',
            notLikedClassName: 'icon empty star',

            onLikeClick: function(){

            }
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
            cursor: 'pointer',
            lineHeight: '36px',
            fontSize: 28
        }
    },

    onLikeClick: function(){
        if (this.props.loading == true){
            return;
        }
        this.props.onLikeClick();
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder} onClick={this.onLikeClick} >

                {this.props.loading == true ?
                    <i className={'icon spinner'} ></i> :
                    <span>
                        {this.props.liked == true ?
                            <i className={this.props.likedClassName} ></i> :
                            <i className={this.props.notLikedClassName} ></i>
                        }
                    </span>
                }


            </div>
        );
    }

});

module.exports = LikeButton;