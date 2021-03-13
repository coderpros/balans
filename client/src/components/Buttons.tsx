import * as React from 'react';
import { AuthService } from '../services/AuthService';
import { Constants } from '../helpers/Constants';

interface IButtonsProps {
  login: () => void;
  getUser: () => void;
  callApi: () => void;
  renewToken: () => void;
  logout: () => void;
  editProfile: () => void;
}

const Buttons: React.SFC<IButtonsProps> = props => {
  let authService = new AuthService();

  authService.isAuthenticated().then(function(isAuthenticated) {
    var logoutButton = document.getElementById('logoutButton');
    var loginButton = document.getElementById('loginButton');
    var editProfileButton = document.getElementById('editProfileButton');

    if(isAuthenticated) {
      if(logoutButton != null && loginButton != null && editProfileButton != null) {
        logoutButton.style.display = "inline";
        editProfileButton.style.display = "inline";
        loginButton.style.display = "none;";
      }      
    } else {
      if(logoutButton != null && loginButton != null && editProfileButton != null) {
        logoutButton.style.display = "none";
        editProfileButton.style.display = "none";
        loginButton.style.display = "inline";
      }
    }
  })

  return (
      <div className="row">
        <div className="col-md-12 text-left" style={{ marginTop: '30px' }}>
          <a id="editProfileButton" className="btn btn-primary" style={{ margin: '10px', display: 'none' }} 
            href="https://mittbalans.b2clogin.com/MittBalans.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_react_edit&client_id=26df1c6a-8029-4b7b-b620-4c94866d3e23&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A48599%2F&scope=openid&response_type=id_token&prompt=login">
            My Profile
          </a>
          <button id="logoutButton" className="btn btn-dark btn-logout" style={{ margin: '10px', display: 'none' }} onClick={props.logout}>
            Logout
          </button>
          <button id="loginButton" className="btn btn-primary btn-login" style={{ margin: '10px', display: 'none' }} onClick={props.login}>
            Login/Register
          </button>
        </div>
      </div>
    );
}
 
export default Buttons;