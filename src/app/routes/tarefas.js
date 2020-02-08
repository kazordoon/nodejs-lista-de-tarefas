const router = require('express').Router()

module.exports = function (app) {
  const { tarefasController } = app.controllers

  router.get('/', tarefasController.index)

  return router
}
