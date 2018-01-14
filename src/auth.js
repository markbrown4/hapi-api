
const jwt = require('jsonwebtoken')
const Boom = require('boom')
const jwtPlugin = require('hapi-auth-jwt2').plugin

const JWT_KEY = 'NeverShareYourSecret'

var validate = function (credentials) {
  return {
    isValid: true,
    credentials
  }
}

exports.configureAuth = async (server) => {
  await server.register(jwtPlugin)
  server.auth.strategy('admin', 'jwt', {
    key: JWT_KEY,
    validate,
    verifyOptions: { algorithms: [ 'HS256' ] }
  })

  server.auth.default('admin')
}

exports.login = (email, password) => {
  if (!(email === 'mb4@gmail.com' && password === 'bears')) return Boom.notAcceptable()

  const credentials = { email }
  const token = jwt.sign(credentials, JWT_KEY, { algorithm: 'HS256', expiresIn: '1h' })

  return { token }
}
