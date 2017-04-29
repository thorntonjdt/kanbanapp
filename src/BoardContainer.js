import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react-addons-update';
import {throttle} from './utils';
import Board from './Board';
import Controls from './Controls';
import ConnErr from './ConnErr';
import Loading from './Loading';
import 'whatwg-fetch';
import '../public/App.css';

const API_URL = 'http://localhost:3001';
const API_HEADERS = {
 'Content-Type': 'application/json'
};

class BoardContainer extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      cards: [],
      loading: false,
      error: false
    };
    this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
    this.updateCardPosition = throttle(this.updateCardPosition.bind(this),500);
  }
  componentDidMount(){
    this.setState({loading: true});
    fetch(API_URL+'/cards', {headers: API_HEADERS})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({cards: responseData, loading: false});
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
      this.setState({error: true, loading: false});
    });
  }
  toggleAddForm(){
    this.setState({showAddForm: !this.state.showAddForm})
  }
  updateCardStatus(cardId, listId){
    let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
    let card = this.state.cards[cardIndex];
    if(card.status !== listId){
      this.setState(update(this.state, {
        cards: {
          [cardIndex]: {
            status: { $set: listId}
          }
        }
      }));
    }
  }
  updateCardPosition(cardId, afterId){
    if(cardId !== afterId) {
      let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
      let card = this.state.cards[cardIndex]
      let afterIndex = this.state.cards.findIndex((card)=>card.id === afterId);
      this.setState(update(this.state, {
        cards: {
          $splice: [
            [cardIndex, 1],
            [afterIndex, 0, card]
          ]
        }
      }));
    }
  }
  persistCardDrag (cardId, status) {
    let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
    let card = this.state.cards[cardIndex];
    if(card === undefined) return;
    this.setState({loading: true});
    fetch(`${API_URL}/cards`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({status: card.status, id: card.id})
    })
    .then((response) => {
      this.setState({loading: false});
      if(!response.ok){
        // Throw an error if server response wasn't 'ok'
        // so you can revert back the optimistic changes
        // made to the UI.
        throw new Error("Server response wasn't OK")
      }
    })
    .catch((error) => {
      console.error("Fetch error:",error);
      this.setState(
        update(this.state, {
          cards: {
            [cardIndex]: {
              status: { $set: status }
            }
          }
        })
      );
      this.setState({error: true});
    });
  }
  addCard(card) {
    let prevState = this.state;

    if(card.id===null){
      let card = Object.assign({}, card, {id:Date.now()})
    }

    let nextState = update(this.state.cards, { $push: [card]});

    this.setState({cards:nextState});
    this.setState({loading: true});
    fetch(`${API_URL}/cards`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(card)
    })
    .then((response) => {
     this.setState({loading: false});
      if(response.ok){
        return response.json()
      } else {
        throw new Error("Server response wasn't OK")
      }
    })
    .then((responseData) => {
      card.id = responseData.id;
      this.setState({cards:nextState});
    })
    .catch((error) => {
      this.setState(prevState);
      this.setState({error: true})
    });
  }
  deleteCard(cardId) {
    let prevState = this.state;
    let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
    let nextState = update(this.state.cards, { $splice: [[cardIndex, 1]] });
    this.setState({cards:nextState});
    this.setState({loading: true});
    fetch(`${API_URL}/cards`, {
      method: 'delete',
      headers: API_HEADERS,
      body: JSON.stringify({id: cardId})
    })
    .then((response) => {
     this.setState({loading: false});
      if(!response.ok){
        // Throw an error if server response wasn't 'ok'
        // so you can revert back the optimistic changes
        // made to the UI.
        throw new Error("Server response wasn't OK")
      }
    })
    .catch((error) => {
      this.setState(prevState);
      this.setState({error: true});
    });
  }

  render(){
    let connstatus;
    if(this.state.loading){
      connstatus = <Loading />;
    }
    else if(this.state.error){
      connstatus = <ConnErr />;
    }
    return(
      <div className="container">
        <div className="connstatus">{connstatus}</div>
        <Controls controlCallbacks={{
          addCard: this.addCard.bind(this),
          deleteCard: this.deleteCard.bind(this)
        }}/>
       <Board cards={this.state.cards}
                  cardCallbacks={{
                    updateStatus: this.updateCardStatus,
                    updatePosition: this.updateCardPosition,
                    persistCardDrag: this.persistCardDrag.bind(this),
                  }} />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(BoardContainer);
