import React from 'react';
import './App.css';
// import GetPokemonsData from './Data';


class Pokemon extends React.Component {

  render() {
    let i = this.props.value;
    return (<li key={i}>{i}</li>);
  }
}

class Board extends React.Component {
  // constructor(props) {
  //   super(props);

  //   let pokemonsList = GetPokemonsData();
  //   console.log(pokemonsList);
  // }

  render() {
    let pokemons = [];

    for (let i = 0; i < this.props.size; i++) {
      pokemons.push(<Pokemon value={i}/>);
    }

    return (
      <div><ul>{pokemons}</ul></div>
    )
  }
}

function App() {
  return (
    <Board size="10" />
  );
}

export default App;
