const router = require('express').Router()

module.exports = function (app) {
  const { usersController } = app.controllers
  const { redirectUserToTasksPageIfLogged } = app.middlewares

  router.get(
    '/cadastrar',
    redirectUserToTasksPageIfLogged,
    usersController.registrationPage
  )
  router.post('/cadastrar', usersController.register)

  router.get(
    '/login',
    redirectUserToTasksPageIfLogged,
    usersController.loginPage
  )
  router.post('/login', usersController.login)

  return router
}
