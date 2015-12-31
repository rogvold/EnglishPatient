/**
 * Created by sabir on 30.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var StarItem = require('./StarItem');

var StarRating = React.createClass({
    getDefaultProps: function () {
        return {
            maxRating: 5,
            rating: 0,
            editable: true,

            onChange: function(rating){
                console.log('StarRating: default: rating = ', rating);
            }
        }
    },

    getInitialState: function () {
        return {
            rating: this.props.rating
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var rating = nextProps.rating;
        //if (this.props.rating != rating){
        //    this.setState({
        //        rating: rating
        //    });
        //}
        this.setState({
            rating: rating
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        }
    },

    getStarsList: function(){
        var arr = [];
        var n = this.props.maxRating;
        var rating = (this.state.rating == undefined) ? null : this.state.rating;
        for (var i=0; i < n; i++){
            arr.push({
                active: false,
                number: i
            });
        }
        for (var i in arr){
            if (i < rating){
                arr[i].active = true;
            }
        }
        return arr;
    },

    onStarClick: function(star){
        if (this.props.editable == false){
            return;
        }
        var rating = +star.number + 1;
        if (rating == 1 && this.state.rating == 1){
            rating = 0;
        }
        this.setState({
            rating: rating
        });
        this.props.onChange(rating);
    },

    render: function () {
        var list = this.getStarsList();
        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(star, k){
                    var key = '_star_' + k;
                    var onClick = this.onStarClick.bind(this, star);
                    return (
                        <StarItem key={key} active={star.active} onClick={onClick} />
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = StarRating;