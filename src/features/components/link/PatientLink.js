/**
 * Created by sabir on 30.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var NoteLink = require('./NoteLink');
var MaterialLink = require('./MaterialLink');

var LinkMixin = require('../../mixins/LinkMixin');

var PatientLink = React.createClass({
    getDefaultProps: function () {
        return {
            linkText: undefined
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
            display: 'inline-block'
        },

        linkStyle: {
            display: 'inline-block'
        }
    },

    getParsedData: function(){
        return LinkMixin.parseLink(this.props.linkText);
    },

    getLink: function(){
        var data = this.getParsedData();

        console.log('PatientLink: getLink: fata = ', data);

        if (data.linkType == 'material'){
            return (
                <MaterialLink name={data.name} materialId={data.content} />
            );
        }

        if (data.linkType == 'note'){
            return (
                <NoteLink name={data.name} noteId={data.content} />
            );
        }

        return null;

    },

    render: function () {
        var link = this.getLink();
        return (
            <div style={this.componentStyle.placeholder}>

                {link == undefined ? null :
                    <div style={this.componentStyle.linkStyle}>
                        {link}
                    </div>
                }

            </div>
        );
    }

});

module.exports = PatientLink;