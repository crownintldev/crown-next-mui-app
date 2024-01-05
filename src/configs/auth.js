export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/auth/login',
  registerEndpoint: '/auth/signup',
  // registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
