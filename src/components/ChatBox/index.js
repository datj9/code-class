import React, { useEffect, useState } from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import { Button, Form, FormGroup, FormInput } from "shards-react";
import io from "socket.io-client";
import { apiUrl } from "../../api";

const socket = io.connect(apiUrl);

export default function ChatBox({ mentor, toggleChatBox }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const currentUser = useSelector((state) => state.user.currentUser);
    const isConnecting = useSelector((state) => state.chat.isConnecting);
    const room = useSelector((state) => state.chat.room);

    const handleMessage = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit("room", { roomId: room.id, userId: currentUser.id, message });
        setMessage("");
    };

    useEffect(() => {
        if (room.id) {
            socket.emit("joinRoom", { roomId: room.id });
            socket.on("messageFromServer", (data) => {
                setMessages((messages) => {
                    if (messages.length === 0 || data.id !== messages[messages.length - 1].id) {
                        return messages.concat([data]);
                    }
                    return messages;
                });
            });
        }
    }, [room.id]);

    return (
        <div className='chat-box'>
            <div className='header d-flex justify-content-between px-2'>
                <span className='d-flex align-self-center'>{mentor.user.name}</span>
                <span onClick={toggleChatBox} role='button' className='d-flex align-items-center'>
                    <i className='fas fa-times'></i>
                </span>
            </div>
            {isConnecting ? <div className='bg-info status text-center text-white'>Đang kết nối</div> : null}
            <div className='chat-container'>
                <div className='messages-list'>
                    {messages.map((msg) => (
                        <div
                            className={`message-item mb-2 ${
                                currentUser.id === msg.sender.id ? "my-msg" : "friend-msg"
                            }`}
                            key={msg.id}
                        >
                            {currentUser.id !== msg.sender.id ? <span className='avatar'></span> : null}
                            <span className='message'> {msg.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Form onSubmit={sendMessage}>
                <FormGroup className='mb-0 d-flex align-items-center message-input'>
                    <FormInput placeholder='Tin Nhắn' value={message} onChange={handleMessage} />
                </FormGroup>
                <FormGroup className='mb-0 d-flex align-items-center submit-btn'>
                    <Button type='submit' pill>
                        Gửi
                    </Button>
                </FormGroup>
            </Form>
        </div>
    );
}
