/**
 * Created by sabir on 11.10.15.
 */
var React = require('react');
var assign = require('object-assign');
var Link = require('react-router').Link;

var LeftSidebarClassesList = React.createClass({
    getDefaultProps: function () {
        return {
            items: [
                {
                    name: 'First Class',
                    classId: '123'
                },
                {
                    name: 'Second Class',
                    classId: '456'
                }
            ],
            selectedClassId: undefined
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onClassItemClick: function(){

    },

    componentStyle: {
        placeholder: {
            width: '100%',
            //marginTop: 15
            marginTop: 5
        },

        classItem: {
            width: '100%',
            height: '30px',
            padding: 8,
            paddingLeft: '10px',
            fontSize: '14px',
            lineHeight: '16px',
            color: '#8897A3',
            paddingLeft: 10,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },

        selected: {
            backgroundColor: '#1B2432',
            color: 'white'
        },

        linkStyle: {
            color: '#8897A3'
        }

    },

    render: function () {
        var list = this.props.items;

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(item, n){
                    var name = item.name;
                    var key = 'left-sidebar-class-item-' + n;
                    var classId = item.classId;
                    var st = assign({}, this.componentStyle.classItem);
                    var stLink = assign({}, this.componentStyle.linkStyle);
                    var addCl = '';
                    var archived = (item.status == 'archived');
                    if (this.props.selectedClassId == classId){
                        st = assign(st, this.componentStyle.selected);
                        stLink = assign(stLink, this.componentStyle.selected);
                        addCl = ' selected ';
                    }

                    return (
                            <Link key={key} className={'leftSidebarClassLink'} style={stLink} to={'/class/' + classId} >
                                <div  className={'leftSidebarClassItem ' + addCl} style={st}>
                                    {archived == false ? null :
                                    <span><i className="icon archive" ></i></span>
                                    }
                                    {name}
                                </div>
                            </Link>
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = LeftSidebarClassesList;