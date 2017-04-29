import React, { Component } from 'react';
import ConnErr from './ConnErr';
import Loading from './Loading';

class Preview extends Component {
  constructor(){
    super();
    this.state = {
      stat: '',
      error: false
    }
  }
  componentDidMount(){
    fetch('http://localhost:3001/cards/count', {method: 'get', headers: { 'Content-Type': 'application/json'}})
    .then((response) => response.json())
    .then((responseData) => {
      let fullmsg = 'Number of tasks: ' + responseData;
      this.setState({loading: false, stat: fullmsg});
    })
    .catch((error) => {
      console.log("Error connecting");
      this.setState({error: true});
    });
  }
  render(){
    let message;
    if(this.state.error){
      message = <ConnErr />;
    }
    else if(this.state.stat === ''){
      message = <Loading />;
    }
    else {
      message = this.state.stat;
    }
    return(
      <div className="preview" >
        <h1 className="preview_title">
          Kanban Board
          <h4 style={{fontSize: 10}}>{message}</h4></h1>
        <img src={this.props.img} />
      </div>
    );
  }
}

export default Preview;
