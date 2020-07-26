function getLocalStorageTasks () {
  let tasks = []

  const hasTasksInTheLocalStorage = localStorage.getItem('tasks')
  if (hasTasksInTheLocalStorage) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  return tasks
}

export default getLocalStorageTasks
