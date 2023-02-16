import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEvents } from "../../managers/EventManager"

export const EventList = (props) => {

    const navigate = useNavigate()
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (<>

        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/events/new" })
            }}
        >Register New Event</button>

        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event?.title} </div>
                        <div className="event__game">Game: {event?.game?.name}</div>
                        <div className="event__description">Description: {event?.description}</div>
                        <div className="event__date">Date: {event?.date} @ {event?.time}</div>
                    </section>
                })
            }
        </article>
        </>
    )
}