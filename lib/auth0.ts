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
    // The secret used to encrypt the cookie.
    cookieSecret: COOKIE_SECRET,
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
  },
  oidcClient: {
    // (Optional) Configure the timeout in milliseconds for HTTP requests to Auth0.
    httpTimeout: 2500,
    // (Optional) Configure the clock tolerance in milliseconds, if the time on your server is running behind.
    clockTolerance: 10000,
  },
});
