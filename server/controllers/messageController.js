import Message from "../models/Message.js";

// SEND MESSAGE
export const sendMessage = async (req, res) => {
    try {
        const message = await Message.create({
            sender: req.user.id,
            receiver: req.body.receiverId,
            text: req.body.text,
        });

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