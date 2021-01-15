import React, { Component } from "react";
import { Table } from "reactstrap";
import Switch from "@material-ui/core/Switch";

export class JokesWidget extends Component {
  state = {
    single_post_mode: true,
    jokes: [],
    timer_id: null,
    timer_interval: 100000000,
  };

  fetchJokes = () => {
    fetch("https://official-joke-api.appspot.com/random_ten")
      .then((response) => response.json())
      .then((data) => this.setState({ jokes: data.slice(0, 4) }));
  };

  componentDidMount() {
    this.fetchJokes();
    const timer = setInterval(
      () => this.fetchJokes(),
      this.state.timer_interval,
    );
    this.setState({ timer_id: timer });
  }

  setTimer = (e) => {
    return this.setState({ [e.target.name]: e.target.value });
  };

  editTimer = (e) => {
    e.preventDefault();
    this.setState({
      set_timer: this.state.timer_interval,
    });
    clearInterval(this.state.timer_id);
    this.setState({
      timer_id: setInterval(() => this.fetchJokes(), this.state.timer_interval),
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  render() {
    return (
      <div className="inner-joke">
        <div className="d-flex justify-content-between align-items-center">
          <img
            className="img-fluid mb-2 mr-2"
            src={
              this.state.single_post_mode
                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Emojione_1F602.svg/1920px-Emojione_1F602.svg.png"
                : "https://images.emojiterra.com/google/android-10/512px/1f620.png"
            }
            alt=""
            style={{ width: "50px", height: "50px" }}
          />
          <h3>Random Jokes</h3>
          <p className="single_post">
            <Switch
              checked={this.state.single_post_mode}
              onChange={this.handleChange}
              name="single_post_mode"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </p>
        </div>
        {!this.state.single_post_mode ? (
          <div className="text-center pt-4">
            I'm in no mood to read jokes today
          </div>
        ) : (
            <div>
              <Table size="sm">
                <thead>
                  <tr>
                    <th>Setup</th>
                    <th>Punchline</th>
                  </tr>
                </thead>
                {this.state.jokes.map((joke, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td className="punchline">{joke.setup}</td>
                        <td className="blurry-text">{joke.punchline}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
              <form
                style={{ width: "100%" }}
                className="d-flex mb-3"
                onSubmit={this.editTimer}
              >
                <input
                  onChange={this.setTimer}
                  name="timer_interval"
                  className="form-control"
                  type="text"
                  placeholder="Set refresh"
                  aria-label="Search"
                  value={this.state.timer_interval}
                ></input>
                <button className="btn btn-primary" type="submit">
                  Change
                </button>
              </form>
            </div>
          )}
      </div>
    );
  }
}
export default JokesWidget;
