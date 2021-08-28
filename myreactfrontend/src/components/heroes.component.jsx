import React, { Component } from "react";
import HeroesDataService from "../services/hero.service";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

export default class HeroesList extends Component {
  constructor(props) {
    super(props);
    this.retrieveHeroes = this.retrieveHeroes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveHero = this.setActiveHero.bind(this);

    this.state = {
      heroes: [],
      currentHero: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveHeroes();
  }

  retrieveHeroes() {
    HeroesDataService.getAll()
      .then(response => {
        this.setState({
          heroes: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveHeroes();
    this.setState({
      currentHero: null,
      currentIndex: -1
    });
  }

  setActiveHero(hero, index) {
    this.setState({
      currentHero: hero,
      currentIndex: index
    });
  }


 render() {
    const {heroes, currentHero, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Heroes List</h4>

          <ul className="list-group">
            {heroes &&
              heroes.map((hero) => (
                <li
                  className={
                    "list-group-item poiner " +
                    (hero.id === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveHero(hero, hero.id)}
                  key={hero.id}
                >
                  {hero.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentHero ? (
            <div>
              <h4>Hero</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentHero.name}
              </div>
              <div>
                <label>
                  <strong>Power:</strong>
                </label>{" "}
                {currentHero.power}
              </div>
              <div>
                <label>
                  <strong>Speed:</strong>
                </label>{" "}
                {currentHero.speed}
              </div>
              <Link
                to={"/heroes/" + currentHero.id}
                className="edit-button badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Hero</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}