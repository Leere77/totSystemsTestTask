import React from 'react';

function Message({ message, user, setTargetMessage, targetMessage, updateMessage, deleteMessage }) {
    const { userName } = user;
    const { owner, date, text, _id } = message;

    function editHandler() {
        setTargetMessage({
            _id: targetMessage._id ? '' : _id,
            text: targetMessage.text ? '' : text,
        })
    }

    function updateSubmit() {
        updateMessage({
            _id,
            userName,
            text: targetMessage.text
        });
        editHandler();
    }

    return (
        <div className="message">
            <div className="message__owner">
                {owner.userName + owner.status}
                {
                    owner.userName == userName &&
                    <React.Fragment>
                        <span 
                            className="message__edit" 
                            onClick={editHandler}>
                                [edit
                        </span>
                        <span 
                            className="message__delete" 
                            onClick={() => deleteMessage(message._id)}>
                                delete]
                        </span>
                    </React.Fragment>
                }
            </div>
            <div className="message__date">
            {
                (new Date(date)).toLocaleDateString() +
                (new Date(date)).toLocaleTimeString()
            }
            </div>
            {
            targetMessage &&
                    <div className="messages-input">
                        <textarea
                            value={targetMessage.text}
                            onChange={e => setTargetMessage({
                                _id,
                                text: e.target.value
                            })}
                            className="messages-input__textarea" 
                        />
                        <button 
                            onClick={updateSubmit}
                            className="messages-input__send-btn">
                            Edit
                        </button>
                        <button
                            onClick={editHandler}
                            className="messages-input__send-btn">
                            Cancel
                        </button>
                    </div>
            }

            {
                !targetMessage &&
                    <div className="message__content">{text}</div>
            }
        </div>
    );
}

export default Message;