import * as React from 'react';

import TopContent from '../components/TopContent';
import BookContent from '../components/BookContent';
import Header from '../components/Header';

import { AuthService } from '../services/AuthService';

import logo from '../images/logo.svg';
import './App.css';

class App extends React.Component {
  public render() {
    let authService = new AuthService();
    async function isAuthenticated() {
      return await authService.isAuthenticated();  
    }
    return (
      <div className="App">
        <Header pageTitle="Book Manager" logoSrc={logo} />
        <div className="container">
        <div className="row">
          <div className="col">
            <TopContent />
          </div>
        </div>
        {isAuthenticated() &&
        <div className="row">
          <div className="col">
            <BookContent />
          </div>
        </div>}
        </div>
      </div>
    );
  }
}

export default App;
