import React from 'react';
import '../App.scss';
import fetchData from '../services/FetchData';
import CharacterList from './CharacterList';
import Filters from './Filters';
import CharacterDetails from './CharacterDetails';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputValue = this.handleInputValue.bind(this);
    this.renderCharacterDetail=this.renderCharacterDetail.bind(this);
    this.state = {
      data: [],
      value: ''
    }
  }


  componentDidMount() {
    fetchData()
      .then(data => {
        this.setState({
          data: data.results
        })
      })
  }

  handleInputValue(inputValue) {
    this.setState({
      value: inputValue
    })
  }

  renderCharacterDetail(props){
    console.log(props.match.params.id)
    const routeId = props.match.params.id;
    const characters = this.state.data;
    for (let character of characters ){
      if(character.id === routeId){
        return <CharacterDetails charactObj={character} />
      }
    }

  }



  render() {
    console.log(this.state.data)
    return (
      <div className="App">
        <Switch>
        <Route exact path="/">
        <h1>Rick and Morty</h1>
        <Filters handleInputValue={this.handleInputValue}
        />
        <CharacterList
          data={this.state.data}
          inputValue={this.state.value}

        />
        </Route>
        <Route path="character/id:" render={this.renderCharacterDetail}/>
        </Switch>
      </div>
    );
  }
}

export default App;
