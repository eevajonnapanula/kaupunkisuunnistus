import { initAuth0 } from "@auth0/nextjs-auth0";

const {
  AUTH_CLIENT_DOMAIN,
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  COOKIE_SECRET,
  REDIRECT_URI,
  POST_LOGOUT_REDIRECT_URI,
  SCOPE,
} = process.env;

export default initAuth0({
  domain: AUTH_CLIENT_DOMAIN,
  clientId: AUTH_CLIENT_ID,
  clientSecret: AUTH_CLIENT_SECRET,
  scope: SCOPE,
  redirectUri: REDIRECT_URI,
  postLogoutRedirectUri: POST_LOGOUT_REDIRECT_URI,
  session: {
    cookieSecret: COOKIE_SECRET,
    cookieLifetime: 60 * 60 * 8,
    storeAccessToken: true,
    storeRefreshToken: true,
    storeIdToken: true,
  },
  oidcClient: {
    httpTimeout: 2500,
    clockTolerance: 10000,
  },
});
