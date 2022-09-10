import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const PORT = 3001;
const app = express();
app.use(cors());

const server = app.listen(PORT);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173/",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("===== Connected:", socket.id)

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  })

  socket.on("disconnect", () => {
    console.log("===== Client disconnected.")
  });
});