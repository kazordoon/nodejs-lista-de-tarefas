const router = require('express').Router()

module.exports = function (app) {
  const { tasksController } = app.controllers
  const { auth } = app.middlewares

  router.get('/', auth, tasksController.index)
  router.post('/', auth, tasksController.store)
  router.delete('/:id', auth, tasksController.destroy)

  return router
}
