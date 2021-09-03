import { useHistory } from 'react-router'
import './room-option.css'

const PickRoomOption = ({name="Imie",socket, room}) => {
    const history = useHistory()
    const handleClick = () => {
        socket.emit('joinRoom', {name,room})
        history.push(`/room/${room}`)
    }
    
    return (
        <div className="room-option">
            <h2>{room}</h2>
            <button className="room-option__btn" onClick={handleClick}>Dołącz </button>
        </div>
    )
}

export default PickRoomOption