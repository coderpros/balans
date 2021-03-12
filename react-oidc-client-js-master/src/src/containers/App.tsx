import * as React from 'react';
import AppContent from '../components/AppContent';
import BrandonContent from '../components/BookContent';
import Header from '../components/Header';
import logo from '../logo.svg';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Header pageTitle="React B2C Demo with oidc-client.js" logoSrc={logo} />
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <AppContent />
            </div>
          </div>
        </div>
          <div className="col">
            <BrandonContent />
          </div>
      </div>
    );
  }
}

export default App;
