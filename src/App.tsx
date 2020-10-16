import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { BibleIndexPage } from './pages/bible/BibleIndexPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
      </div>

      <div className="App">
      </div>

      <Switch>
        <Route exact path="/">
          <BibleIndexPage />
        </Route>

        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

