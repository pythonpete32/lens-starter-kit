import { proxy } from 'valtio'

const state = proxy(
  {
    // state variables
    isAuthenticated: false,
    // state methods
    setProfiles: () => { },
    setIsAuthenticated: () => { },
    setCurrentUser: () => { },

  })

export { state }