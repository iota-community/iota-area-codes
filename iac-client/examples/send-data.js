///////////////////////////////
// Send HELLOWORLD
///////////////////////////////

const iotaLibrary = require('@iota/core')
const iac = require('./iotaareacodes')

const iota = iotaLibrary.composeAPI({
  provider: 'https://nodes.devnet.thetangle.org:443'
})

const address =
  'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D'
const seed =
  'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX'

const transfers = [
  {
    value: 0,
    address: address,
    tag: iac.encode(52.52954, 13.41287) // IOTA Foundation offices
  }
]

iota
  .prepareTransfers(seed, transfers)
  .then(trytes => iota.sendTrytes(trytes, (depth = 3), (mwm = 9)))
  .then(bundle => {
    console.log(bundle)
  })
  .catch(err => {
    console.error(err)
  })
