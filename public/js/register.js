import replaceErrorContainerContent from './functions/replaceErrorContainerContent.js'

(function () {
  const form = document.forms['registration-page']
  const errorContainer = document.querySelector('.error-container')

  function handleFormSubmit (event) {
    const username = document.querySelector('#username').value
    const password1 = document.querySelector('#password').value
    const password2 = document.querySelector('#repeat-password').value

    const regex = /^[a-zA-Z0-9]{3,50}$/
    if (!username.match(regex)) {
      event.preventDefault()
      const errorMessage = 'O nome de usuário deve conter apenas letras e números'
      replaceErrorContainerContent(errorContainer, errorMessage)
    }

    if (username.length < 3) {
      event.preventDefault()
      const errorMessage = 'O nome de usuário deve ter no mínimo 3 carácteres'
      replaceErrorContainerContent(errorContainer, errorMessage)
    }

    if (password2.length !== password1.length && password2 !== password1) {
      event.preventDefault()
      const errorMessage = 'As senhas não coincidem'
      replaceErrorContainerContent(errorContainer, errorMessage)
    }

    if (password1.length < 8 || password2.length < 8) {
      event.preventDefault()
      const errorMessage = 'A senha deve ter no mínimo 8 carácteres'
      replaceErrorContainerContent(errorContainer, errorMessage)
    }
  }

  form.addEventListener('submit', handleFormSubmit)
})()
