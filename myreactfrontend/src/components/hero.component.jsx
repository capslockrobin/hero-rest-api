import React, { Component } from "react";
import HeroesDataService from "../services/hero.service";
// import "bootstrap/dist/css/bootstrap.min.css";

export default class Hero extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePower = this.onChangePower.bind(this);
    this.onChangeSpeed = this.onChangeSpeed.bind(this);
    this.getHero = this.getHero.bind(this);
    this.updateHero = this.updateHero.bind(this);
    this.deleteHero = this.deleteHero.bind(this);

    this.state = {
      currentHero: {
        id: null,
        name: "",
        power: 1,
        speed: 1,
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getHero(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentHero: {
          ...prevState.currentHero,
          name: name
        }
      };
    });
  }

  onChangePower(e) {
    const power = e.target.value;
    
    this.setState(prevState => ({
      currentHero: {
        ...prevState.currentHero,
        power: power
      }
    }));
  }

   onChangeSpeed(e) {
    const speed = e.target.value;
    
    this.setState(prevState => ({
      currentHero: {
        ...prevState.currentHero,
        speed: speed
      }
    }));
  }

  getHero(id) {
    HeroesDataService.get(id)
      .then(response => {
        this.setState({
          currentHero: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateHero() {
    HeroesDataService.update(
      this.state.currentHero.id,
      this.state.currentHero
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The hero was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteHero() {    
    HeroesDataService.delete(this.state.currentHero.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/heroes')
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { currentHero } = this.state;

    return (
      <div>
        {currentHero ? (
          <div className="edit-form">
            <h4>Hero</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentHero.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="power">power</label>
                <input
                  type="number"
                  className="form-control"
                  id="power"
                  value={currentHero.power}
                  onChange={this.onChangePower}
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
                  id="speed"
                  value={currentHero.speed}
                  onChange={this.onChangeSpeed}
                  required
                  max="5"
                  min="1"
                />
              </div>
            </form>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteHero}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateHero}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Hero</p>
          </div>
        )}
      </div>
    );
  }
}