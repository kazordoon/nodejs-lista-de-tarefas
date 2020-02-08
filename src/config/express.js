const express = require('express')
const consign = require('consign')
const morgan = require('morgan')

const app = express()

app.set('view engine', 'ejs')
app.set('views', './src/app/views')
app.set('PORT', process.env.PORT || 3000)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

consign({ cwd: 'src/app' })
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app)

app.use('/tarefas', app.routes.tarefas)
app.use('/usuarios', app.routes.usuarios)

module.exports = app
