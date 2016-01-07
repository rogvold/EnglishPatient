/**
 * Created by sabir on 18.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var VimeoPlayer = require('../../components/player/VimeoPlayer');

var MaterialLink = require('../../components/link/MaterialLink');



var TextImagePanel = React.createClass({
    getDefaultProps: function () {
        return {
            orientation: 'textLeft',
            content: undefined,
            //image: 'http://article.englishpatient.org/img/lirmak_blog.png',
            image: undefined,
            width: 900,
            //vimeoId: undefined
            //vimeoId: '146204986'
            vimeoId: '150484936'
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
            width: 900,
            margin: '0 auto',
            marginTop: 30,
            marginBottom: 30
        },

        first: {
            display: 'inline-block',
            verticalAlign: 'top',
            fontSize: '22px',
            lineHeight: '34px',
            color: 'rgb(85, 85, 85)',
            textAlign: 'justify',
            paddingTop: 10,
            width: '50%'
        },

        second: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: '50%',
            textAlign: 'right'
        },

        imagePlaceholder: {

        },

        image: {
            borderRadius: 5,
            //width: 250
            width: '83%'
        },

        videoStyle: {
            width: 400,
            height: 280,
            display: 'inline-block',
            marginTop: 10
        }
    },

    getText: function(){

        return (

            <div>

                {this.props.content == undefined ?



                    <div style={{fontSize: 19, lineHeight: '26px'}} >

                        Много лет мы собирали
                        <b style={{marginRight: 10, marginLeft: 4, textDecoration: 'underline'}} >
                            <MaterialLink materialId={'tIKbXDSVx1'} name={' короткие аутентичные '} />
                        </b>
                        видео материалы.

                        Накоплен большой опыт использования их в вузах, языковых школах и
                        на олимпиадах.

                        <br/><br/>

                        Мы объединили все наши наработки для более эффективного обучения
                        английскому языку.

                        Предлагаем вам нашу онлайн-платформу.

                        Работа станет легче и интереснее. Наверняка это оценят и ваши ученики.

                        Ведь наш ресурс учит понимать реальную речь, заставляет
                        говорить, помогает легко запоминать слова и фразы.



                    </div> :


                    <div>

                        <div dangerouslySetInnerHTML={{__html: this.props.content}}></div>

                    </div>


                }


            </div>

        );

    },


    getImage: function(){



        return (

            <div style={this.componentStyle.imagePlaceholder}>

                <img src={this.props.image} style={this.componentStyle.image} />

            </div>
        );

    },

    getVideo: function(){
        return (
             <div>
                 <VimeoPlayer style={this.componentStyle.videoStyle} vimeoId={this.props.vimeoId} />
             </div>
        );
    },

    getMedia: function(){
        if (this.props.image != undefined){
            return this.getImage();
        }
        return this.getVideo();
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, {width: this.props.width});

        var first = assign({}, this.componentStyle.first);
        var second = assign({}, this.componentStyle.second);
        if (this.props.orientation == 'textRight'){
            second = assign(second, {textAlign: 'left'});
        }

        return (
            <div style={st}>


                {this.props.orientation == 'textLeft' ?

                    <div>

                        <div style={first}>
                            {this.getText()}
                        </div>

                        <div style={second}>
                            {this.getMedia()}
                        </div>

                    </div>:

                    <div>

                        <div style={second}>
                            {this.getMedia()}
                        </div>

                        <div style={first}>
                            {this.getText()}
                        </div>

                    </div>

                }

            </div>
        );
    }

});

module.exports = TextImagePanel;