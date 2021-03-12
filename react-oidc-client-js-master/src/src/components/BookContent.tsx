import * as React from 'react';

export default class BrandonContent extends React.Component<any, any> {
  private shouldCancel: boolean;

  constructor(props: any) {
    super(props);

    // this.authService = new AuthService();
    // this.apiService = new ApiService();

    // this.state = { user: {}, api: {} };
    this.shouldCancel = false;
  }

  public componentDidMount() {
    // this.getUser();
  }

  public login = () => {
    
  };

  public callApi = () => {
    
  };

  public componentWillUnmount() {
    this.shouldCancel = true;
  }

  public renewToken = () => {
    
  };

  public logout = () => {
    
  };

  public getUser = () => {
    
  };

  public render() {
    return (
      <>
      <div className="row">
        <div className="col-md-12 text-center">
          <span><b>Brandon was here!</b></span>
        </div>
      </div>
      </>
    );
  }
}
