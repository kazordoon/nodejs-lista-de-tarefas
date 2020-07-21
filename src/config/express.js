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

app.use(app.middlewares.handleNotFoundPages)
app.use(app.middlewares.handleErrors)

module.exports = app
