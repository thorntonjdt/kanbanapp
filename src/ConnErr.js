import React, { Component } from 'react';
import alert from '../public/img/alert.png';

class ConnErr extends Component {
  render(){
    return <h4><img src={alert} />Connection error</h4>
  }
}

export default ConnErr;
