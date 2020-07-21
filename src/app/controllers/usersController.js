/* eslint-disable camelcase */
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = function (app) {
  const { User } = app.models

  return {
    registrationPage (req, res) {
      try {
        return res.render('users/register', { error: false })
      } catch (err) {
        return res.status(500).send('Erro ao carregar a página')
      }
    },
    async register (req, res) {
      try {
        const { username, password1, password2 } = req.body

        // Validação de dados
        const schema = Joi.object({
          username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,50}$')).min(3).required(),
          password1: Joi.string().min(8).required(),
          password2: Joi.ref('password1')
        })

        const value = schema.validate({ username, password1, password2 })

        if (value.error) {
          const error = 'Nome de usuário ou senha inválido'
          return res.status(401).render('users/register', { error })
        }
        /* Fim da validação */

        if (await User.findOne({ username })) {
          const error = 'Já existe uma conta com este nome de usuário, tente outro'
          return res.status(400).render('users/register', { error })
        }

        const user = await User.create({ username, password: password1 })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.cookie('jwtToken', token)

        res.redirect('/tarefas')
      } catch (err) {
        const error = 'Não foi possível realizar o cadastro de uma nova conta'
        return res.status(400).render('users/cadastro', { error })
      }
    },
    loginPage (req, res) {
      try {
        return res.render('users/login', { error: false })
      } catch (err) {
        return res.status(500).send('Erro ao carregar a página')
      }
    },
    async login (req, res) {
      try {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        if (!user) {
          const error = 'Falha na autenticação'
          return res.status(401).render('users/login', { error })
        }

        if (!await bcrypt.compare(password, user.password)) {
          const error = 'Falha na autenticação'
          return res.status(401).render('users/login', { error })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.cookie('jwtToken', token)

        res.redirect('/tarefas')
      } catch (err) {
        const error = 'Não foi possível realizar o login'
        return res.status(400).render('users/login', { error })
      }
    }
  }
}
