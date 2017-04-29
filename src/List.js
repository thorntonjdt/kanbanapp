import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Card from './Card';
import constants from './constants';

const listTargetSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updateStatus(draggedId, props.id)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class List extends Component {
  render(){
    const { connectDropTarget } = this.props;
    let style = { borderRightColor: this.props.color };
    var cards = this.props.cards.map((card) => {
      return <Card key={card.id}
                   id={card.id}
                   title={card.title}
                   description={card.description}
                   date={card.date}
                   status={card.status}
                   color={this.props.color}
                   cardCallbacks={this.props.cardCallbacks} {...card} />
    });

    return connectDropTarget(
        <div className="list">
          <div className="list_label">
            <h1 style={style}>{this.props.title}</h1>
          </div>
          {cards}
        </div>
    );
  }
}

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);
