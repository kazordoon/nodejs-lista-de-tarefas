const router = require('express').Router()

module.exports = function (app) {
  const { tarefasController } = app.controllers
  const { auth } = app.middlewares

  router.get('/', auth, tarefasController.index)
  router.post('/', auth, tarefasController.criar)
  router.delete('/:id', auth, tarefasController.deletar)

  return router
}
