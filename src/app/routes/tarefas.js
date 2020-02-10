const router = require('express').Router()

module.exports = function (app) {
  const { tarefasController } = app.controllers
  const { auth } = app.middlewares

  router.get('/', auth, tarefasController.index)

  return router
}
