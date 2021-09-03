import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router";

import Message from "../message/message";
import User from "../users/user";
import { useHistory } from "react-router";
import ArrowIcon from "../icon/arrow-icon";

import './room.css'

const Room = ({name, socket}) => {
    const [value,setValue] = useState('');
    const [messages,setMessages] = useState([]);
    const [users,setUsers] = useState([])
    const history = useHistory()
    
    const {room} = useParams()

    const messageSound = new Audio('/sounds/message.wav')

    const handleChange = e => {
        setValue(e.target.value)
    }

    const handleClick = () => {

        if(!value) return;

        socket.emit('message', {from: name, message: value, room, id: messages.length})
        setValue('')
    }

    useEffect(()=> {
        if(!name) history.push('/')

        socket.on('joinRoom', req => setUsers(req))

        if(name) socket.emit('getUsersList', {room})

        socket.on('getUsersList', req => setUsers(req))

        socket.on('message', req => { 
            for(let i = 0; i<messages.length; i++)
                if(messages[i].id === req.id)     
                    return;
            setMessages(prev => [...prev,req])
        })

        
    },[socket])

    socket.on('disc', req => setUsers(users.filter(user => user.id !== req)))

    const userList = users.map(user => {
        return <User name={user.name}/>
    })
    return (
        <main className="room">
            <header className="room__room-name">
                {room}
                <span>Członkowie: {users.length}</span>
            </header>
            <div className="room__content">
            <div className="room__chat">
                {messages.map(mess => <Message name={name} message={mess.message} from={mess.from}/>)}
            </div>
            <ul className="room__active-users">
                {userList}
            </ul>
            </div>
            <div className="room__send-message">

                <input 
                    value={value} 
                    onChange={handleChange}
                    className="room__input"
                />

                <button
                    onClick={handleClick}
                    className={`room_btn ${!value && 'unactive'}`}
                >
                    <ArrowIcon />
                </button>

            </div>
            
        </main>
    )
}

export default Room