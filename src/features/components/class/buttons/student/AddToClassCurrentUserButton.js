/**
 * Created by sabir on 09.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var ParseMixin = require('../../../../../react/mixins/commonMixins/ParseMixin');
var LoginMixin = require('../../../../mixins/LoginMixin');

var AuthButton = require('../../../user/AuthButton');

var AddToClassButton = require('./AddToClassButton');

var AddToClassCurrentUserButton = React.createClass({
    getDefaultProps: function () {
        return {
            classId: undefined,
            loginText: 'Войдите в систему',
            buttonName: 'Перейти в класс'
        }
    },

    getInitialState: function () {
        return {
            currentUser: LoginMixin.getCurrentUser()
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {
        var userId = (this.state.currentUser == undefined) ? undefined : this.state.currentUser.id;
        var classId = this.props.classId;

        return (
            <div style={this.componentStyle.placeholder}>

                {classId == undefined ? null :
                    <div>
                        {userId == undefined ?
                            <div>
                        <span style={{opacity: 0.6}}>
                            {this.props.loginText}
                        </span>
                                <div style={{textAlign: 'center', marginTop: 10, marginBottom: 5}}>
                                    <AuthButton buttonClassName={'ui blue basic button'} />
                                </div>
                            </div>
                            :
                            <div>
                                <AddToClassButton userId={userId} classId={this.props.classId}
                                                  buttonName={this.props.buttonName}
                                    />
                            </div>
                        }
                    </div>
                }

            </div>
        );
    }

});

module.exports = AddToClassCurrentUserButton;