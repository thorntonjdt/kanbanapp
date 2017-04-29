import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import constants from './constants';
import trashIcon from '../public/img/trash.png';

const trashDropSpec = {
  drop(props, monitor) {
    const droppedId = monitor.getItem().id;
    props.controlCallbacks.deleteCard(droppedId);
  },
  hover() {

  }
}
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class Trash extends Component {
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
        <img className="trash-btn" src={trashIcon} alt="Trash" />
    );
  }
}

export default DropTarget(constants.CARD, trashDropSpec, collect)(Trash);
