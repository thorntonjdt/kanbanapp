import React, { Component } from 'react';
import Trash from './Trash';
import AddForm from './AddForm';

class Controls extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      showAddForm: false
    };
  }
  toggleAddForm(e){
    this.setState({showAddForm: !this.state.showAddForm})
  }
  render(){
    let addForm;
    if(this.state.showAddForm) {
      addForm = (
      <div className="form-cntr" >
        <AddForm controlCallbacks={this.props.controlCallbacks} toggleAddForm={this.toggleAddForm.bind(this)} />
        <div className="overlay" onClick={this.toggleAddForm.bind(this)} />
      </div>
      );
    };
    return(
      <div className="controls" >
        <div className="float-button"
            onClick={this.toggleAddForm.bind(this)} >
          +
        </div>
        <Trash controlCallbacks={this.props.controlCallbacks} />
        {addForm}
      </div>
    );
  }
}

export default Controls;
