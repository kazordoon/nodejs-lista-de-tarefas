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
app.use(cookieParser(process.env.COOKIE_SECRET))

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
  const error = new Error('Página não encontrada')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  const errorTitles = {
    404: 'Página não encontrada',
    500: 'Erro interno no servidor'
  }

  return res.render('error', { title: errorTitles[error.status] })
})

module.exports = app
