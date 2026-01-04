const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    // sab users ko bhejo (sender id ke sath)
    io.emit("receiveMessage", {
      id: socket.id,
      message: data.message,
    });
  });

  socket.on("deleteMessage", (msgId) => {
    io.emit("messageDeleted", msgId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
