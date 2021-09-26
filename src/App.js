import React from 'react';
import './App.css';
import GetPokemonsData from './Data.js'


class Pokemon extends React.Component {
  getPokemonTypesComponent(types) {
    let typesComponents = [];
    types.forEach(type => {
      typesComponents.push(<span className="type">{type.name}</span>);
    });
    return typesComponents
  }

  render() {
    let pokemon = this.props.pokemon;

    return (
      <div className="item">
        <div><img src={pokemon.sprites.front_default} alt={pokemon.name}></img></div>
        <div className="name">{pokemon.id} {pokemon.name}</div>
        <div>{this.getPokemonTypesComponent(pokemon.types)}</div>
      </div>);
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
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
      pokemonsComponentList.push(<Pokemon pokemon={pokemon} key={pokemon.id}/>);
    });

    return pokemonsComponentList;
  }

  handleChange(event) {
    console.log(event);
    const searchText = event.target.value;

  GetPokemonsData().then(result => result.allPokemon
    .filter(pokemon => pokemon.name.includes(searchText)))
    .then(filtered => this.setState({ data: filtered }) );
  
  }

  render() {
    return (
      <div>
        <div className="header">
          <div><h1>Pokedex</h1></div>
          <div><input className= "name" type="text"  onChange={this.handleChange}/></div>
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