module.exports = function (app) {
  return {
    async index (req, res) {
      try {
        return res.render('tarefas/teste')
      } catch (err) {
        return res.status(500).json({ erro: 'Erro ao renderizar a página de tarefas' })
      }
    }
  }
}
