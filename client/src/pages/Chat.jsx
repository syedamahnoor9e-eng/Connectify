import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axiosInstance";
import socket from "../socket";

const Chat = () => {
    const { id: userId } = useParams(); 
    const currentUserId = localStorage.getItem("userId");

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    const endRef = useRef(); 

    // FETCH MESSAGES
    useEffect(() => {
        const fetchMessages = async () => {
            const res = await API.get(`/messages/${userId}`);
            setMessages(res.data);
        };

        if (userId) fetchMessages();
    }, [userId]);

    // AUTO SCROLL
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // SOCKET CONNECT
    useEffect(() => {
        socket.emit("addUser", currentUserId);
    }, [currentUserId]);

    // RECEIVE MESSAGE
    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            setMessages(prev => [...prev, data]);
        });

        return () => socket.off("receiveMessage");
    }, []);

    // SEND MESSAGE
    const handleSend = async () => {
        if (!text.trim()) return;

        const newMsg = {
            sender: currentUserId,
            receiver: userId,
            text,
        };

        setMessages(prev => [...prev, newMsg]);

        try {
            await API.post("/messages", {
                receiverId: userId,
                text,
            });

            socket.emit("sendMessage", {
                senderId: currentUserId,
                receiverId: userId,
                text,
            });

            setText("");
        } catch {
            alert("Failed to send message");
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto">

            {/* CHAT HEADER */}
            <h2 className="font-semibold mb-4 text-lg">
                Chat with User
            </h2>

            <div className="h-100 overflow-y-auto border p-4 mb-4">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`mb-2 ${msg.sender === currentUserId
                                ? "text-right"
                                : "text-left"
                            }`}
                    >
                        <span className="bg-gray-200 px-3 py-1 rounded-lg inline-block">
                            {msg.text}
                        </span>
                    </div>
                ))}

                {/* AUTO SCROLL TARGET */}
                <div ref={endRef}></div>
            </div>

            <div className="flex gap-2">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 border px-3 py-2 rounded"
                    placeholder="Type message..."
                />

                <button
                    onClick={handleSend}
                    className="bg-blue-500 text-white px-4 rounded"
                >
                    Send
                </button>
            </div>

        </div>
    );
};

export default Chat;