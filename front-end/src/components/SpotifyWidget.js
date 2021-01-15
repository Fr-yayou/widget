import React, { Component } from "react";
import queryString from "query-string";
export class SpotifyWidget extends Component {
  state = {
    artist_id: null,
    artist_name: "",
    token: "",
  };
  querySpotifyArtist = async (artist_name) => {
    try {
      const res = await fetch(
        "https://api.spotify.com/v1/search?q=" +
        artist_name.replace(" ", "").toLowerCase() +
        "&type=artist",
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + this.state.token,
          },
        },
      );
      let data = await res.json();
      data = data.artists.items[0].id;
      this.setState({
        artist_id: data,
      });
    } catch (error) {
      alert("couldn't find spotify artist");
      //window.location.href = "/";
      console.log(error);
    }
  };
  setArtistName = (e) => {
    return this.setState({ [e.target.name]: e.target.value });
  };
  searchArtist = (e) => {
    e.preventDefault();
    this.querySpotifyArtist(this.state.artist_name);
    this.setState({ artist_name: "" });
  };

  componentDidMount() {
    if (queryString.parse(window.location.search)) {
      let token = queryString.parse(window.location.search);
      this.setState({ token: token.access_token });
    }
  }

  render() {
    let spotify_player;
    if (this.state.artist_id) {
      spotify_player = (
        <iframe
          title="spotify"
          src={"https://open.spotify.com/embed/artist/" + this.state.artist_id}
          width="340"
          height="320"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      );
    } else {
      spotify_player = <div>Make a search for an artist</div>;
    }
    return (
      <div className="inner-spotify">
        <div>
          {this.state.token ? (
            <div>
              <form className="d-flex mb-2" onSubmit={this.searchArtist}>
                <input
                  onChange={this.setArtistName}
                  name="artist_name"
                  className="form-control "
                  type="text"
                  placeholder="Search Spotify artist"
                  aria-label="Search"
                  value={this.state.artist_name}
                ></input>
                <button className="btn btn-outline-success" type="submit">
                  Search
                  </button>
              </form>
              {spotify_player}
            </div>
          ) : (
              <div className="mb-2">
                <a
                  className="btn btn-primary"
                  href="http://localhost:5001/spotify/login"
                >
                  Sign in with Spotify
                </a>
              </div>
            )}
        </div>
      </div>
    );
  }
}
export default SpotifyWidget;