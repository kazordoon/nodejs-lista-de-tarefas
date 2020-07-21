import replaceErrorContainerContent from './functions/replaceErrorContainerContent.js'

const errorContainer = document.querySelector('.error-container')

function deleteTask (event) {
  const id = event.target.previousElementSibling.getAttribute('data-id')

  fetch(`/tarefas/${id}`, { method: 'DELETE' })
    .then(console.log)
    .then(() => event.target.parentNode.remove())
}

function notNull (event) {
  const input = document.querySelector('#task-name').value

  if (!input) {
    event.preventDefault()
    replaceErrorContainerContent(errorContainer, 'Preencha o campo!')
  }
}
