import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { DragSource, DropTarget } from 'react-dnd';
import constants from './constants';

const cardDragSpec = {
  beginDrag(props) {
    document.querySelector(".trash-btn").classList.add("animate");
    return{
      id: props.id,
      status: props.status
    };
  },
  endDrag(props) {
    document.querySelector(".trash-btn").classList.remove("animate");
    props.cardCallbacks.persistCardDrag(props.id, props.status);
  }
}

const cardDropSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updatePosition(draggedId, props.id);
  }
}

let collectDrag = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  };
}

let collectDrop = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

class Card extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      showDescription: false
    };
  }

  toggleDescription() {
    this.setState({showDescription: !this.state.showDescription});
  }

  render(){
    const { connectDragSource, connectDropTarget } = this.props;
    let cardDescription;
    if(this.state.showDescription) {
      cardDescription = (
      <div className="card_details">
        <h5>Description:</h5>
        <div className="card_description">
          {this.props.description}
        </div>
        <h5>Deadline:</h5>
        <div className="card_date">
          <i>{this.props.date}</i>
        </div>
      </div>
      );
    };
    let daysLeft = Math.floor((Date.parse(this.props.date) - Date.now()) / (86400000));
    let dayStatus = 'card_days';
    if(daysLeft > 1 && daysLeft <= 3)
      dayStatus += ' soon';
    if(daysLeft === 1)
      dayStatus += ' urgent';
    if(daysLeft < 1)
      dayStatus += ' past';
    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color
    };
    return connectDropTarget(connectDragSource(
      <div className="card" onMouseOver={() => this.setState({showDescription: true })} onMouseLeave={() => this.setState({showDescription: false})}>
        <div style={sideColor} />
        <div className="card_title" >
          {this.props.title}
        </div>
        <span className={dayStatus}><b>{daysLeft}{daysLeft!==1 ? ' DAYS' : ' DAY'}</b></span>
        <ReactCSSTransitionGroup transitionName="toggle" >
        {cardDescription}
        </ReactCSSTransitionGroup>
      </div>
    ));
  }
}

const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);

export default dragDropHighOrderCard
