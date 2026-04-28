import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import socket from "../socket";

const MessagesSidebar = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const currentUserId = localStorage.getItem("userId");

    // FETCH USERS
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await API.get("/users");

                const filtered = res.data.filter(
                    (u) => u._id !== currentUserId
                );

                setUsers(filtered);
            } catch (err) {
                console.error("Failed to fetch users");
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        socket.emit("addUser", currentUserId);

        socket.on("getUsers", (users) => {
            setOnlineUsers(users);
        });

        return () => socket.off("getUsers");
    }, []);

    return (
        <div className="w-70 fixed mt-40 ml-20">

            <div className="bg-white p-4 rounded-xl shadow">

                <h3 className="font-semibold mb-3">Messages</h3>

                {users.length === 0 ? (
                    <p className="text-sm text-gray-500">No users</p>
                ) : (
                    users.map((user) => (
                        <div
                            key={user._id}
                            onClick={() => navigate(`/chat/${user._id}`)}
                            className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
                        >
                            <div className="relative">
                                <img
                                    src={user.profilePic || "/avatar.png"}
                                    className="w-10 h-10 rounded-full"
                                />

                                {onlineUsers.includes(user._id) && user.settings?.showOnlineStatus && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border"></span>
                                )}
                            </div>

                            <div>
                                <p className="font-medium">
                                    {user.username}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Start chatting
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