import React, { Component } from 'react'
import './App.css';
import { connect } from 'react-redux';
import weather from './images/weather.png'
import clock from './images/clock.png'
import devto from './images/devto.png'
import reddit from './images/reddit.png'
import spotify from './images/spotify.png'
import joke from './images/joke.png'
import chronometer from "./images/chronometer.png"

export class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: false,
            spotify: false,
            devapi: false,
            timeapi: false,
            reddit: false,
            stopWatch: false,
            joke: false,
        };
    }

    toggleWeather = () => {
        this.props.toggleWeatherfromDash(!this.state.weather);
        this.setState({ weather: !this.state.weather });
    };
    toggleSpotify = () => {
        this.props.toggleSpotifyfromDash(!this.state.spotify);
        this.setState({ spotify: !this.state.spotify });
    };
    toggleDevAPI = () => {
        this.props.toggleDevAPIfromDash(!this.state.devapi);
        this.setState({ devapi: !this.state.devapi });
    };
    toggleTime = () => {
        this.props.toggleTimefromDash(!this.state.timeapi);
        this.setState({ timeapi: !this.state.timeapi });
    };
    toggleReddit = () => {
        this.props.toggleRedditfromDash(!this.state.reddit);
        this.setState({ reddit: !this.state.reddit });
    };
    toggleStopWatch = () => {
        this.props.toogleStopWatchfromDash(this.state.stopWatch)
        this.setState({ stopWatch: !this.state.stopWatch });
    };
    toggleJoke = () => {
        this.props.toogleJokefromDash(this.state.joke)
        this.setState({ joke: !this.state.joke });
    }

    render() {
        return (
            <div>
                { this.props.isAuthenticated ?
                    <div className="footer d-flex">
                        <div>
                            <button className="widget" onClick={this.toggleWeather}>
                                <img src={weather} style={{ width: "100%", height: "100%" }} alt="Logo" />
                            </button>
                        </div>
                        <div>
                            <button className="widget" onClick={this.toggleTime}>
                                <img src={clock} style={{ width: "100%", height: "100%" }} alt="Logo" />
                            </button>
                        </div>
                        <div>
                            <button className="widget" onClick={this.toggleDevAPI}>
                                <img src={devto} style={{ width: "100%", height: "100%" }} alt="Logo" />
                            </button>
                        </div>
                        <div>
                            <button className="widget" onClick={this.toggleReddit}>
                                <img src={reddit} style={{ width: "100%", height: "100%" }} alt="Logo" />
                            </button>
                        </div>
                        <div>
                            <button className="widget" onClick={this.toggleSpotify}>
                                <img src={spotify} style={{ width: "175%", height: "100%" }} alt="Logo" />
                            </button>
                        </div>
                        <div>
                            <button className="widget" onClick={this.toggleStopWatch}>
                                <img src={chronometer} style={{ width: "100%", height: "100%" }} alt="Logo" />
                            </button>
                        </div>
                        <div>
                            <button className="widget" onClick={this.toggleJoke}>
                                <img src={joke} style={{ width: "100%", height: "100%" }} alt="Logo" />
                            </button>
                        </div>
                    </div>
                    :
                    <div className="footer d-flex">
                        <div>
                            <button className="widget">
                                <img src={weather} style={{ width: "100%", height: "100%" }} alt="Logo" />
                            </button>
                        </div>
                        <div>
                            <button className="widget" >
                                <img src={clock} style={{ width: "100%", height: "100%" }} alt="Logo" />
                            </button>
                        </div>
                        <div>
                            <button className="widget" >
                                <img src={devto} style={{ width: "100%", height: "100%" }} alt="Logo" />
                            </button>
                        </div>
                        <div>
                            <button className="widget">
                                <img src={reddit} style={{ width: "100%", height: "100%" }} alt="Logo" />
                            </button>
                        </div>
                        <div>
                            <button className="widget">
                                <img src={spotify} style={{ width: "175%", height: "100%" }} alt="Logo" />
                            </button>
                        </div>
                        <div>
                            <button className="widget">
                                <img src={chronometer} style={{ width: "100%", height: "100%" }} alt="Logo" />
                            </button>
                        </div>
                        <div>
                            <button className="widget">
                                <img src={joke} style={{ width: "100%", height: "100%" }} alt="Logo" />
                            </button>
                        </div>
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(
    mapStateToProps
)(Footer);