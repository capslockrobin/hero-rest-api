import React, { Component } from "react";
import HeroesDataService from "../services/hero.service";

export default class AddHero extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePower = this.onChangePower.bind(this);
     this.onChangeSpeed = this.onChangeSpeed.bind(this);
    this.saveHero = this.saveHero.bind(this);
    this.newHero = this.newHero.bind(this);

    this.state = {
      id: null,
      name: "",
      power: "", 
      speed: "", 
      published: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangePower(e) {
    this.setState({
      power: e.target.value
    });
  }

  onChangeSpeed(e) {
    this.setState({
      speed: e.target.value
    });
  }

  saveHero() {
    var data = {
      name: this.state.name,
      power: this.state.power,
      speed: this.state.speed
    };

    HeroesDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          power: response.data.power,
          speed: response.data.speed,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newHero() {
    this.setState({
      id: null,
      name: "",
      power: "",
      published: false,

      submitted: false
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
          <div>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
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
                onChange={this.onChangePower}
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
                onChange={this.onChangeSpeed}
                name="speed"
                 required
                  max="5"
                  min="1"
              />
            </div>

            <button onClick={this.saveHero} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}