import Message from "../models/Message.js";
import Notification from "../models/Notification.js";

// SEND MESSAGE
export const sendMessage = async (req, res) => {
    try {
        const receiver = await User.findById(req.body.receiverId);

        if (!receiver.settings?.allowMessages) {
            return res.status(403).json({ message: "User has disabled messages" });
        }

        const message = await Message.create({
            sender: req.user.id,
            receiver: req.body.receiverId,
            text: req.body.text,
        });

        if (
            req.user.id !== req.body.receiverId
            &&
            receiver.settings?.pushNotifications) {
            await Notification.create({
                recipient: req.body.receiverId,
                sender: req.user.id,
                type: "message",
            });
        }

        res.json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET CHAT
export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: req.params.userId },
                { sender: req.params.userId, receiver: req.user.id },
            ],
        }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};