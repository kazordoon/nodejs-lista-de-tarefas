const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

module.exports = function (app) {
  const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    tasks: [String]
  }, { timestamps: true, versionKey: false })

  UserSchema.pre('save', async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword

    return next()
  })

  const User = mongoose.model('User', UserSchema)
  return User
}
