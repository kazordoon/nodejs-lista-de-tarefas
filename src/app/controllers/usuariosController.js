module.exports = function (app) {
  return {
    index (req, res) {
      try {
        return res.render('usuarios/teste')
      } catch (err) {
        return res.status(500).json({ erro: 'Erro ao renderizar a página do usuário' })
      }
    }
  }
}
