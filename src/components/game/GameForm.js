import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = ({token}) => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [newGame, setNewGame] = useState({
        // gamer: token,
        name: "",
        game_type: 0,
        maker: "",
        num_of_players: 0,
        skill_level: ""
    })

    useEffect(() => {
        getGameTypes().then((data) => setGameTypes(data))
    }, [])   

    const handleInputChange = (event) => {
        const copyOfNewGame = { ...newGame };
        copyOfNewGame[event.target.id] = event.target.value;
        setNewGame(copyOfNewGame);
    };


    return (
        <form className="gameForm">
            <h2 className="gameForm__name">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Game Name: </label>
                    <input type="text" name="name" id="name" required autoFocus className="form-control"
                        value={newGame.name}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <select name="game_type" id="game_type" onChange={(handleInputChange)} >
                    <option value="0"  className="form-control">Select Game Category</option>
                        {gameTypes.map(game_type => (
                            <option key={`game_type--${game_type.id}`} value={game_type.id}>
                                {game_type.category} 
                            </option>
                        ))}
            </select>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" id="maker" required autoFocus className="form-control"
                        value={newGame.maker}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="num_of_players">Amount of Players Recommended: </label>
                    <input type="number" name="num_of_players" id="num_of_players" required autoFocus className="form-control"
                        value={newGame.num_of_players}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="text" name="skill_level" id="skill_level" required autoFocus className="form-control"
                    placeholder="Easy, difficult, ill-advised for the faint-hearted..."
                        value={newGame.skill_level}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        gamer: token,
                        name: newGame.name,
                        game_type: newGame.game_type,
                        maker: newGame.maker,
                        num_of_players: newGame.num_of_players,
                        skill_level: newGame.skill_level

                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}