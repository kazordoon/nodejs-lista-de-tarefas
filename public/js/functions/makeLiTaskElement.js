/**
 * @param {string|number} taskId
 * @param {string} taskContent
 */
function makeLiTaskElement (taskId, taskContent) {
  const liElement = document.createElement('li')
  const spanElement = document.createElement('span')
  const buttonElement = document.createElement('button')

  const spanText = document.createTextNode(taskContent)
  const buttonText = document.createTextNode('Excluir')

  const liClasses = ['list-group-item', 'font-weight-bold']
  const buttonClasses = ['btn', 'btn-danger', 'float-right', 'delete-task-btn']

  liElement.classList.add(...liClasses)
  buttonElement.classList.add(...buttonClasses)

  spanElement.setAttribute('data-id', taskId)
  spanElement.appendChild(spanText)

  buttonElement.addEventListener('click', (event) => {
    fetch(`/tarefas/${taskId}`, { method: 'DELETE' })
      .then(() => event.target.parentNode.remove())
      .catch(() => alert('Não foi possível deletar esta tarefa.'))
  })

  buttonElement.appendChild(buttonText)
  spanElement.appendChild(spanText)
  liElement.appendChild(spanElement)
  liElement.appendChild(buttonElement)

  return liElement
}

export default makeLiTaskElement
