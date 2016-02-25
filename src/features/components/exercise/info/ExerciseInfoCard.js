/**
 * Created by sabir on 16.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var moment = require('moment');

var ExerciseInfoCard = React.createClass({
    getDefaultProps: function () {
        return {
            //avatar: 'https://pp.vk.me/c617325/v617325418/dc93/YLNa2tw9a_A.jpg',
            avatar: 'http://www.unoosa.org/res/timeline/index_html/space-2.jpg',
            //name: 'Susanna Bekker',
            name: 'Без названия',
            //description: 'veritatis et quasi architecto beatae  uam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure r',
            description: undefined,
            task: undefined,

            timestamp: undefined,
            //task: 'veritatis et quasi architecto beatae  uam est, qui dolorem ipsum quia dolor sit amet,',
            //access: 'private'
            access: undefined
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
            width: '100%',
            height: '100%'
            //borderLeft: '1px solid #EFF0F1',
            //borderRight: '1px solid #EFF0F1'
        },

        avatarPlaceholder: {
            minHeight: 200,
            width: '100%',
            borderBottom: '1px solid #EFF0F1',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            borderTopLeftRadius: '3px',
            borderTopRightRadius: '3px'
        },

        avatarOverlay: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            opacity: 0.7,
            backgroundColor: '#2E3C54',
            borderTopLeftRadius: '3px',
            borderTopRightRadius: '3px'
        },

        avatarPanel: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            padding: 5
        },

        namePlaceholder: {
            position: 'absolute',
            bottom: 5,
            left: 5,
            color: 'white',
            fontSize: '18px',
            maxWidth: '98%'
        },

        descriptionPlaceholder: {
            padding: 5,
            paddingTop: 10,
            width: '100%',
            fontSize: 14
        },

        label: {
            color: '#2E3C54',
            fontWeight: 'bold',
            fontSize: '14px'
        },

        accessPlaceholder: {

        }
    },

    render: function () {
        var avaSt = assign(this.componentStyle.avatarPlaceholder,  {backgroundImage: 'url(\'' + this.props.avatar + '\')'});
        var sDate = moment(this.props.timestamp).format('DD.MM.YYYY HH:mm');

        return (
            <div style={this.componentStyle.placeholder} className={'ui card'} >

                <div style={avaSt}>
                    <div style={this.componentStyle.avatarOverlay} ></div>

                    <div style={this.componentStyle.avatarPanel} >
                        <div style={this.componentStyle.namePlaceholder}>
                            {this.props.name}
                        </div>
                    </div>

                </div>

                <div style={this.componentStyle.infoPlaceholder} >

                    {this.props.description == undefined || this.props.description == '' ? null :
                        <div style={this.componentStyle.descriptionPlaceholder}>
                            <div style={this.componentStyle.label} >
                                Описание
                            </div>
                            <div>
                                {this.props.description}
                            </div>

                            <div style={this.componentStyle.label} >
                                Дата создания
                            </div>
                            <div>
                                {sDate}
                            </div>
                        </div>
                    }

                    {this.props.task == undefined || this.props.task == '' ? null :
                        <div style={this.componentStyle.descriptionPlaceholder}>
                            <div style={this.componentStyle.label} >
                                Задание
                            </div>
                            <div>
                                {this.props.task}
                            </div>
                        </div>
                    }

                    {this.props.access == undefined || this.props.access == '' ? null :
                        <div style={this.componentStyle.descriptionPlaceholder}>
                            <div style={this.componentStyle.label} >
                                Доступ
                            </div>
                            <div>
                                {this.props.access == 'private' ?
                                    <span>Приватный (доступ только Вам)</span>
                                    : null}
                                {this.props.access == 'public' ?
                                    <span>Публичный (доступ всем преподавателям)</span>
                                    : null
                                }

                            </div>
                        </div>
                    }

                </div>



            </div>
        );
    }

});

module.exports = ExerciseInfoCard;