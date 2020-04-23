import React, {Component} from 'react';
import Game from "./Game.js"
import games from "./games.js"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: games.map(item => {
                return {...item, edit: false}
            }),
            counter: 1234,
            search: "",
            sortingField: "name",
            sortingDirection: "ascending"
        }


        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.addNew = this.addNew.bind(this)
        this._getNewKey = this._getNewKey.bind(this)
    }

    handleDelete(id) {
        console.log(id)
        let newGames = this.state.games.filter(item => item.id !== id)
            this.setState({
            games: newGames
        })
    }

    handleEdit(id) {
        let updatedGames = this.state.games.map(item => {
            if (item.id === id) {
                return {...item, edit: !item.edit}
            }
            return item
        })
        this.setState({games: updatedGames})
    }

    handleChange(event, id) {
        const {name, value} = event.target
        let updatedGames = this.state.games.map(item => {
            if (item.id === id) {
                return {...item, [name]: value}
            }
            return item
        })
        this.setState({games: updatedGames})
    }

    handleSelect(event) {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    _getNewKey() {
        let counterNow = this.state.counter
        this.setState({counter: counterNow + 1})
        return counterNow
    }

    addNew() {
        let newGame = {
            id: this._getNewKey(),
            name: "Add name...",
            rating: 0,
            description: "Add description...",
            edit: true
        }
        this.setState(prevState => {
            return {
                games: [...prevState.games, newGame]
            }
        })
    }

    render() {
        let {sortingField, sortingDirection, search} = this.state
        let gamesFiltered = this.state.games
        if (search.length > 0) {
            gamesFiltered = this.state.games.filter(game =>
                game.name.toLowerCase().includes(search) ||
                game.description.toLowerCase().includes(search) ||
                game.rating.toString().includes(search)
            )
        }

        let gamesSorted = []
        if (sortingField === "rating") {
            gamesSorted = gamesFiltered.sort((first, second) => {
                return first[sortingField] - second[sortingField]
            })
        }
        else {
            gamesSorted = gamesFiltered.sort((first, second) => {
                return first[sortingField].localeCompare(second[sortingField])
            })
        }
        if (sortingDirection === "descending") gamesSorted = gamesSorted.reverse()

        let gamesRows = gamesSorted.map((item) => {
        return (
            <Game
                key={item.id}
                data={item}
                edit={this.handleEdit}
                delete={this.handleDelete}
                change={this.handleChange}
            />
            )
        })

        return (
            <div>
                <header> <h2>Games Collection</h2> </header>
                <div id="content">
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col"> Cover              </th>
                                <th scope="col"> Name               </th>
                                <th scope="col"> Rating (out of 10) </th>
                                <th scope="col"> Description        </th>
                                <th scope="col">
                                    Search: <br />
                                    <input name="search"
                                           value={this.state.search}
                                           onChange={event => this.setState({search: event.target.value})}
                                    />
                                    Sort by: <br/>
                                    <select name="sortingField"
                                            value={this.state.sortingField}
                                            onChange={event => this.handleSelect(event)}>
                                        <option value="name">  Name  </option>
                                        <option value="rating">Rating </option>
                                    </select>
                                    <br/>
                                    Direction:
                                    <select name="sortingDirection"
                                            value={this.state.sortingDirection}
                                            onChange={event => this.handleSelect(event)}>
                                        <option value="ascending"> Ascending  </option>
                                        <option value="descending">Descending </option>
                                    </select>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {gamesRows}
                        </tbody>
                    </table>

                    <button id="add-new-button" className="btn btn-success"
                            onClick={this.addNew}>
                        Add new
                    </button>
                </div>
                <footer> <h5> Made by Aleksy Królczyk </h5> </footer>
            </div>
        )
    }

}

export default App;
