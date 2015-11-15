/**
 * Created by sabir on 26.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var PatientEditor = require('../editor/PatientEditor');

var ProfilePanel = React.createClass({
    getDefaultProps: function () {
        return {
            music: undefined,
            video: undefined,
            politics: undefined,
            moreInfo: undefined,

            userId: undefined,
            profileId: undefined,

            buttonName: 'Сохранить',

            onSave: function(data){

            }
        }
    },

    getInitialState: function () {
        return {
            music: this.props.music,
            video: this.props.video,
            politics: this.props.politics,
            moreInfo: this.props.moreInfo
        }
    },

    componentWillReceiveProps: function (np) {
        this.setState({
            music: np.music,
            video: np.video,
            politics: np.politics,
            moreInfo: np.moreInfo
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            padding: 10
            //border: '1px solid #EFF0F1'
        },

        bottomPlaceholder: {
            paddingTop: 10,
            marginTop: 10,
            textAlign: 'right',
            borderTop: '1px solid #EFF0F1'
        },

        textarea: {
            minHeight: '6em',
            height: '6em'
        }
    },

    getValFromEvt: function(evt){
        var val = evt.target.value;
        if (val == undefined || val.trim() == ''){
            return undefined;
        }
        return val;
    },

    onSubmit: function(){
        var data = {
            userId: this.props.userId,
            id: this.props.profileId,
            profileId: this.props.profileId,

            music: this.state.music,
            video: this.state.video,
            politics: this.state.politics,
            moreInfo: this.state.moreInfo
        };
        this.props.onSave(data);
    },

    onPoliticsChange: function(evt){
        this.setState({
            politics: this.getValFromEvt(evt)
        });
    },

    onVideoChange: function(evt){
        this.setState({
            video: this.getValFromEvt(evt)
        });
    },

    onMusicChange: function(evt){
        this.setState({
            music: this.getValFromEvt(evt)
        });
    },

    onMoreInfoChange: function(val){
        this.setState({
            moreInfo: val
        });
    },

    render: function () {
        var music = (this.state.music == undefined) ? '' : this.state.music;
        var video = (this.state.video == undefined) ? '' : this.state.video;
        var politics = (this.state.politics == undefined) ? '' : this.state.politics;
        var moreInfo = (this.state.moreInfo == undefined) ? '' : this.state.moreInfo;

        return (
            <div style={this.componentStyle.placeholder} className={'ui form'} >

                <div className="field">
                    <label>Музыкальные вкусы</label>
                    <textarea type="text" value={music} style={this.componentStyle.textarea}
                              onChange={this.onMusicChange} placeholder={'Музыкальные вкусы'} ></textarea>
                </div>


                <div className="field">
                    <label>Предпочтения в кинематографической продукции </label>
                    <textarea type="text" value={video} style={this.componentStyle.textarea}
                           onChange={this.onVideoChange} placeholder={'Предпочтения в кинематографической продукции'} ></textarea>
                </div>

                <div className="field">
                    <label>Интерес к политике и новостям</label>
                    <textarea type="text" value={politics} style={this.componentStyle.textarea}
                              onChange={this.onPoliticsChange} placeholder={'Интерес к политике и новостям'} ></textarea>
                </div>

                <div className="field">
                    <label>Дополнительная информация</label>
                    <PatientEditor value={this.props.moreInfo} onContentChange={this.onMoreInfoChange} />
                </div>

                <div style={this.componentStyle.bottomPlaceholder}>
                    <button className={'ui primary button'} onClick={this.onSubmit} >
                        <i className={'icon save'} ></i>
                        {this.props.buttonName}
                    </button>
                </div>

            </div>
        );
    }

});

module.exports = ProfilePanel;