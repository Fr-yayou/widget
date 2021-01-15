import React, { Component } from "react";
import { Table } from "reactstrap";
import Switch from "@material-ui/core/Switch";

export class RedditWidget extends Component {
  state = {
    reddit_posts: [],
    single_post_mode: true,
    timer_interval: 900000,
    timer_id: "",
  };

  fetchRedditPosts = () => {
    fetch("http://www.reddit.com/r/programmerhumor/top.json")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          reddit_posts: data.data.children
            .map(({ data }) => ({
              link: "http://reddit.com" + data.permalink,
              image: data.url,
              title: data.title,
              upvotes: data.ups,
            }))
            .slice(0, 6),
        }),
      );
  };

  componentDidMount() {
    this.fetchRedditPosts();
    const timer = setInterval(
      () => this.fetchRedditPosts(),
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
      timer_id: setInterval(() => this.fetchRedditPosts(), this.state.timer_interval),
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  render() {
    return (
      <div className="inner-reddit">
        <div className="d-flex align-items-start">
          <img
            className="img-fluid mt-2 mr-3 mb-2"
            src="https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?auto=webp&s=38648ef0dc2c3fce76d5e1d8639234d8da0152b2"
            alt=""
            style={{ width: "50px", height: "50px" }}
          />
          <h5>Top post(s) from r/ProgrammerHumor</h5>
          <p className="single_post">
            <Switch
              checked={this.state.single_post_mode}
              onChange={this.handleChange}
              name="single_post_mode"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </p>
        </div>
        {this.state.single_post_mode ? (
          <div>
            {this.state.reddit_posts.length > 0 ? (
              <div className="d-flex flex-column align-items-center reddit-img">
                <a href={this.state.reddit_posts[0].link}>
                  {this.state.reddit_posts[0].title}
                </a>
                <img
                  className="img-fluid"
                  src={this.state.reddit_posts[0].image}
                  alt=""
                  style={{ maxHeight: "300px" }}
                />
              </div>
            ) : (
                "Loading Image"
              )}
          </div>
        ) : (
            <Table size="sm">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Upvotes</th>
                </tr>
              </thead>
              {this.state.reddit_posts.map((post, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>
                        <a href={post.link} target="_blank" rel="noreferrer" className="reddit-a">
                          {post.title}
                        </a>
                      </td>
                      <td>{post.upvotes}</td>
                    </tr>
                  </tbody>
                );
              })}
            </Table>
          )}
        <form
          style={{ width: "100%" }}
          className="d-flex mt-2"
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
          <button className="btn btn-primary" type="submit">Change</button>
        </form>
      </div>
    );
  }
}
export default RedditWidget;
