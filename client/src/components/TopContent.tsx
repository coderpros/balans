import * as React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import { ApiService } from '../services/ApiService';
import { AuthService } from '../services/AuthService';

import AuthContent from './AuthContent';
import Buttons from './Buttons';
import {Constants} from '../helpers/Constants';

export default class TopContent extends React.Component<any, any> {
  public authService: AuthService;
  public apiService: ApiService;
  private shouldCancel: boolean;

  constructor(props: any) {
    super(props);

    this.authService = new AuthService();
    this.apiService = new ApiService();

    this.state = { user: {}, api: {} };
    this.shouldCancel = false;
  }

  public componentDidMount() {
    this.getUser();
  }

  public login = () => {
    this.authService.login();
  };

  public editProfile = () => {
    this.authService.editProfile();
  }

  public callApi = () => {
    this.apiService
      .callApi()
      .then(data => {
        this.setState({ api: data.data });
        toast.success('Api successfully returned data, check in section - Api response');
      })
      .catch(error => {
        toast.error(error);
      });
  };

  public componentWillUnmount() {
    this.shouldCancel = true;
  }

  public renewToken = () => {
    this.authService
      .renewToken()
      .then(user => {
        toast.success('Token has been sucessfully renewed. :-)');
        this.getUser();
      })
      .catch(error => {
        toast.error(error);
      });
  };

  public logout = () => {
    this.authService.logout();
    toast.info('You have been logged out.');
  };

  public getUser = () => {
    this.authService.getUser().then(user => {
      if (user) {
        toast.success('User has been successfully loaded from store.');
      } else {
        // toast.info('You are not logged in.');
      }

      if (!this.shouldCancel) {
        this.setState({ user });
      }
    });
  };

  public async isAuthenticated(): Promise<boolean> {
    var authenticated = await this.authService.isAuthenticated();
    
    return authenticated;
  }

  public render() {
    return (
      <>
        <ToastContainer />

        <Buttons
          login={this.login}
          logout={this.logout}
          renewToken={this.renewToken}
          getUser={this.getUser}
          callApi={this.callApi}
          editProfile={this.editProfile}
        />
        
        {Constants.debug &&
          <AuthContent api={this.state.api} user={this.state.user} />
        }
      </>
    );
  }
}
