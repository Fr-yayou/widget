import React, { Component } from 'react'
import './App.css';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Weather from "./components/Forecast/Weather";
import SpotifyWidget from "./components/SpotifyWidget";
import RedditWidget from "./components/RedditWidget";
import DevAPI from "./components/DevAPI";
import TimeAPI from "./components/TimeAPI";
import Chrono from "./components/StopWatch";
import JokesWidget from "./components/JokesWidget";
import Footer from './Footer';
import SignIn from "./Authentication/SignIn";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: [
                {
                    id: 'widgetWeather',
                    display: false,
                    component: <Weather />
                },
                {
                    id: 'widgetSpotify',
                    display: false,
                    component: <SpotifyWidget />
                },
                {
                    id: 'widgetDevAPI',
                    display: false,
                    component: <DevAPI />
                },
                {
                    id: 'widgetTime',
                    display: false,
                    component: <TimeAPI />
                },
                {
                    id: 'widgetReddit',
                    display: false,
                    component: <RedditWidget />
                },
                {
                    id: 'widgetChrono',
                    display: false,
                    component: <Chrono />
                },
                {
                    id: 'widgetJoke',
                    display: false,
                    component: <JokesWidget />
                },
            ]
        };
    }

    static proprTypes = {
        isAuthenticated: PropTypes.bool,
    };

    toggleWeather = (bool) => {
        this.setState(prevState => ({
            widgets: prevState.widgets.map((obj) => {
                return obj.id === 'widgetWeather' ? Object.assign(obj, { display: bool }) : obj
            })
        }));
    };

    toggleSpotify = (bool) => {
        this.setState(prevState => ({
            widgets: prevState.widgets.map((obj) => {
                return obj.id === 'widgetSpotify' ? Object.assign(obj, { display: bool }) : obj
            })
        }));
    };

    toggleDevAPI = (bool) => {
        this.setState(prevState => ({
            widgets: prevState.widgets.map((obj) => {
                return obj.id === 'widgetDevAPI' ? Object.assign(obj, { display: bool }) : obj
            })
        }));
    };

    toggleTime = (bool) => {
        this.setState(prevState => ({
            widgets: prevState.widgets.map((obj) => {
                return obj.id === 'widgetTime' ? Object.assign(obj, { display: bool }) : obj
            })
        }));
    };

    toggleReddit = (bool) => {
        this.setState(prevState => ({
            widgets: prevState.widgets.map((obj) => {
                return obj.id === 'widgetReddit' ? Object.assign(obj, { display: bool }) : obj
            })
        }));
    };

    toggleStopWatch = (bool) => {
        this.setState(prevState => ({
            widgets: prevState.widgets.map((obj) => {
                return obj.id === 'widgetChrono' ? Object.assign(obj, { display: bool }) : obj
            })
        }));
    };

    toggleJoke = (bool) => {
        this.setState(prevState => ({
            widgets: prevState.widgets.map((obj) => {
                return obj.id === 'widgetJoke' ? Object.assign(obj, { display: bool }) : obj
            })
        }));
    };

    handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(this.state.widgets);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        this.setState({
            widgets: items
        })
    }

    render() {
        return (
            <div>
                { this.props.isAuthenticated ?
                    <div>
                        <DragDropContext onDragEnd={this.handleOnDragEnd}>
                            <Droppable droppableId="widgets">
                                {(provided) => (
                                    <ul className="d-flex flex-wrap align-items-center widgets" {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.state.widgets.map(({ id, display, component }, index) => {
                                            return (
                                                <Draggable key={id} draggableId={id} index={index}>
                                                    {(provided) => (
                                                        <div className="myWidg" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <div className={this.state.widgets[index].display ? 'block' : 'none'} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                                                {component}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <Footer toggleWeatherfromDash={this.toggleWeather}
                            toggleSpotifyfromDash={this.toggleSpotify}
                            toggleDevAPIfromDash={this.toggleDevAPI}
                            toggleTimefromDash={this.toggleTime}
                            toggleRedditfromDash={this.toggleReddit}
                            toogleStopWatchfromDash={this.toggleStopWatch}
                            toogleJokefromDash={this.toggleJoke}
                        ></Footer>
                    </div>
                    :
                    <div className="center-screen">
                        <SignIn />
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
)(Dashboard);