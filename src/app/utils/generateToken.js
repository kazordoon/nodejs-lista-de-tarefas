const jwt = require('jsonwebtoken')

module.exports = function (app) {
  return function (payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })
    return token
  }
}
