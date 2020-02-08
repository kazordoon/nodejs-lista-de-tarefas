const router = require('express').Router()

module.exports = function (app) {
  const { usuariosController } = app.controllers

  router.get('/', usuariosController.index)

  return router
}
