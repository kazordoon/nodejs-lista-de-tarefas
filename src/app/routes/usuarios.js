const router = require('express').Router()

module.exports = function (app) {
  const {
    usuariosController: {
      getCadastrar,
      postCadastrar,
      getLogin,
      postLogin
    }
  } = app.controllers

  router.get('/cadastrar', getCadastrar)
  router.post('/cadastrar', postCadastrar)

  router.get('/login', getLogin)
  router.post('/login', postLogin)

  return router
}
