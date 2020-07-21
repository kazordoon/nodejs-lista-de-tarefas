const jwt = require('jsonwebtoken')

module.exports = function (app) {
  return function (req, res, next) {
    const { jwtToken } = req.cookies

    const userAlreadyLogged = jwtToken && jwt.verify(jwtToken, process.env.JWT_SECRET)
    if (userAlreadyLogged) {
      return res.redirect('/tarefas')
    }

    return next()
  }
}
