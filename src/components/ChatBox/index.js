import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { Button, Form, FormGroup, FormInput } from "shards-react";
import io from "socket.io-client";
import { apiUrl } from "../../api";

const socket = io.connect(apiUrl);
export default function ChatBox() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleMessage = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit("room", { roomId: "5f369ce22c9b304f9889ce24", userId: currentUser.id, message });
        setMessage("");
    };

    useEffect(() => {
        socket.on("connect", () => {
            socket.emit("joinRoom", { roomId: "5f369ce22c9b304f9889ce24" });
            socket.on("messageFromServer", (data) => {
                setMessages((messages) => {
                    if (messages.length === 0 || data.id !== messages[messages.length - 1].id) {
                        return messages.concat([data]);
                    }
                    return messages;
                });
            });
        });
    }, [currentUser.id]);

    return (
        <div className='chat-box'>
            <div className='chat-container'>
                <div className='messages-list pb-3'>
                    {messages.map((msg) => (
                        <div
                            className={`message-item ${currentUser.id === msg.sender.id ? "my-msg" : "friend-msg"}`}
                            key={msg.id}
                        >
                            <span> {msg.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Form onSubmit={sendMessage}>
                <FormGroup>
                    <FormInput placeholder='Tin Nhắn' value={message} onChange={handleMessage} />
                </FormGroup>
                <Button type='submit' pill>
                    Gửi
                </Button>
            </Form>
        </div>
    );
}
