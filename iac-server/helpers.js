const crypto = require('crypto')

const iacRandom = () => {
  var charset = 'FGHJKLMNOPQRSTUVXWYZ'
  var values = crypto.randomBytes(9)
  var result = new Array(9)
  for (var i = 0; i < 9; i++) {
    result[i] = charset[values[i] % charset.length]
  }
  result.splice(6, 1, '9')
  return 'KL' + result.join('')
}
const iotaGen = length => {
  var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'
  var values = crypto.randomBytes(length)
  var result = new Array(length)
  for (var i = 0; i < length; i++) {
    result[i] = charset[values[i] % charset.length]
  }
  return result.join('')
}

module.exports = {
  iotaGen,
  iacRandom
}
