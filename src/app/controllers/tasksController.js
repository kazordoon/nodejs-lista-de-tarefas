/* eslint-disable camelcase */
module.exports = function (app) {
  const { User } = app.models

  return {
    async index (req, res) {
      try {
        const { userId } = req

        const user = await User.findById(userId)

        const { username, tasks } = user

        return res.render('tasks/index', { tasks, username, error: false })
      } catch (err) {
        return res.redirect('/usuarios/login')
      }
    },
    async store (req, res) {
      try {
        const { task } = req.body

        const { userId } = req

        const user = await User.findById(userId)

        const tasks = [...user.tasks]
        tasks.push(task)

        await user.update({ $set: { tasks } })

        return res.redirect('/tarefas')
      } catch (err) {
        const error = 'Não foi possível criar uma nova tarefa'
        return res.render('tarefas/index', { error })
      }
    },
    async destroy (req, res) {
      try {
        const { id } = req.params

        const { userId } = req

        const user = await User.findById(userId)

        const tasks = [...user.tasks]
        tasks.splice(id, 1)

        await user.update({ $set: { tasks } })

        return res.sendStatus(204)
      } catch (err) {
        const error = 'Não foi possível deletar a tarefa solicitada'
        return res.status(400).render('tarefas/index', { error })
      }
    }
  }
}
