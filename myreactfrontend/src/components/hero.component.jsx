import React, { Component } from "react";
import HeroesDataService from "../services/hero.service";
// import "bootstrap/dist/css/bootstrap.min.css";

export default class Hero extends Component {
  constructor(props) {
    super(props);
    this.getHero = this.getHero.bind(this);
    this.updateHero = this.updateHero.bind(this);
    this.deleteHero = this.deleteHero.bind(this);
    this.handleChange = this.handleChange.bind(this);

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

  handleChange (evt) {
    const { name, value } = evt.target;

    this.setState(function(prevState){
        return{
          currentHero: {
            ...prevState.currentHero,
            [name]: value
          }
        }
    });
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

  updateHero(event) {
    event.preventDefault();
    HeroesDataService.update(
      this.state.currentHero.id,
      this.state.currentHero
    )
      .then(() => { 
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
      .then(() => {
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
            <form onSubmit={this.updateHero}>
              <div className="form-group">
                <label htmlFor="name">name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  required
                  value={currentHero.name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="power">power</label>
                <input
                  type="number"
                  className="form-control"
                  id="power"
                  name="power"
                  value={currentHero.power}
                  onChange={this.handleChange}
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
                  name="speed"
                  value={currentHero.speed}
                  onChange={this.handleChange}
                  required
                  max="5"
                  min="1"
                />
              </div>
              <button
                className="delete-button badge badge-danger mr-2"
                onClick={this.deleteHero}
              >
                Delete
              </button>

              <button
                type="submit"
                className="update-button badge badge-success"
              >
                Update
              </button>
            </form>
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