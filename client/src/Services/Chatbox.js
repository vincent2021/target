import React, { Component } from 'react';
import { Launcher } from 'react-chat-window'

class Demo extends Component {

    constructor() {
        super();
        this.state = {
            messageList: [{
                author: 'them',
                type: 'text',
                data: { text: "yolo" }
            }]
        };
    }

    componentDidMount() {
        document.getElementById('sc-launcher').childNodes[0].remove();
    }

    componentDidUpdate() {
        if (this.props.chatison)
            document.getElementById('sc-launcher').childNodes[0].className = 'sc-chat-window opened';
        else
            document.getElementById('sc-launcher').childNodes[0].className = 'sc-chat-window closed';
    }

    _onMessageWasSent(message) {
        this.setState({
            messageList: [...this.state.messageList, message]
        })
        console.log(this.state);
    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [
                    ...this.state.messageList, {
                        author: 'them',
                        type: 'text',
                        data: { text }
                    }
                ]
            })
        }
    }

    render() {
        return (<div>
            <Launcher
                agentProfile={{
                    teamName: 'react-chat-window',
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}
                onMessageWasSent={this._onMessageWasSent.bind(this)}
                messageList={this.state.messageList}
                showEmoji
            />
        </div>)
    }
}

export default Demo;