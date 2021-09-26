import React from 'react';
import './App.css';
import GetPokemonsData from './Data.js'


class Pokemon extends React.Component {
  
  render() {
    let element = this.props.element;

    let typesComponents = [];
    element.types.forEach(type => {
      typesComponents.push(<span className= "type">{type.name}</span>);
    });
    
    return (
    <div className="item">
      <div><img src={element.sprites.front_default}  alt={element.name}></img></div>
      <div className = "name">{element.id} {element.name}</div>
      <div>{typesComponents}</div>
    </div>);
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
    let pokemonsData = this.state.data;
    let pokemonsComponentList = []

    pokemonsData.forEach(element => {
      pokemonsComponentList.push(<Pokemon element={element} key={element.id}/>);
    });

    return (
    <div>
        <div className="header"><h1>Pokedex</h1></div>
        
        <div className="container">{pokemonsComponentList}</div>
        <div className="footer">by Flo</div>
      </div>
    )
  }
}

function App() {
  return (
    <Board/>
  );
}

export default App;