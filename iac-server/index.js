require('dotenv').config()
const { iacRandom, iotaGen } = require('./helpers')
const { initCassandra, fetchTransactions, queryTransactions } = require('./db')
const zmq = require('./zmq')
const { json, send } = require('micro')

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
/// TESTING FUNCTIONS
// const testingFunctions = async () => {
//   //   console.log(await initKeyspace())
//   //   console.log(await initTable())
//   //   console.log(await dropSpace())
//   //   console.log(iacRandom(), iotaGen(81))
//   //   const fill = Array(500)
//   //     .fill()
//   //     .map(() => ({ tx_id: iotaGen(81), iac: iacRandom() }))
//   //   console.log(fill)
//   //   console.log(await storeTransaction(fill))
//   //   console.log(await queryTransactions('KLJNAA9'))
//   //   console.log(await fetchTransactions())
// }
// main()
