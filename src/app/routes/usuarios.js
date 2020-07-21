const router = require('express').Router()

module.exports = function (app) {
  const { usersController } = app.controllers

  console.log(usersController)
  router.get('/cadastrar', usersController.registrationPage)
  router.post('/cadastrar', usersController.register)

  router.get('/login', usersController.loginPage)
  router.post('/login', usersController.login)

  return router
}
