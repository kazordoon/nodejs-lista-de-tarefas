/* eslint-disable camelcase */
module.exports = function (app) {
  const { Usuario } = app.models

  return {
    async index (req, res) {
      try {
        const { userId } = req

        const usuario = await Usuario.findById(userId)
        const { nome_usuario, tarefas } = usuario

        return res.render('tarefas/index', { tarefas, nome_usuario, erro: false })
      } catch (err) {
        return res.redirect('/usuarios/login')
      }
    },
    async criar (req, res) {
      try {
        const { tarefa } = req.body

        const { userId } = req

        const usuario = await Usuario.findById(userId)

        const tarefas = [...usuario.tarefas]
        tarefas.push(tarefa)

        await usuario.update({ $set: { tarefas } })

        return res.redirect('/tarefas')
      } catch (err) {
        const erro = 'Não foi possível criar uma nova tarefa'
        return res.render('tarefas/index', { erro })
      }
    },
    async deletar (req, res) {
      try {
        const { id } = req.params

        const { userId } = req

        const usuario = await Usuario.findById(userId)

        const tarefas = [...usuario.tarefas]
        tarefas.splice(id, 1)

        await usuario.update({ $set: { tarefas } })

        return res.sendStatus(204)
      } catch (err) {
        const erro = 'Não foi possível deletar a tarefa solicitada'
        return res.status(400).render('tarefas/index', { erro })
      }
    }
  }
}
