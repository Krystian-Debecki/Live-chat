import './message.css'

const Message = ({name, message, from}) => {
    let messageType = (name === from) ? 'blue' : 'grey'
    return (
        <div className={`${messageType} message`}>
            <span className="message__author">{from}</span>
            <p className="message__text">{message}</p>
            
        </div>
    )
}

export default Message