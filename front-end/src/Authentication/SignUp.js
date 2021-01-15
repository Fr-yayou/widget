import React, { Component } from 'react'
import { connect } from 'react-redux';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import Google from "../Google";
import PropTypes from 'prop-types';
import Footer from './../Footer';
import Dashboard from './../Dashboard'
import {
  Alert
} from 'reactstrap';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      email: '',
      password: '',
      msg: null,
    }
  }

  static proprTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check fo register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.message })
      } else {
        this.setState({ msg: null })
      }
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }
    this.props.register(newUser);
    this.setState({
      username: '',
      email: '',
      password: '',
      msg: null
    })
    //this.props.history.push("/dashboard");
  }

  render() {
    return (
      <div>
        { this.props.isAuthenticated ? <Dashboard /> :
          <div className="outer">
            <div className="center-screen">
              <div className="inner">
                <form onSubmit={this.onSubmit}>
                  <h3>Sign up</h3>
                  {this.state.msg ? <Alert color="danger"> {this.state.msg} </Alert> : null}
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                    />
                  </div>

                  <button type="submit" className="btn btn-dark btn-lg btn-block">
                    Register
                  </button>
                  <p className="forgot-password text-right">
                    Already signed up ? <a href="/dashboard">Sign in</a>
                  </p>
                </form>
                <Google></Google>
              </div>

            </div>
            <Footer></Footer>
          </div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});
export default connect(mapStateToProps, { register, clearErrors })(
  SignUp
);