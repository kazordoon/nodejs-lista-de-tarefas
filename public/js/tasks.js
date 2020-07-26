import {
  replaceErrorContainerContent,
  makeLiTaskElement,
  getLocalStorageTasks,
  addTaskToTheLocalStorage
} from './functions/index.js';

(function () {
  const form = document.forms['create-task-form']
  const input = document.querySelector('#task-name')
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

    const taskContent = input.value

    if (!taskContent) {
      const errorMessage = 'Preencha o campo!'
      replaceErrorContainerContent(errorContainer, errorMessage)
      return
    }

    const tasks = getLocalStorageTasks()
    if (tasks.includes(taskContent)) {
      const errorMessage = 'Esta tarefa já existe.'
      replaceErrorContainerContent(errorContainer, errorMessage)
      return
    }

    const body = { task: taskContent }
    const response = await fetch('/tarefas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const task = await response.json()

    addTaskToTheLocalStorage(taskContent)

    const taskLiElement = makeLiTaskElement(task.id, taskContent)
    taskListsContainer.appendChild(taskLiElement)
    errorContainer.innerHTML = ''
    input.value = ''
    input.focus()
  }

  form.addEventListener('submit', handleFormSubmit)

  Array.from(deleteTaskButtons).forEach((deleteTaskButton) => {
    deleteTaskButton.addEventListener('click', deleteTask)
  })
})()
