import makeErrorElement from './makeErrorElement.js'

/**
 * @param {string} errorMessage
 * @param {HTMLElement} errorContainer
 */
function replaceErrorContainerContent (errorContainer, errorMessage) {
  errorContainer.innerHTML = ''
  const errorElement = makeErrorElement(errorMessage)
  errorContainer.prepend(errorElement)
}

export default replaceErrorContainerContent
