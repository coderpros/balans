import * as React from 'react';
import { AuthService } from '../services/AuthService';

interface IButtonsProps {
  login: () => void;
  getUser: () => void;
  callApi: () => void;
  renewToken: () => void;
  logout: () => void;
}

const Buttons: React.SFC<IButtonsProps> = props => {
  let authService = new AuthService();

  authService.isAuthenticated().then(function(data) {
    var logoutButton = document.getElementById('logoutButton');
    var loginButton = document.getElementById('loginButton');

    if(data) {
      if(logoutButton != null && loginButton != null) {
        logoutButton.style.display = "inline";
        loginButton.style.display = "none;";
      }      
    } else {
      if(logoutButton != null && loginButton != null) {
        logoutButton.style.display = "none";
        loginButton.style.display = "inline";
      }
    }
  })

  return (
      <div className="row">
        <div className="col-md-12 text-left" style={{ marginTop: '30px' }}>
          <button id="logoutButton" className="btn btn-dark btn-logout" style={{ margin: '10px', display:'none' }} onClick={props.logout}>
            Logout
          </button>
          <button id="loginButton" className="btn btn-primary btn-login" style={{ margin: '10px', display:'none' }} onClick={props.login}>
            Login/Register
          </button>
        </div>
      </div>
    );
}
 
export default Buttons;