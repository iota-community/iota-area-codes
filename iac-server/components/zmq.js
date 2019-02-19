const { storeTransaction } = require('./db')

let zmq = require('zeromq')
let sock = zmq.socket('sub')

// Connect to the devnet node's ZMQ port
console.log('Connecting to ZMQ')
sock.connect(process.env.ZMQ_URL)

sock.subscribe('tx_trytes')

sock.on('message', msg => {
  const data = msg.toString().split(' ') // Split to get topic & data
  const tag = data[1].slice(2592, 2619)
  const tx_id = data[1].slice(2349, 2430)

  // Qualify TAG
  if (qualifyTag(tag)) {
    const iac = tag.slice(0, 11)
    console.log('IAC:', iac)
    console.log('Tx Hash:', tx_id)
    storeTx(tx_id, iac)
  }
  return
})

const qualifyTag = tag => {
  var format = /[ ABCDEI9 ]/
  const chars = tag.slice(0, 8) + tag.slice(9, 11)
  if (tag[8] !== 9 && !format.test(chars)) {
    console.log('Tag: Good')
    return true
  } else {
    return false
  }
}

let buffer = []
const storeTx = async (tx_id, iac) => {
  buffer.push({ tx_id, iac })
  if (buffer.length > 2) {
    await storeTransaction(buffer)
    buffer = []
    console.log('Stored')
  }
}
module.exports = {}
