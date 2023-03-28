export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user')
}

export const getUserFromLocalStorage = () => {
  if (localStorage.getItem('user') !== null) {
    return JSON.parse(localStorage.getItem('user')) || null
  }
  return null
}
