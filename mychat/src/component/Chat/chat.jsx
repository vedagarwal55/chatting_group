import React from 'react'
import { user } from "../Join/join"
import { useEffect, useState } from 'react'
import "./chat.css"
import socketIo from "socket.io-client"
import sendLogo from "../../images/send.png"
import Message from "../Message/message"
import ReactScrolltoBottom from "react-scroll-to-bottom"
import closeIcon from "../../images/closeIcon.png"
const endpoint = "http://localhost:4500/"
let socket;
const Chat = () => {
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([])
    const send = () => {
        const message = document.getElementById("chatInput").value;
        socket.emit("message", { message, id })
        document.getElementById("chatInput").value = "";
    }
    useEffect(() => {
        socket = socketIo(endpoint, { transports: ["websocket"] })
        socket.on("connect", () => {
            alert("Connected")
            setId(socket.id)
        })
        socket.emit("joined", { user })
        socket.on("welcome", (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message);
        })
        socket.on("userJoined", (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message)
        })
        socket.on("leave", (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message)
        })
        return () => {
            socket.emit("disconnected");
            socket.off();
        }
    }, [])
    useEffect(() => {
        socket.on("sendMessage", (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message, data.id);
        })
        return () => {
            socket.off()
        }
    }, [messages])
    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h3>C chat</h3>
                    <img src={closeIcon} alt="close" />
                </div>
                <ReactScrolltoBottom className="chatBox">
                    {
                        messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? "right" : "left"} />)
                    }
                </ReactScrolltoBottom>
                <div className="inputBox">
                    <input type="text" id='chatInput' />
                    <button onClick={send} className='sendBtn'><img src={sendLogo} alt="" /></button>
                </div>
            </div>
        </div>
    )
}

export default Chat