;(function () {
  const form = document.forms['login-form']
  const divContainer = document.querySelector('div.container')

  function handleFormSubmit (event) {
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value

    const errors = []

    if (username.length === 0 || password.length === 0) {
      errors.push('Preencha todos os campos corretamente')
    }

    if (errors.length > 0) {
      event.preventDefault()
      const doc = new DocumentFragment()
      let divError = document.querySelector('div.error')

      if (!divError) {
        divError = document.createElement('div')
      }

      divError.innerHTML = ''
      divError.classList.add('error')

      errors.forEach((error) => {
        const pElement = document.createElement('p')
        pElement.classList.add('alert', 'alert-danger')
        pElement.appendChild(document.createTextNode(error))
        divError.appendChild(pElement)
      })

      doc.appendChild(divError)
      divContainer.prepend(doc)
    }
  }

  form.addEventListener('submit', handleFormSubmit)
})()
