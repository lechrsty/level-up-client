import { Route, Routes, useParams } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { EventList } from "../components/event/EventList"
import { GameForm } from "../components/game/GameForm"
import { EditEventForm } from "../components/event/EditEventForm"
import { EditGameForm } from "../components/game/EditGameForm"
import { EventForm } from "../components/event/EventForm"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<></>} />
                <Route path="/games" element={<GameList />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/games/:gameId" element={<EditGameForm />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/events/:eventId" element={<EditEventForm />} />


            </Route>
        </Routes>
    </>
}