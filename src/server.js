const app = require('./config/express')

app.listen(app.get('PORT'), () => {
  console.log(`Servidor rodando em *:${app.get('PORT')}`)
})
