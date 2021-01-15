import React from 'react';
// import  {​​useHistory} from 'react-router';
import {GoogleLogin} from  "react-google-login";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from 'react-redux';
import { login_google } from './actions/authActions';



const clientId ="913862070938-4t0vdk82nu7v3iia8hfsgj3gtveqn0rv.apps.googleusercontent.com"

const Google = () => {

    let history = useHistory();

    const onSuccess = (response) => {
        axios({
            method: "POST",
            url:"http://localhost:5001/auth/google",
            data: {tokenId : response.tokenId}
        }).then(response =>{

            if(response){
                localStorage.setItem('token', response.data.token);
                history.push("/dashboard");
                window.location.reload()
            }
        })


    }

    const onFailure = (res) => {
        console.log(res)
    }
    return(
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                style={{marginTop:"100px"}}
                cookiePolicy={"single_host_origin"}

            />

        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login_google})(
    Google
);