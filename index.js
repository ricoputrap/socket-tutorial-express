import express from "express";
import http from "http";
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
  console.log("===== User Connected: " + socket.id);

  socket.on("disconnect", () => {
    console.log("===== Client disconnected.")
  });
});