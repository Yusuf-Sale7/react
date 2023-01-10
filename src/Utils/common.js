export const userInfo = () => {
  const user = {
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email')
  }
  return user
}

export const userInLocal = (name, email) => {
  localStorage.setItem('name', name)
  localStorage.setItem('email', email.toLowerCase())
}

export const logOut = () => {
  localStorage.clear()
}