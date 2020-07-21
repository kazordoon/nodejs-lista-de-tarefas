/**
 * @param {string} errorMessage
 */
function makeErrorElement (errorMessage) {
  const errorElement = document.createElement('div')
  const errorText = document.createTextNode(errorMessage)

  errorElement.classList.add('alert', 'alert-danger')
  errorElement.appendChild(errorText)

  return errorElement
}

export default makeErrorElement
