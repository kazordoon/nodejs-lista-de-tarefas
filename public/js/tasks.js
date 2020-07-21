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

    let divError = document.querySelector('div.error')
    if (!divError) {
      divError = document.createElement('div')
      divError.classList.add('error')
    }

    divError.innerHTML = ''
    const p = document.createElement('p')
    const text = document.createTextNode('Preencha o campo!')
    p.classList.add('alert', 'alert-danger')
    p.appendChild(text)

    divError.appendChild(p)

    document.querySelector('div.container').prepend(divError)
  }
}
