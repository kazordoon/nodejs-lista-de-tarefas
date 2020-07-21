module.exports = function (app) {
  return function (error, req, res, next) {
    res.status(error.status || 500)
    const errorTitles = {
      404: 'Página não encontrada',
      500: 'Erro interno no servidor'
    }

    return res.render('error', { title: errorTitles[error.status] })
  }
}
