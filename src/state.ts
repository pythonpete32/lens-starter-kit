import { proxy, subscribe } from 'valtio'

const state = proxy(
  {
    // state variables
    profiles: [],
    isAuthenticated: false,
    currentUser: null,
  })



export { state }