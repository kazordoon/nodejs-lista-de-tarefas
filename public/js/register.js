;(function () {
  const form = document.forms['registration-page']
  const divContainer = document.querySelector('div.container')

  function handleFormSubmit (event) {
    const username = document.querySelector('#username').value
    const password1 = document.querySelector('#password').value
    const password2 = document.querySelector('#repeat-password').value

    const errors = []

    const regex = /^[a-zA-Z0-9]{3,50}$/
    if (!username.match(regex)) {
      errors.push('O nome de usuário deve conter apenas letras e números')
    }

    if (username.length < 3) {
      errors.push('O nome de usuário deve ter no mínimo 3 carácteres')
    }

    if (password2.length !== password1.length && password2 !== password1) {
      errors.push('As senhas não coincidem')
    }

    if (password1.length < 8 || password2.length < 8) {
      errors.push('A senha deve ter no mínimo 8 carácteres')
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
