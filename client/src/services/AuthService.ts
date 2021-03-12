import { Log, User, UserManager, UserManagerSettings } from 'oidc-client';
import {Constants} from '../helpers/Constants';
import axios from 'axios';

export class AuthService {
  public userManager: UserManager;
 
  constructor() {
    const settings = {
      // This is  the metadata endpoint
      authority: `https://mittbalans.b2clogin.com/MittBalans.onmicrosoft.com/b2c_1_react_signup_signin/v2.0/.well-known/openid-configuration`,
      // Turn off calls to user info since CORS will block it
      loadUserInfo: false, 
      // The URL where the Web UI receives the login result
      redirect_uri: `http://localhost:48599/signin-callback.html`,
      // The no longer recommended implicit flow must be used if CORS is disabled
      // If you want to use impicit flow use id_token instead of code for the return type.
      response_type: 'code',
      // Other OAuth settings
      client_id: Constants.azureApplicationId,
      // openid is required, remove https://contoso.onmicrosoft.com/test/Read if access_token is not required.
      scope: 'openid offline_access https://graph.microsoft.com/User.Read.All', 
       // Supply these details explicitly. Directly copied from azure ad b2c policy metadata endpoint.
       metadata: {
        issuer: `https://${Constants.azureTenantName}.b2clogin.com/${Constants.azureTenantId}/v2.0/`,
        authorization_endpoint: `https://${Constants.azureTenantName}.b2clogin.com/${Constants.azureTenantName}.onmicrosoft.com/${Constants.azureSignUpSignInPolicy}/oauth2/v2.0/authorize`,
        token_endpoint: `https://${Constants.azureTenantName}.b2clogin.com/${Constants.azureTenantName}.onmicrosoft.com/${Constants.azureSignUpSignInPolicy}/oauth2/v2.0/token`,
        jwks_uri : `https://${Constants.azureTenantName}.b2clogin.com/${Constants.azureTenantName}.onmicrosoft.com/discovery/v2.0/keys?p=${Constants.azureSignUpSignInPolicy}`,
        end_session_endpoint: `https://${Constants.azureTenantName}.b2clogin.com/${Constants.azureTenantName}.onmicrosoft.com/${Constants.azureSignUpSignInPolicy}/oauth2/v2.0/logout?post_logout_redirect_uri=${Constants.redirectRoot}`
      },

  } as UserManagerSettings;
    
     this.userManager = new UserManager(settings);
  
    Log.logger = console;
    Log.level = Log.INFO;
  }

  public async getUser(): Promise<User | null> {
    return await this.userManager.getUser();
  }

  public async getGroup(user: User): Promise<string | null> {
    var group = await axios.get(`${Constants.apiRoot}Group/${user.profile.sub}`)

    return group.data[0].GroupName;
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

  public async isAuthenticated(): Promise<boolean> {
    return await this.getUser() != null;
  }
}