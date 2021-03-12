import { Log, User, UserManager, UserManagerSettings } from 'oidc-client';

// import { Constants } from '../helpers/Constants';

export class AuthService {
  public userManager: UserManager;
 
  constructor() {
    const settings = {
      // This is  the metadata endpoint
      authority: 'https://mittbalans.b2clogin.com/MittBalans.onmicrosoft.com/b2c_1_react_signup_signin/v2.0/.well-known/openid-configuration',
      // Turn off calls to user info since CORS will block it
      loadUserInfo: false, 
      // The URL where the Web UI receives the login result
      redirect_uri: 'http://localhost:48599/signin-callback.html',
      // The no longer recommended implicit flow must be used if CORS is disabled
      // If you want to use impicit flow use id_token instead of code for the return type.
      response_type: 'code',
      // Other OAuth settings
      client_id: '26df1c6a-8029-4b7b-b620-4c94866d3e23',
      // openid is required, remove https://contoso.onmicrosoft.com/test/Read if access_token is not required.
      scope: 'openid offline_access https://graph.microsoft.com/User.Read.All', 
       // Supply these details explicitly. Directly copied from azure ad b2c policy metadata endpoint.
       metadata: {
        issuer: 'https://mittbalans.b2clogin.com/e4b88224-b3bd-4dfd-8d91-3457d3b71ae1/v2.0/',
        authorization_endpoint: 'https://MittBalans.b2clogin.com/MittBalans.onmicrosoft.com/b2c_1_react_signup_signin/oauth2/v2.0/authorize',
        token_endpoint: 'https://MittBalans.b2clogin.com/MittBalans.onmicrosoft.com/b2c_1_react_signup_signin/oauth2/v2.0/token',
        jwks_uri : 'https://MittBalans.b2clogin.com/MittBalans.onmicrosoft.com/discovery/v2.0/keys?p=b2c_1_react_signup_signin',
        end_session_endpoint: "https://MittBalans.b2clogin.com/MittBalans.onmicrosoft.com/b2c_1_react_signup_signin/oauth2/v2.0/logout?post_logout_redirect_uri=http://localhost:48599/"
      },
      extraQueryParams: { },

  } as UserManagerSettings;
    
     this.userManager = new UserManager(settings);
  
    Log.logger = console;
    Log.level = Log.INFO;
  }

  public getUser(): Promise<User | null> {
    var user = this.userManager.getUser();

    return user;
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}