import React, { Component } from "react";
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import PropTypes from 'prop-types';
import { clearErrors } from '../actions/errorActions';
import Footer from './../Footer';
import "./../App.css";

export class SignIn extends Component {

    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
            msg: null
        }
    }
    static proprTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
    };
    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            // Check fo register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.message })
            } else {
                this.setState({ msg: null })
            }
        }
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
        const userConnected = {
            email: this.state.email,
            password: this.state.password,
        }
        //Attempt to login
        this.props.login(userConnected);
        this.setState({
            email: '',
            password: '',
            msg: null
        })
    }
    render() {
        return (
            <div className="outer">
                <div className="inner">
                    <form onSubmit={this.onSubmit}>
                        <h3>Sign in</h3>
                        {this.state.msg ? <Alert color="danger"> {this.state.msg} </Alert> : null}
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
                        <button type="submit" className="btn btn-dark btn-lg btn-block" style={{ marginTop: 100 }}>
                            Sign in
                        </button>
                        <p className="forgot-password text-right">
                            Create an account ? <a href="/sign-up">Sign up</a>
                        </p>
                    </form>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});
export default connect(mapStateToProps, { login, clearErrors })(
    SignIn
);
