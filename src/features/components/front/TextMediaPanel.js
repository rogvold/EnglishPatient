/**
 * Created by sabir on 18.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var VimeoPlayer = require('../../components/player/VimeoPlayer');

var TextImagePanel = React.createClass({
    getDefaultProps: function () {
        return {
            orientation: 'textLeft',
            content: undefined,
            //image: 'http://article.englishpatient.org/img/lirmak_blog.png',
            image: undefined,
            width: 900,
            //vimeoId: undefined
            vimeoId: '146204986'
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
            fontSize: '18px',
            lineHeight: '30px',
            color: 'rgb(85, 85, 85)',
            textAlign: 'justify',
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

                    <div>
                        В течение 20 лет мы собирали <b>короткие аутентичные</b> материалы для аудирования.
                        Мы накопили солидный опыт использования их в вузах, языковых школах и на олимпиадах.
                        <br/><br/>
                            Мы создали <b>уникальный  ресурс</b>, который учит понимать реальную речь, заставляет говорить,
                            позволяет легко запоминать слова и фразы. Ведь язык - это звуки и образы, а не буквы.
                            Борхес писал: язык древнее науки, его изобрели не ученые...

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