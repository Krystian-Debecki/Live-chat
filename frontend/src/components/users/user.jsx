import './user.css'
const User = ({name}) => {
    return(
        <li className="users__item">
            {name}
        </li>
    )
}

export default User