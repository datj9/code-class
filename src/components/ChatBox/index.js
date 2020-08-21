import React, { useEffect, useState, useRef } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, FormInput } from "shards-react";
import io from "socket.io-client";
import { apiUrl } from "../../api";
import { ADD_MESSAGE_INTO_LIST } from "../../redux/chat/action-types";

const socket = io.connect(apiUrl);

export default function ChatBox({ receiver, closeChatBox }) {
    const [message, setMessage] = useState("");
    const [scrollHeightAtBottom, setScrollHeightAtBottom] = useState(0);
    const currentUser = useSelector((state) => state.user.currentUser);
    const isConnecting = useSelector((state) => state.chat.isConnecting);
    const room = useSelector((state) => state.chat.room);
    const messagesList = useSelector((state) => state.chat.messagesList);
    const dispatch = useDispatch();
    const messagesListRef = useRef();

    const handleMessage = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit("room", { roomId: room.id, userId: currentUser.id, message: message.trim() });
        setMessage("");
    };

    useEffect(() => {
        if (room.id) {
            socket.emit("joinRoom", { roomId: room.id });
            socket.on("messageFromServer", (data) => {
                dispatch({
                    type: ADD_MESSAGE_INTO_LIST,
                    payload: data,
                });
            });
        }
    }, [dispatch, room.id, messagesList]);

    useEffect(() => {
        setMessage("");
    }, [receiver.id]);

    useEffect(() => {
        const chatLog = document.querySelector(".chat-container");
        const lastestMessage = messagesList[messagesList.length - 1];

        if (
            messagesList.length > 0 &&
            (lastestMessage.sender.id === currentUser.id ||
                scrollHeightAtBottom === 0 ||
                chatLog.clientHeight + chatLog.scrollTop >= scrollHeightAtBottom)
        ) {
            chatLog.scrollTop = chatLog.scrollHeight;
        }
        if (messagesList.length > 0) {
            setScrollHeightAtBottom(chatLog.scrollHeight);
        }
    }, [messagesList.length, scrollHeightAtBottom, currentUser.id, messagesList]);

    return (
        <div className='chat-box'>
            <div className='header d-flex justify-content-between px-2'>
                <span className='d-flex align-self-center'>{receiver.user?.name || receiver.name}</span>
                <span onClick={closeChatBox} role='button' className='d-flex align-items-center'>
                    <i className='fas fa-times'></i>
                </span>
            </div>
            {isConnecting ? <div className='bg-info status text-center text-white'>Đang kết nối</div> : null}
            <div ref={messagesListRef} className='chat-container'>
                <div className='messages-list'>
                    {messagesList.map((msg) => (
                        <div
                            className={`message-item mb-3 ${
                                currentUser.id === msg.sender.id ? "my-msg" : "friend-msg"
                            }`}
                            key={msg.id}
                        >
                            {currentUser.id !== msg.sender.id ? (
                                <span className='avatar bg-primary text-white'>
                                    {msg.sender.profileImageURL ? (
                                        <img alt='' src={msg.sender.profileImageURL} />
                                    ) : (
                                        <span className='d-flex w-100 h-100 justify-content-center align-items-center'>
                                            {msg.sender.shortName}
                                        </span>
                                    )}
                                </span>
                            ) : null}
                            <span className='message'>{msg.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Form>
                <FormGroup className='mb-0 d-flex align-items-center message-input'>
                    <FormInput placeholder='Tin Nhắn' value={message} onChange={handleMessage} />
                </FormGroup>
                <FormGroup className='mb-0 d-flex align-items-center submit-btn'>
                    <Button onClick={sendMessage} disabled={isConnecting} type='submit' pill>
                        Gửi
                    </Button>
                </FormGroup>
            </Form>
        </div>
    );
}
