import express from "express";
import authRouter from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import {io, server, app} from "./lib/socket.js";
import path from "path";

dotenv.config();
const __dirname = path.resolve();

const storage = multer.memoryStorage();
const upload = multer({storage});
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});

app.use("/api/auth", upload.single("profilePic"), authRouter);
app.use("/api/messages", upload.single("sendImg"), messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("(.*)", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}
server.listen(process.env.PORT, () => {
    console.log("server is running");
    connectDB();
});
