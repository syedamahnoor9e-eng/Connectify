import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react"; 
import API from "../api/axiosInstance";
import socket from "../socket";

const MessagesSidebar = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const currentUserId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await API.get("/users");
                const filtered = res.data.filter((u) => u._id !== currentUserId);
                setUsers(filtered);
            } catch (err) {
                console.error("Failed to fetch users");
            }
        };
        fetchUsers();
    }, [currentUserId]);

    useEffect(() => {
        socket.emit("addUser", currentUserId);
        socket.on("getUsers", (users) => {
            setOnlineUsers(users);
        });
        return () => socket.off("getUsers");
    }, [currentUserId]);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4 border-b pb-3">
                <MessageCircle size={20} className="text-purple-600" />
                <h3 className="font-bold text-gray-800">Messages</h3>
            </div>

            <div className="space-y-1 overflow-y-auto max-h-[400px] custom-scrollbar">
                {users.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-4">No users found</p>
                ) : (
                    users.map((user) => (
                        <div
                            key={user._id}
                            onClick={() => navigate(`/chat/${user._id}`)}
                            className="flex items-center gap-3 cursor-pointer hover:bg-purple-50 transition-all p-2 rounded-xl group"
                        >
                            <div className="relative shrink-0">
                                <img
                                    src={user.profilePic || "/avatar.png"}
                                    alt={user.username}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-purple-200"
                                />
                                {onlineUsers.includes(user._id) && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                                )}
                            </div>

                            <div className="overflow-hidden">
                                <p className="font-semibold text-sm text-gray-800 truncate">
                                    {user.username}
                                </p>
                                <p className="text-[11px] text-gray-500 truncate group-hover:text-purple-600">
                                    Active now
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MessagesSidebar;