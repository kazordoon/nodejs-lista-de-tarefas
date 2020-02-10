require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY

module.exports = function (app) {
  return function (req, res, next) {
    const token = req.cookies.jwtToken

    if (!token) {
      return res.redirect('/usuarios/login')
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.redirect('/usuarios/login')
      }

      // O id que estava codificado no token, agora poderá ser usado por req.userId
      req.userId = decoded.id
      return next()
    })
  }
}
