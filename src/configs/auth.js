export default {
  meEndpoint: `${process.env.NEXT_PUBLIC_AUTH}/auth/me`,
  loginEndpoint: `${process.env.NEXT_PUBLIC_AUTH}/auth/signin`,
  registerEndpoint:  `${process.env.NEXT_PUBLIC_AUTH}/auth/signin`,
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
