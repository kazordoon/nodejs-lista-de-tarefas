/* eslint-disable camelcase */
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')

module.exports = function (app) {
  const { User } = app.models
  const { generateToken } = app.utils

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
          username: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,50}$'))
            .min(3)
            .required(),
          password1: Joi.string().min(8).required(),
          password2: Joi.ref('password1')
        })

        const validation = schema.validate({ username, password1, password2 })

        if (validation.error) {
          const error = 'Nome de usuário ou senha inválido'
          return res.status(401).render('users/register', { error })
        }
        /* Fim da validação */

        const userAlreadyExists = await User.findOne({ username })
        if (userAlreadyExists) {
          const error = 'Já existe uma conta com este nome de usuário'
          return res.status(400).render('users/register', { error })
        }

        const user = await User.create({ username, password: password1 })

        const payload = { id: user._id }
        const token = generateToken(payload)

        res.cookie('jwtToken', token)
        return res.redirect('/tarefas')
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

        const incorrectPassword = !(await bcrypt.compare(
          password,
          user.password
        ))
        if (incorrectPassword) {
          const error = 'Falha na autenticação'
          return res.status(401).render('users/login', { error })
        }

        const payload = { id: user._id }
        const token = generateToken(payload)

        res.cookie('jwtToken', token)
        return res.redirect('/tarefas')
      } catch (err) {
        const error = 'Não foi possível realizar o login'
        return res.status(400).render('users/login', { error })
      }
    }
  }
}
