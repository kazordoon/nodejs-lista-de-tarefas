/* eslint-disable camelcase */
require('dotenv').config()
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = function (app) {
  const { Usuario } = app.models

  return {
    getCadastrar (req, res) {
      try {
        return res.render('usuarios/cadastrar', { erro: false })
      } catch (err) {
        return res.status(500).send('Erro ao carregar a página')
      }
    },
    async postCadastrar (req, res) {
      try {
        const { nome_usuario, senha, repetir_senha } = req.body

        // Validação de dados
        const schema = Joi.object({
          nome_usuario: Joi.string().min(3).required(),
          senha: Joi.string().min(8).required(),
          repetir_senha: Joi.string().min(8).required()
        })

        const value = schema.validate({ nome_usuario, senha, repetir_senha })

        if (value.error) {
          const erro = 'Falha na autenticação'
          return res.status(401).render('usuarios/cadastrar', { erro })
        }
        /* Fim da validação */

        if (await Usuario.findOne({ nome_usuario })) {
          const erro = 'Já existe uma conta com este nome de usuário, tente outro'
          return res.status(400).render('usuarios/cadastrar', { erro })
        }

        await Usuario.create({ nome_usuario, senha })

        return res.status(201).redirect('/usuarios/login')
      } catch (err) {
        const erro = 'Não foi possível realizar o cadastro de uma nova conta'
        return res.status(400).render('usuarios/cadastro', { erro })
      }
    },
    getLogin (req, res) {
      try {
        return res.render('usuarios/login', { erro: false })
      } catch (err) {
        return res.status(500).send('Erro ao carregar a página')
      }
    },
    async postLogin (req, res) {
      try {
        const { nome_usuario, senha } = req.body

        const usuario = await Usuario.findOne({ nome_usuario })

        if (!usuario) {
          const erro = 'Falha na autenticação'
          return res.status(401).render('usuarios/login', { erro })
        }

        if (!await bcrypt.compare(senha, usuario.senha)) {
          const erro = 'Falha na autenticação'
          return res.status(401).render('usuarios/login', { erro })
        }

        const token = jwt.sign({ id: usuario._id }, process.env.SECRET_KEY, { expiresIn: '1h' })

        res.cookie('jwtToken', token)

        res.redirect('/tarefas')
      } catch (err) {
        const erro = 'Não foi possível realizar o login'
        return res.status(400).render('usuarios/login', { erro })
      }
    }
  }
}
