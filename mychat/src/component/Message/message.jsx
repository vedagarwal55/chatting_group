import React from 'react'
import "./message.css"
const message = ({ user, message, classs }) => {
    if(user){
        return (
            <div className={`messageBox ${classs}`}>
               {`${user}: ${message}`}
            </div>
        )
    }
    else{
        return (
            <div className={`messageBox ${classs}`}>
                {`You :${message}`}
            </div>
        )
    }
}

export default message