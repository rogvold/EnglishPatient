/**
 * Created by sabir on 21.07.15.
 */

var PanelsBunch = React.createClass({
    getDefaultProps: function(){
        return {
            mainPanel: {
                imgSrc: '',
                name: 'N/A',
                description: 'N/A'
            },
            panels: [{
                imgSrc: '',
                name: 'N/A',
                description: 'N/A'
            }, {
                imgSrc: '',
                name: 'N/A',
                description: 'N/A'
            }],

            description: 'N/A',

            panelClicked: function(data){

            }
        }
    },

    getInitialState: function(){
        return {
            childrenVisible: false,
            remarkable: new Remarkable()
        }
    },

    mainPanelClicked: function(){
        this.setState({
            childrenVisible: !this.state.childrenVisible
        });
    },

    childPanelClicked: function(a, b){
        this.props.panelClicked(a);
    },

    render: function(){
        var description = this.state.remarkable.render(this.props.description);
        description = replaceVimeoLinks(description);
        return (
            <div className={'panelsBunch'} style={{marginTop: 10}}>
                <div className={'mainPanelPlaceholder item'} onClick={this.mainPanelClicked} style={{marginBottom: 20}} >
                    <PanelItem  imgSrc={this.props.mainPanel.imgSrc} name={this.props.mainPanel.name} description={this.props.mainPanel.description} />
                </div>

                <div className={ (this.state.childrenVisible == true) ? '' : ' displaynone '}>
                    <div className={'panelsBunchDescriptionPlaceholder'}>
                        <div dangerouslySetInnerHTML={{__html: description}} />
                    </div>

                    <div className={'childPanelsPlaceholder ui items'} style={{marginBottom: 10}} >
                        {this.props.panels.map(function(item, i){
                            var key = item.id;
                            var boundClick = this.childPanelClicked.bind(this,  key);
                            return (
                                <div key={key} className={'ui item '} >
                                    <PanelItem key={ key} panelClicked={boundClick} imgSrc={item.imgSrc} name={item.name} description={item.description} />
                                </div>
                            );
                        }, this)}
                    </div>
                </div>

            </div>
        );
    }



});
