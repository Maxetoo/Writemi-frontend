import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

// const getLoginToLocalStorage = () => {
//   const draftData = localStorage.getItem('isLoggedIn')
//   if (draftData) {
//     return JSON.parse(localStorage.getItem('isLoggedIn'))
//   } else {
//     return ''
//   }
// }

const initialState = {
  loginPasswordVisible: false,
  signupPasswordVisible: false,
  loginInputs: {
    username: '',
    password: '',
  },
  signupInputs: {
    username: '',
    password: '',
    email: '',
  },
  username: '',
  loginEntries: [],
  signupEntries: [],
  loading: false,
  isError: false,
  errorMessage: '',
  isAuthenticated: false,
  // isLoggedIn: getLoginToLocalStorage(),
  loginSuccess: false,
  signupSuccess: false,
  userCookie: document.cookie,
}

export const userLogin = createAsyncThunk(
  'actions/login',
  async (payload, thunkAPI) => {
    const { username, password } = payload
    try {
      const resp = await axios.post(
        '/api/v1/auth/login',
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      )
      window.location.href = '/home'
      return { response: resp.data, status: 'success' }
    } catch (error) {
      return {
        response: error.response.data,
        status: 'error',
        code: error.response.status,
      }
    }
  }
)

export const userSignup = createAsyncThunk(
  'actions/register',
  async (payload, thunkAPI) => {
    const { username, password, email } = payload
    try {
      const resp = await axios.post(
        '/api/v1/auth/register',
        {
          username,
          password,
          email,
        },
        {
          withCredentials: true,
        }
      )
      window.location.href = '/login'
      return { response: resp.data, status: 'success' }
    } catch (error) {
      return {
        response: error.response.data,
        status: 'error',
        code: error.response.status,
      }
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleLoginPasswordVisibility: (state, action) => {
      if (action.payload.type === 'password') {
        action.payload.type = 'text'
        state.loginPasswordVisible = true
      } else {
        action.payload.type = 'password'
        state.loginPasswordVisible = false
      }
    },
    toggleSignupPasswordVisibility: (state, action) => {
      if (action.payload.type === 'password') {
        action.payload.type = 'text'
        state.signupPasswordVisible = true
      } else {
        action.payload.type = 'password'
        state.signupPasswordVisible = false
      }
    },
    fillAuthInputs: (state, action) => {
      if (action.payload.type === 'login') {
        state.loginInputs.username = action.payload.username
        state.loginInputs.password = action.payload.password
      } else {
        state.signupInputs.username = action.payload.username
        state.signupInputs.password = action.payload.password
        state.signupInputs.email = action.payload.email
      }
    },

    alertErrorKill: (state, action) => {
      state.isError = false
    },
    // setLoginToLocalStorage: (state, action) => {
    //   localStorage.setItem('isLoggedIn', JSON.stringify(state.isLoggedIn))
    // },

    updateCookieState: (state, action) => {
      state.userCookie = document.cookie
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.loading = true
        state.isError = false
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false
        const { status, code, response } = action.payload
        console.log(response)
        if (code === 500) {
          state.isError = true
          state.errorMessage = `Can't login due to network`
        } else if (status === 'success') {
          state.isAuthenticated = true
          state.loginEntries = response.user
        } else {
          state.isError = true
          state.errorMessage = response.msg
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(userSignup.pending, (state, action) => {
        state.loading = true
        state.isError = false
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false
        const { status, code, response } = action.payload
        if (code === 500) {
          state.isError = true
          state.errorMessage = `Can't login due to network`
        } else if (status === 'success') {
          state.signupEntries = response.user
        } else {
          state.isError = true
          state.errorMessage = response.msg
        }
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export default authSlice.reducer
export const {
  toggleLoginPasswordVisibility,
  toggleSignupPasswordVisibility,
  fillAuthInputs,
  alertErrorKill,
  updateCookieState,
} = authSlice.actions
