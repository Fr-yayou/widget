// import Google from "./Google"
// import Weather from "./Forecast/Weather"
import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../App.css";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react'
import Logout from './../Authentication/Logout'
import { NavItem } from "reactstrap";

export class Navbar extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong>{user && user.username ? `Welcome ${user.username}` : ''}</strong>
          </span>
        </NavItem>
        <li className="nav-item">
          <Logout />
        </li>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Sign in
                  </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/sign-up">
            Sign up
                  </Link>
        </li>
      </Fragment>
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/dashboard">
            DevDash
            </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(
  Navbar
);