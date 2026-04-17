import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import {getReceiverSocketId, io} from "../lib/socket.js";


export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({
            _id: {$ne: loggedInUserId},
        }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId},
            ],
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export const sendMessage = async (req, res) => {
    try {
        const {textMessage: text} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        const image = req.file;
        let imageUrl;
        if (image) {
            // Upload base64 image to cloudinary
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            imageUrl = await cloudinary.uploader.upload(dataURI, {
                folder: "sendImage",
                public_id: `${senderId}_sendImage`,
                overwrite: true,
            });
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text: text,
            image: imageUrl ? imageUrl.secure_url : "",
        });
        await newMessage.save();
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};
