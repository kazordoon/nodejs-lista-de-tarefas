import getLocalStorageTasks from './getLocalStorageTasks.js'

/**
 * @param {string} task
 */
function addTaskToTheLocalStorage (task) {
  const tasks = getLocalStorageTasks()

  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

export default addTaskToTheLocalStorage
