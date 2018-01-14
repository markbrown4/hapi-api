
const Hapi = require('hapi')

const server = Hapi.server({
  host: 'localhost',
  port: 3000
})

server.route({
  method: 'GET',
  path: '/',
  handler: () => {
    return [{ so: 'hapi!' }]
  }
})

server.start().then(() => {
  console.log('Server running at:', server.info.uri)
}).catch(err => {
  console.log(err)
  process.exit(1)
})
