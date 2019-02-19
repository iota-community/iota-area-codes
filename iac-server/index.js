require('dotenv').config()
const { json, send } = require('micro')

/// Pull in helpers
const {
  initCassandra,
  fetchTransactions,
  queryTransactions
} = require('./components/db')
const zmq = require('./components/zmq')

module.exports = async (req, res) => {
  let response
  switch (req.url) {
    case '/initDatabase':
      initCassandra()
      response = { message: 'Initalising Cassandra db' }
      break
    case '/startSubscribing':
      subscribeToZMQ()
      response = { message: 'Subscribing to ZMQ' }
      break
    case '/fetch':
      response = await fetchTransactions()
      break
    case '/query':
      const js = await json(req)
      response = await queryTransactions(js.iac)
      break
    default:
      return res.end('Route not found')
  }
  const string = JSON.stringify(response)
  return send(res, 200, string)
}
