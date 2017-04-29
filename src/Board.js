import React, { Component } from 'react';
import List from './List';

class Board extends Component {

  render(){
    return (
      <div className="app">

        <List id="todo" color="#3A7E28" title="TO DO"
              cardCallbacks={this.props.cardCallbacks}
              cards={this.props.cards.filter((card) => card.status === "todo")} />

        <List id="in-progress" color="#BD8D31" title="IN PROGESS"
              cardCallbacks={this.props.cardCallbacks}
              cards={this.props.cards.filter((card) => card.status === "in-progress")} />

        <List id="done" color="#777777" title="DONE"
              cardCallbacks={this.props.cardCallbacks}
              cards={this.props.cards.filter((card) => card.status === "done")} />

      </div>
    );
  }
}

export default Board;
