const http = require("http");
const express = require("express");
const cors = require("cors")
const socketIO = require("socket.io")
const port = 4500 || process.env.PORT;
const app = express()
app.get("/", (req, res) => {
    res.send("Hello World")
})
app.use(cors());
const users = [{}];
const server = http.createServer(app)
const io = socketIO(server)
io.on("connection", (socket) => {
    console.log("New Connection from ved agarwal")
    socket.on("joined", ({ user }) => {
        users[socket.id] = user;
        console.log(`${user} has joined`)
        socket.broadcast.emit("userJoined", { user: "Admin", message: `${users[socket.id]} has joined` })
        socket.emit("welcome", { user: "Admin", message: `Welcome to the chat ${users[socket.id]}` })
    })
    socket.on("message", ({ message, id }) => {
        io.emit("sendMessage",{user:users[id],message,id})
    })
    socket.on("disconnected", () => {
        socket.broadcast.emit("leave", { user: "Admin", message: `User has left` })
        console.log("user left from the chat")
    })
})
server.listen(port, () => {
    console.log(`Server started at port number http://localhost:${port}`)
})


