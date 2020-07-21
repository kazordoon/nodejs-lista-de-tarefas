import replaceErrorContainerContent from './functions/replaceErrorContainerContent.js'

(function () {
  const form = document.forms['login-form']
  const errorContainer = document.querySelector('.error-container')

  function handleFormSubmit (event) {
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value

    const emptyFields = !username || !password
    if (emptyFields) {
      event.preventDefault()
      const errorMessage = 'Preencha todos os campos corretamente'
      replaceErrorContainerContent(errorContainer, errorMessage)
      return;
    }
  }

  form.addEventListener('submit', handleFormSubmit)
})()
