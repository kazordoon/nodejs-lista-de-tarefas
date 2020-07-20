require('dotenv').config()
const app = require('./config/express')
require('./config/database')

app.listen(app.get('PORT'), () => {
  console.log(`Servidor rodando em *:${app.get('PORT')}`)
})
