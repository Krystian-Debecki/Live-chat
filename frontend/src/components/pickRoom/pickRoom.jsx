import './pick-room.css'

import PickRoomOption from '../RoomOption/room-option'

import { useState,useEffect } from 'react'
import { useHistory } from 'react-router'

const PickRoom = ({name,socket,error,setError}) => {
    const [value,setValue] = useState('')
    const [rooms,setRooms] = useState()
    const history = useHistory()

    const handleCreateRoom = () => {
        if(!value) return;
        socket.emit('createRoom', {room:value, name})
    }
    
    const handleChange = e => {
        setError('')
        setValue(e.target.value)
    }

    useEffect(() =>{
        if(!name) return history.push('/')

        socket.on('createRoom', req => console.log(req))
        socket.on('joinRoom', req => console.log(req))
        socket.on('connected', req => console.log(req))
        
        socket.on('getRoomsArray', req => {
            console.log(req)
            setRooms(req)
        })

        socket.emit('getRoomsArray') 
    
    },[socket])
    
    return (
        <>     
            <main className="pick-room">
                <h2>Witaj {name}</h2>
                <div>
                    <input value={value} onChange={handleChange} className="pick-room__input"/>
                    <button onClick={handleCreateRoom} className="starting-page__btn">
                        Stwórz pokój 
                    </button>
                    {error}
                </div>
                <div className="pick-room__list">
                {
                    rooms
                    ? rooms.map(room => <PickRoomOption name={name} room={room} socket={socket}/>)
                    : "LOADING"
                }
                </div>
                
            </main>



            <span className="atribution">
                    Image by 
                    <a href="https://pixabay.com/users/davidzydd-985081/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2506011">
                    David Zydd
                    </a> 
                    from 
                    <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2506011">
                    Pixabay</a>
            </span>
        </>
    )
}

export default PickRoom