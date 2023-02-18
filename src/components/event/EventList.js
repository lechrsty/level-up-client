import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "../../managers/EventManager"
import "./Event.css"

export const EventList = (props) => {

    const navigate = useNavigate()
    const [ events, setEvents ] = useState([])
    const [ refresh, setRefresh ] = useState(true)
    
    function refreshPage() {
        window.location.reload(false)
    }

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [,refresh])

    const handleClick = (id) => {
        deleteEvent(id).then(refreshPage)
    }  

    return (<>
        
        <article className="events">

            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}>Register New Event</button>

            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event?.title} </div>
                        <div className="event__game">Game: {event?.game?.name}</div>
                        <div className="event__description">Description: {event?.description}</div>
                        <div className="event__date">Date: {event?.date} @ {event?.time}</div>

                    <div className="event__footer">
                            <button className="btn" onClick={() => {
                                navigate({ pathname: `/events/${event.id}`})
                                }}>Edit</button>
                    
                            <button className="btn" onClick={() => {
                                handleClick(event.id)
                                }}>Delete</button>
                    </div>

                    {
                                event.joined 
                                ?
                                    <button
                                    onClick={() => {
                                        leaveEvent(event.id)
                                        .then(() => {
                                            getEvents().then(data => setEvents(data))
                                        })
                                    }}>Leave</button>
                                :
                                    <button
                                    onClick={() => {
                                        joinEvent(event.id)
                                        .then(() => {
                                            getEvents().then(data => setEvents(data))
                                        })
                                    }}>Join</button>
                            }

                </section>
            })
        }

        </article>
        </>
    )
}