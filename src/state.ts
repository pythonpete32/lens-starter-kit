import { proxy } from 'valtio'

const state = proxy(
  {
    setProfiles: () => { },
    setIsAuthenticated: () => { },
    setCurrentUser: () => { },
    count: 0,
    text: 'hello'
  })

export { state }