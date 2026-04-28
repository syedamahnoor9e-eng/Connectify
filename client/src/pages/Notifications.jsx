import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import socket from "../socket";
import toast from "react-hot-toast";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const res = await API.get("/notifications");
            setNotifications(res.data);
        };

        fetchNotifications();
    }, []);

    useEffect(() => {
        socket.on("newNotification", (data) => {
            if (data.type === "message") {
                toast("📩 New message received!");
            } else if (data.type === "like") {
                toast("❤️ Someone liked your post!");
            }
        });

        return () => socket.off("newNotification");
    }, []);

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-4">Notifications</h2>

            {notifications.length === 0 ? (
                <p>No notifications</p>
            ) : (
                notifications.map((n) => (
                    <div key={n._id} className="border-b py-2">
                        <p>
                            <strong>{n.sender.username}</strong>{" "}
                            {n.type === "like"
                                ? "liked your post ❤️"
                                : "sent you a message 💬"}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Notifications;