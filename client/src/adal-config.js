import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal'

export const adalConfig = {
    tenant: 'MittBalans.onmicrosoft.com',
  clientId: 'e4b88224-b3bd-4dfd-8d91-3457d3b71ae1',
  endpoints: {
    api:'https://jolly-bush-061573503.azurestaticapps.net/api/Books'
  },
  cacheLocation: 'localStorage'
};

export const authContext = new AuthenticationContext(adalConfig);

export const getToken = () => {
    let auth_token = null;

    authContext.acquireToken(adalConfig.endpoints.api, (message, token, msg) =>{
        if(token) {
            auth_token = token;
        }
    });

    return auth_token;
}