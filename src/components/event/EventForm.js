import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent } from "../../managers/EventManager"
import { getGames } from "../../managers/GameManager"
import "./Event.css"


export const EventForm = ({token}) => {

    const navigate = useNavigate()
    const [games, setGames] = useState([])
    
    const [newEvent, setNewEvent] = useState({
        game: "",
        title: "",
        description: "",
        organizer: token,
        date: "",
        time: ""
    })

    useEffect(() => {
        getGames().then((data) => setGames(data))
    }, [])   


    const handleInputChange = (event) => {
        const copyOfNewEvent = { ...newEvent };
        copyOfNewEvent[event.target.id] = event.target.value;
        setNewEvent(copyOfNewEvent);
    };


    return (
        <form className="eventForm">
            <h2 className="eventForm__game">Register New Event</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Event Title: </label>
                    <input type="text" name="title" id="title" required autoFocus className="form-control"
                        value={newEvent.title}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <select name="game" id="game" onChange={(handleInputChange)} >
                    <option value="0"  className="form-control">Select Game</option>
                        {games.map(game => (
                            <option key={`game--${game.id}`} value={game.id}>
                                {game.name} 
                            </option>
                        ))}
            </select>
        

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" id="description" required autoFocus className="form-control"
                        value={newEvent.description}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="number">Amount of Players Recommended: </label>
                    <input type="number" name="number" id="number" required autoFocus className="form-control"
                        value={newEvent.number}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" id="date" required autoFocus className="form-control"
                        value={newEvent.date}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" id="time" required autoFocus className="form-control"
                        value={newEvent.time}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        organizer: token,
                        game: newEvent.game,
                        title: newEvent.title,
                        description: newEvent.description,
                        date: newEvent.date,
                        time: newEvent.time

                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}