/**
 * Created by sabir on 21.07.15.
 */

var PanelItem = React.createClass({
    getDefaultProps: function(){
        return {
            imgSrc: '',
            name: 'N/A',
            description: 'N/A',
            panelId: Math.random(),
            panelClicked: function(id){
                console.log('panelClicked id = ', id);
            }
        }
    },

    getInitialState: function(){
        return {
            remarkable: new Remarkable()
        }
    },

    render: function(){
        var ava = (this.props.imgSrc == undefined || this.props.imgSrc == '') ? 'http://disk.englishpatient.org/uploads/BCUvZp7YRLmqcfu.jpg' : this.props.imgSrc;
        return (
            <div onClick={this.props.panelClicked} className={'patientPanel ui items segment  ' } style={{marginTop: 10}}>
                <div className={'ui item '}>

                        <div className={'imagePlaceholder ui tiny image'}>
                            <img src={ava} />
                        </div>

                        <div className={'rightBlockPlaceholder ui content '}>
                            <div className={'header'} >{this.props.name}</div>
                            <div className={'contentPlaceholder description'}>
                                <div dangerouslySetInnerHTML={{__html: this.state.remarkable.render(this.props.description)}} />
                            </div>
                        </div>

                </div>
            </div>
        );
    }

});