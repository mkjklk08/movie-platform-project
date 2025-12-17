import { createSlice } from '@reduxjs/toolkit'

const getInitialState = () => {
  const saved = localStorage.getItem('moviePlatformUser')
  if (saved) {
    try {
      const userData = JSON.parse(saved)
      
      let role = 'user'
      if (userData.user?.email === 'mkjklk970901@gmail.com') {
        role = 'admin'
      } else if (userData.user?.email?.toLowerCase().includes('admin')) {
        role = 'admin'
      }
      
      return {
        user: userData.user,
        token: userData.token,
        role: role || userData.role,
        isAuthenticated: true,
        isLoading: false,
        error: null
      }
    } catch {
      return getDefaultState()
    }
  }
  
  return getDefaultState()
}

const getDefaultState = () => ({
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
})

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.role = action.payload.role
      
      localStorage.setItem('moviePlatformUser', JSON.stringify({
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role
      }))
    },
    loginFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.role = null
      state.isAuthenticated = false
      
      localStorage.removeItem('moviePlatformUser')
      localStorage.removeItem('favorites')
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      const saved = JSON.parse(localStorage.getItem('moviePlatformUser'))
      saved.user = state.user
      localStorage.setItem('moviePlatformUser', JSON.stringify(saved))
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout, updateUserProfile } = authSlice.actions
export default authSlice.reducer