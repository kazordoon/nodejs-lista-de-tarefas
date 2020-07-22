import replaceErrorContainerContent from './functions/replaceErrorContainerContent.js'

(function () {
  const form = document.forms['create-task-form']
  const deleteTaskButtons = document.querySelectorAll('.delete-task-btn')
  const errorContainer = document.querySelector('.error-container')

  function deleteTask (event) {
    const taskId = event.target.previousElementSibling.getAttribute('data-id')

    fetch(`/tarefas/${taskId}`, { method: 'DELETE' })
      .then(() => event.target.parentNode.remove())
      .catch(() => alert('Não foi possível deletar esta tarefa.'))
  }

  function handleFormSubmit (event) {
    const input = document.querySelector('#task-name').value

    if (!input) {
      event.preventDefault()
      const errorMessage = 'Preencha o campo!'
      replaceErrorContainerContent(errorContainer, errorMessage)
    }
  }

  form.addEventListener('submit', handleFormSubmit)

  Array.from(deleteTaskButtons).forEach((deleteTaskButton) => {
    deleteTaskButton.addEventListener('click', deleteTask)
  })
})()
