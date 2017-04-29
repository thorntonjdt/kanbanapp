import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import BoardContainer from './BoardContainer';
import LandingPage from './LandingPage';
import GitHub from '../public/img/GitHub_Logo.png';

const routes = [
  { path: '/',
    exact: true,
    sidebar: () => <h3>Home</h3>,
    main: LandingPage
  },
  { path: '/kanban',
    sidebar: () => <h3>Kanban</h3>,
    main: BoardContainer
  }
]
const App = () => (
      <Router>
        <div>
          <header>
            <Link to="/">PROJECTS</Link>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.sidebar}
              />
            ))}
          </header>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
          <footer>
            <div className="github"><a href="https://github.com/thorntja"><img src={GitHub} /></a></div>
          </footer>
        </div>
      </Router>
)

export default App;
