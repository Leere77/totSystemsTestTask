import React, { useState } from 'react';

function MessageInput({ userName, type, postMessage }) {
    const [text, setText] = useState('');

    return (
        <div className="messages-input">
            <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                className="messages-input__textarea"
            />
            <button
                onClick={() => postMessage({
                    userName,
                    type,
                    text
                })}
                className="messages-input__send-btn"
            >
                Send
            </button>
        </div>
    );
}

export default MessageInput;