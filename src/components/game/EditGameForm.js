import { useState, useEffect } from "react"
import { useNavigate, useParams  } from 'react-router-dom'
import { getSingleGame, getGameTypes, updateGame } from '../../managers/GameManager.js'
import "./Game.css"


export const EditGameForm = () => {

    const navigate = useNavigate()
    const { gameId } = useParams()
    const [gameTypes, setGameTypes] = useState([])

    const [updatedGame, setUpdatedGame] = useState({
        name: "",
        game_type: {},
        maker: "",
        num_of_players: 0,
        skill_level: "",
        gameTypeId: 0,
        gamer: 0
    })

    useEffect(() => {
        getGameTypes().then(data  => setGameTypes(data))
        getSingleGame(gameId).then((data) => {
            data.gameTypeId = data.game_type.id
            setUpdatedGame(data)
        })
    }, [gameId])


    const handleInputChange = (event) => {
        const copy = { ...updatedGame }
        copy[event.target.id] = event.target.value
        setUpdatedGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__name">Edit Game</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Game Name: </label>
                    <input type="text" name="name" id="name" required autoFocus className="form-control"
                        value={updatedGame.name}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                <label className="label">Select Game Category: </label>
                <select
                        name="game_type"
                        required
                        className="form-control"
                        value={updatedGame.gameTypeId}
                        onChange={(event) => {
                            const copy = { ...updatedGame }
                            copy.gameTypeId = parseInt(event.target.value)
                            setUpdatedGame(copy)
                        }}>
                        {gameTypes.map(type => ( 
                                    <option key={`game_type--${type.id}`} value={type.id} name={type.category}>{type.category}</option>                         
                            ))}
                    </select>
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" id="maker" required autoFocus className="form-control"
                        value={updatedGame.maker}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="num_of_players">Amount of Players Recommended: </label>
                    <input type="number" name="num_of_players" id="num_of_players" required autoFocus className="form-control"
                        value={updatedGame.num_of_players}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="text" name="skill_level" id="skill_level" required autoFocus className="form-control"
                    placeholder="Easy, difficult, ill-advised for the faint-hearted..."
                        value={updatedGame.skill_level}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const game = {
                        name: updatedGame.name,
                        game_type: updatedGame.gameTypeId,
                        maker: updatedGame.maker,
                        num_of_players: parseInt(updatedGame.num_of_players),
                        skill_level: updatedGame.skill_level,
                        gamer: updatedGame.gamer.id
                    }
                    
                    updateGame(gameId, game)
                    .then(() => 
                        navigate("/games"))
                }}
                className="btn gameButton">Save Changes</button>

        </form>
    )
}
