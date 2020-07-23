import replaceErrorContainerContent from './functions/replaceErrorContainerContent.js'
import makeLiTaskElement from './functions/makeLiTaskElement.js'

(function () {
  const form = document.forms['create-task-form']
  const deleteTaskButtons = document.querySelectorAll('.delete-task-btn')
  const errorContainer = document.querySelector('.error-container')
  const taskListsContainer = document.querySelector('ul.list-group')

  function deleteTask (event) {
    const taskId = event.target.previousElementSibling.getAttribute('data-id')

    fetch(`/tarefas/${taskId}`, { method: 'DELETE' })
      .then(() => event.target.parentNode.remove())
      .catch(() => alert('Não foi possível deletar esta tarefa.'))
  }

  async function handleFormSubmit (event) {
    event.preventDefault()

    const input = document.querySelector('#task-name').value

    if (!input) {
      const errorMessage = 'Preencha o campo!'
      replaceErrorContainerContent(errorContainer, errorMessage)
    }

    const body = { task: input }

    const response = await fetch('/tarefas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const task = await response.json()

    const taskLiElement = makeLiTaskElement(task.id, input)
    taskListsContainer.appendChild(taskLiElement)
  }

  form.addEventListener('submit', handleFormSubmit)

  Array.from(deleteTaskButtons).forEach((deleteTaskButton) => {
    deleteTaskButton.addEventListener('click', deleteTask)
  })
})()
