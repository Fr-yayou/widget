// import Google from "./Google"
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { loadUser } from "./actions/authActions";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import Navbar from "./components/navbar.component";
import SignUp from "./Authentication/SignUp";
import Dashboard from "./Dashboard"

export default class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
