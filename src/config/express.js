const express = require('express')
const consign = require('consign')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const app = express()

app.set('view engine', 'ejs')
app.set('views', './src/app/views')
app.set('PORT', process.env.PORT || 3000)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cookieParser())

consign({ cwd: 'src/app' })
  .include('models')
  .then('controllers')
  .then('middlewares')
  .then('routes')
  .into(app)

app.use('/tarefas', app.routes.tarefas)
app.use('/usuarios', app.routes.usuarios)

// Tratamento de rotas não encontradas:
app.use((req, res, next) => {
  const erro = new Error('Página não encontrada')
  erro.status = 404
  next(erro)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  return res.render('error', { erro: error.message })
})

module.exports = app
