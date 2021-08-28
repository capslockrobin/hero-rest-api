import React, { Component } from "react";
import HeroesDataService from "../services/hero.service";

export default class AddHero extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.saveHero = this.saveHero.bind(this);
    this.newHero = this.newHero.bind(this);

    this.state = {
      id: null,
      name: "",
      power: 1,
      speed: 1,
      published: false,

      submitted: false,
    };
  }

  handleChange(evt) {
    const { name, value } = evt.target;

    this.setState({
      [name]: value,
    });
  }

  saveHero(event) {
    event.preventDefault();
    var data = {
      name: this.state.name,
      power: this.state.power,
      speed: this.state.speed,
    };

    HeroesDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          power: response.data.power,
          speed: response.data.speed,

          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newHero() {
    this.setState({
      id: null,
      name: "",
      power: "",
      published: false,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newHero}>
              Add
            </button>
          </div>
        ) : (
          <form onSubmit={this.saveHero}>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                minLength="3"
                value={this.state.name}
                onChange={this.handleChange}
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="power">power</label>
              <input
                type="number"
                className="form-control"
                id="power"
                value={this.state.power}
                onChange={this.handleChange}
                name="power"
                required
                max="5"
                min="1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="speed">speed</label>
              <input
                type="number"
                className="form-control"
                id="power"
                value={this.state.speed}
                onChange={this.handleChange}
                name="speed"
                required
                max="5"
                min="1"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        )}
      </div>
    );
  }
}
