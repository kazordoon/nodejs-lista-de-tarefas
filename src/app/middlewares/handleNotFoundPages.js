module.exports = function (app) {
  return function (req, res, next) {
    const error = new Error('Página não encontrada')
    error.status = 404
    next(error)
  }
}
