
const Hapi = require('hapi')
const { configureRoutes } = require('./routes')
const { configureAuth } = require('./auth')

const server = Hapi.server({
  host: 'localhost',
  port: 3000
})

const main = async () => {
  await configureAuth(server)
  await configureRoutes(server)
  await server.start()

  return server
}

main().then(server => {
  console.log('Server running at:', server.info.uri)
}).catch(err => {
  console.log(err)
  process.exit(1)
})
