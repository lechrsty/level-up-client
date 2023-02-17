import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createGame, getGames } from '../../managers/GameManager.js'
import { getSingleEvent, createEvent, updateEvent } from "../../managers/EventManager.js"

export const EditEventForm = ({token}) => {

    const navigate = useNavigate()
    const { eventId } = useParams()
    const [gameDropdown, setGameDropdown] = useState([])

    const [updatedEvent, setUpdatedEvent] = useState({
        game: {},
        gameId: 0,
        title: "",
        description: "",
        organizer: "",
        date: "",
        time: ""
    })

    useEffect(() => {
        getGames().then(data  => setGameDropdown(data))
        getSingleEvent(eventId).then((data) => {
            data.gameId = data.game.id
            setUpdatedEvent(data)
        })
    }, [eventId])


    const handleInputChange = (event) => {
        const copy = { ...updatedEvent };
        copy[event.target.id] = event.target.value;
        setUpdatedEvent(copy);
    };


    return (
        <form className="eventForm">
            <h2 className="eventForm__game">Update Event</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Event Title: </label>
                    <input type="text" name="title" id="title" required autoFocus className="form-control"
                        value={updatedEvent.title}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" id="description" required autoFocus className="form-control"
                        value={updatedEvent.description}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                <label className="label">Event Game: </label>
                <select name="gameId" id="gameId" required className="form-control"
                        value={updatedEvent.game.idd}
                        onChange={(event) => {
                            const copy = { ...updatedEvent }
                            copy.gameId = parseInt(event.target.value)
                            setUpdatedEvent(copy)
                        }}>
                        {gameDropdown.map(game => ( 
                                    <option key={`game--${game.id}`} value={game.id} name={game.name}>{game.name}</option>                         
                            ))}
                    </select>
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" id="date" required autoFocus className="form-control"
                        value={updatedEvent.date}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" id="time" required autoFocus className="form-control"
                        value={updatedEvent.time}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        organizer: updatedEvent.organizer.id,
                        game: updatedEvent.gameId,
                        title: updatedEvent.title,
                        description: updatedEvent.description,
                        date: updatedEvent.date,
                        time: updatedEvent.time

                    }

                    updateEvent(eventId, event)
                        .then(() => navigate(`/events/${eventId}`))
                }}
                className="btn btn-primary">Update Event</button>
        </form>
    )
}