import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Preview from './Preview';
import app from '../public/img/app.png';
import kanban from '../public/img/kanban.png';
import soon from '../public/img/soon.png';

class LandingPage extends Component {
  constructor(){
    super();
    this.state = {
      showKanban: false
    }
  }
  render(){
    let preview;
    if(this.state.showKanban){
      preview = <Preview img={app}
               stat={"Loading..."} />
    }
    return(
      <div className="landing_page">
        <div className="apps">
          <div className="selector">
          <div className="img_cntr">
            <Link to="/kanban">
              <img src={kanban}
                 onMouseEnter={
                   () => this.setState({showKanban: true})
                 }
                 onMouseLeave={
                   () => this.setState({showKanban: false})
                 }/>
              </Link>
          </div>
          <div className="img_cntr">
            <img src={soon} />
          </div>
        </div>
          <h1 className="comingsoon">Coming Soon!</h1>
          {preview}
        </div>
      </div>
    );
  }
}

export default LandingPage;
