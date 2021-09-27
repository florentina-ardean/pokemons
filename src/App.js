import React from 'react';
import './App.css';
import GetPokemonsData from './Data.js'

class Pokemon extends React.Component {
  getPokemonTypesComponent(types, pokemon_id) {
    let typesComponents = [];
    types.forEach(type => {
      typesComponents.push(<span className="type" key={pokemon_id + type.name}>{type.name}</span>);
    });
    return typesComponents
  }

  render() {
    let pokemon = this.props.pokemon;
    return (
      <div className="item">
        <div><img src={pokemon.sprites.front_default} alt={pokemon.name}></img></div>
        <div className="name">{pokemon.id} {pokemon.name}</div>
        <div>{this.getPokemonTypesComponent(pokemon.types, pokemon.id)}</div>
      </div>);
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    GetPokemonsData().then(result => this.setState({ data: result.allPokemon }));
  }

  getPokemonListComponent(pokemons) {
    let pokemonsComponentList = []
    pokemons.forEach(pokemon => {
      pokemonsComponentList.push(<Pokemon pokemon={pokemon} key={pokemon.id} />);
    });
    return pokemonsComponentList;
  }

  handleSearchInputChange(event) {
    console.log(event);
    const searchText = event.target.value;
    this.filterResultsbyName(searchText, GetPokemonsData());
  }

  filterResultsbyName(searchText, dataPromise) {
    dataPromise.then(result => result.allPokemon
      .filter(pokemon => pokemon.name.includes(searchText)))
      .then(filtered => this.setState({ data: filtered }));
  }

  handleSort(field, direction) {
    if (!field || field !== "name" || !direction)
      return;

    if (field === "name") {
      GetPokemonsData().then(result => result.allPokemon
        .sort((pokemonA, pokemonB) => this.compare(pokemonA.name, pokemonB.name, direction)))
        .then(sorted => this.setState({ data: sorted }));
    }
  }

  compare(text1, text2, direction) {
    if (direction === "asc")
      return (text1 < text2) ? -1 : 1;
    else
      return (text1 < text2) ? 1 : -1;
  }

  render() {
    return (
      <div>
        <div className="header">
          <div><h1>Pokedex</h1></div>
          <div>
            <input className="name" type="text" onChange={this.handleSearchInputChange} />
            <button onClick={() => this.handleSort("name", "asc")}>Sort by name asc</button>
            <button onClick={() => this.handleSort("name", "desc")}>Sort by name desc</button>
          </div>
        </div>
        <div className="container">{this.getPokemonListComponent(this.state.data)}</div>
        <div className="footer">by Flo</div>
      </div>
    )
  }
}

function App() {
  return (
    <Board />
  );
}

export default App;