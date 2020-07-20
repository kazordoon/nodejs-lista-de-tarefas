const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

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

      req.userId = decoded.id
      return next()
    })
  }
}
