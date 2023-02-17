import React, { useEffect, useState } from "react"
import { getGames, deleteGame } from "../../managers/GameManager.js"
import { useNavigate } from "react-router-dom"
import "./Game.css"


export const GameList = (props) => {

    const navigate = useNavigate()
    const [ games, setGames ] = useState([])    
    const [ refresh, setRefresh ] = useState(true)
    
    function refreshPage() {
        window.location.reload(false)
    }

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [,refresh])

    const handleClick = (id) => {
        deleteGame(id).then(refreshPage)
    }   
    
    return ( <>

        <article className="games">
            
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                navigate({ pathname: "/games/new" })
                }}>Register New Game</button>
            
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game?.name} by {game?.gamer?.full_name}</div>
                        <div className="game__players">{game?.num_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game?.skill_level}</div>

                        <div className="game__footer">
                                <button className="btn" onClick={() => {
                                    navigate({ pathname: `/games/${game.id}`})
                                    }}>Edit</button>
                        
                                <button className="btn" onClick={() => {
                                    handleClick(game.id)
                                    }}>Delete</button>
                        </div>

                    </section>
                })
            }

        </article>
        </>
    )
}