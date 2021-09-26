import React from 'react';
import './App.css';
import GetPokemonsData from './Data.js'


class Pokemon extends React.Component {
  render() {
    let element = this.props.element;
    return (<li>{element.id} {element.name} {JSON.stringify(element.types)}
    <img src={element.sprites.front_default}  alt={element.name}></img>
    </li>);
  }
}

class Board extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    GetPokemonsData().then(res => this.setState({ data: res.allPokemon }));
  }
  render() {
    // console.log("client state: " + JSON.stringify(this.state.data));

    let pokemonsData = this.state.data;
    let pokemonsComponentList = []

    pokemonsData.forEach(element => {
      pokemonsComponentList.push(<Pokemon element={element} key={element.id}/>);
    });

    return (
      <div><ul>{pokemonsComponentList}</ul></div>
    )
  }
}

function App() {
  return (
    <Board/>
  );
}

export default App;