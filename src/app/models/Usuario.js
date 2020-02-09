const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

module.exports = function (app) {
  const UsuarioSchema = new mongoose.Schema({
    nome_usuario: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    senha: {
      type: String,
      required: true
    },
    tarefas: [String]
  }, { timestamps: true, versionKey: false })

  UsuarioSchema.pre('save', async function (next) {
    const senhaComHash = await bcrypt.hash(this.senha, 10)
    this.senha = senhaComHash
    next()
  })

  const Usuario = mongoose.model('Usuario', UsuarioSchema)

  return Usuario
}
