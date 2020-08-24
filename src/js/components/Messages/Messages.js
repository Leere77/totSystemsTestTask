import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import User from '../User/User';
import Message from './Message';
import MessageInput from './MessageInput';
import './Messages.scss';
import { 
    getMessagesData, 
    updateMessage, 
    postMessage, 
    deleteMessage } from '../../actions/messageActions';

function Messages({user, messages, type, ...actions }) {
    const { getMessagesData, postMessage, updateMessage, deleteMessage } = actions;
    const [targetMessage, setTargetMessage] = useState({
        id: '',
        text: ''
    });

    useEffect(() => {
        (async () => {
            getMessagesData(type, userName)
        })()
    }, [type]);

    useEffect(() => {
        if (type)
            document.querySelector('.messages-view').scrollTop = 
                document.querySelector('.messages-view').scrollHeight
    }, [messages]);

    const { userName } = user;

    if (!type)
        return (
            <div className="container">
                <User />
                
                <div className="right-container">
                    <div className="start-caption">Select Messages</div>
                </div>
            </div>
        );

    return (
        <div className="container">
            <User />

            <div className="right-container">
                <div className="messages-view">
                    {
                        messages.map(message => (
                            <Message
                                message={message}
                                user={user}
                                targetMessage={message._id == targetMessage._id && targetMessage}
                                setTargetMessage={setTargetMessage}
                                key={message._id}
                                deleteMessage={deleteMessage}
                                updateMessage={updateMessage}
                            />
                        ))
                    }
                </div>
                {
                    type !== 'my' && 
                        <MessageInput 
                            userName={userName}
                            type={type}
                            postMessage={postMessage}
                        />
                }
            </div>
        </div>
    );
}

const mapStateToProps = ({
    user: { userName, status },
    message: { messages }
}) => ({
    user: {
        userName,
        status
    },
    messages
});

const mapDispatchToProps = dispatch => ({
    getMessagesData: (type, userName) => dispatch(getMessagesData({
        type,
        userName
    })),
    postMessage: messageData => dispatch(postMessage(messageData)),
    updateMessage: messageData => dispatch(updateMessage(messageData)),
    deleteMessage: _id => dispatch(deleteMessage({_id})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);