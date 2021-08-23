import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Addhero from "./components/addhero.component";
import Hero from "./components/hero.component";
import Heroes from "./components/heroes.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/heroes" className="navbar-brand">
            Heroes of the World
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/heroes"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/heroes"]} component={Heroes} />
            <Route exact path="/add" component={Addhero} />
            <Route path="/heroes/:id" component={Hero} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
