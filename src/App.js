import React from 'react';
import './App.css';
import GetPokemonsData from './Data.js'

class PokemonTypes extends React.Component {
  render() {
    let typesComponents = [];
    this.props.types.forEach(type => {
      typesComponents.push(<span className="type">{type.name}</span>);
    });
    return typesComponents
  }
}

class Pokemon extends React.Component {
  render() {
    let pokemon = this.props.pokemon;

    return (
      <div className="item">
        <div><img src={pokemon.sprites.front_default} alt={pokemon.name}></img></div>
        <div className="name">{pokemon.id} {pokemon.name}</div>
        <div><PokemonTypes types={pokemon.types}/></div>
      </div>);
  }
}

class PokemonList extends React.Component {
  render() {
    let pokemons = this.props.data;
    let pokemonsComponentList = []

    pokemons.forEach(pokemon => {
      pokemonsComponentList.push(<Pokemon pokemon={pokemon} />);
    });

    return pokemonsComponentList;
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    GetPokemonsData().then(res => this.setState({ data: res.allPokemon }));
  }
  render() {
    return (
      <div>
        <div className="header">
          <div><h1>Pokedex</h1></div>
        </div>
        <div className="container"><PokemonList data={this.state.data} /></div>
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