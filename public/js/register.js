import replaceErrorContainerContent from './functions/replaceErrorContainerContent.js'

(function () {
  const form = document.forms['registration-page']
  const errorContainer = document.querySelector('.error-container')

  function handleFormSubmit (event) {
    const username = document.querySelector('#username').value
    const password1 = document.querySelector('#password').value
    const password2 = document.querySelector('#repeat-password').value

    const errors = []

    const emptyFields = !username || !password1 || !password2
    if (emptyFields) {
      const errorMessage = 'Preencha todos os campos corretamente!'
      errors.push(errorMessage)
    }

    const minimumUsernameLength = 3
    const invalidUsernameLength = username.length < minimumUsernameLength
    if (invalidUsernameLength) {
      const errorMessage = 'O nome de usuário deve ter no mínimo 3 carácteres'
      errors.push(errorMessage)
    }

    const usernameRegex = /^[a-zA-Z0-9]{3,50}$/
    const invalidUsername = !(usernameRegex.test(username))
    if (invalidUsername) {
      const errorMessage = 'O nome de usuário deve conter apenas letras e números'
      errors.push(errorMessage)
    }

    const differentPasswords = password1 !== password2
    if (differentPasswords) {
      const errorMessage = 'As senhas não coincidem'
      errors.push(errorMessage)
    }

    const minimumPasswordLength = 8
    const invalidPasswordLength = (
      password1.length < minimumPasswordLength ||
      password2.length < minimumPasswordLength
    )
    if (invalidPasswordLength) {
      const errorMessage = 'A senha deve ter no mínimo 8 carácteres'
      errors.push(errorMessage)
    }

    if (errors.length > 0) {
      event.preventDefault()
      const [firstErrorMessage] = errors
      replaceErrorContainerContent(errorContainer, firstErrorMessage)
    }
  }

  form.addEventListener('submit', handleFormSubmit)
})()
