import React from 'react'
import "./join.css"
import logo from "../../images/logo.png"
import { Link } from "react-router-dom"
import { useState } from 'react'
let user;
const Join = () => {
    const sendUser = () => {
        user = document.getElementById("joinInput").value;
        document.getElementById("joinInput").value = "";
    }
    const [name, setName] = useState("");
    const changeHandler = (e) => {
        setName(e.target.value);
    }
    return (
        <div className='JoinPage'>
            <div className="JoinContainer">
                <img src={logo} alt="logo" />
                <h1>C CHAT</h1>
                <input onChange={changeHandler} placeholder='Enter your Name' type="text" id='joinInput' />
                <Link onClick={(e) =>!name ? e.preventDefault() :null} to="/chat"><button onClick={sendUser} className='joinBtn'>Login</button></Link>
            </div>
        </div>
    )
}

export default Join
export { user }