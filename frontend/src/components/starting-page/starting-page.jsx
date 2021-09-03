import './starting-page.css'

import { useHistory } from "react-router-dom"
import { useState } from "react"

const StartingPage = ({ setName }) => {
    const [value, setValue] = useState()
    const [noValueErr, setNoValueErr] = useState(false)
    const history = useHistory()

    const handleClick = () => {
        if (!value) return setNoValueErr(true);
        setName(value)
        setValue('')
        history.push('/pickRoom')
    }
    const handleChange = e => {
        setNoValueErr(false)
        setValue(e.target.value)
    }
    return (
        <>
            <div className="starting-page__body">
                <h1 className="starting-page__header">Projekt Live Chat</h1>

                <div className="starting-page__form">
                    <input
                        placeholder="Podaj nazwę użytkownika"
                        className="starting-page__input"
                        value={value}
                        onChange={handleChange}
                    />
                    <button
                        className="starting-page__btn"
                        onClick={handleClick}
                    >
                        Dołącz
                    </button>
                </div>

                {noValueErr && "NIE PODANO NAZWY UŻYTKOWNIKA!!"}

                

                <span className="atribution">
                    Image by 
                    <a href="https://pixabay.com/users/davidzydd-985081/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2506011">
                    David Zydd
                    </a> 
                    from 
                    <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2506011">
                    Pixabay</a>
                </span>
            </div>
        </>
    )
}

export default StartingPage