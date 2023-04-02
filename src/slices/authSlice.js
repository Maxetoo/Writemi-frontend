import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'
import { URL } from '../paths/url'

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
  email: '',
  token: '',
  password: '',
  confirmPassword: '',
  loginEntries: [],
  signupEntries: [],
  loading: false,
  loginLoad: false,
  loginError: false,
  signupLoad: false,
  signupError: false,
  forgotPasswordLoad: false,
  forgotPasswordError: false,
  confirmOTPLoad: false,
  confirmOTPError: false,
  resetLoad: false,
  resetError: false,
  isError: false,
  errorMessage: '',
  isAuthenticated: false,
  loginSuccess: false,
  signupSuccess: false,
  passwordResetSuccessful: false,
  userCookie: document.cookie.startsWith('token'),
  validEmail: document.cookie.startsWith('validEmail'),
  validToken: Cookies.get('validToken') && true,
}

export const userLogin = createAsyncThunk(
  'actions/login',
  async (payload, thunkAPI) => {
    const { username, password } = payload
    try {
      const resp = await axios.post(
        `${URL}/api/v1/auth/login`,
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
        `${URL}/api/v1/auth/register`,
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

export const forgotPassword = createAsyncThunk(
  'actions/forgotPassword',
  async (payload, thunkAPI) => {
    const { email } = payload
    try {
      const resp = await axios.post(
        `${URL}/api/v1/auth/forgotPassword`,
        {
          email,
        },
        {
          withCredentials: true,
        }
      )
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

export const confirmOTP = createAsyncThunk(
  'actions/confirmOTP',
  async (payload, thunkAPI) => {
    const { token } = payload
    try {
      const resp = await axios.post(
        `${URL}/api/v1/auth/confirmToken`,
        {
          token,
        },
        {
          withCredentials: true,
        }
      )
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

export const resetPassword = createAsyncThunk(
  'actions/resetPassword',
  async (payload, thunkAPI) => {
    const { password, confirmPassword } = payload
    try {
      const resp = await axios.patch(
        `${URL}/api/v1/auth/changePassword`,
        {
          password,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      )
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

    fillEmail: (state, action) => {
      state.email = action.payload
    },
    fillResetToken: (state, action) => {
      state.token = action.payload
    },
    alertErrorKill: (state, action) => {
      state.isError = false
    },

    killForgotPasswordAlert: (state, action) => {
      state.forgotPasswordError = false
    },
    killConfirmOTPAlert: (state, action) => {
      state.confirmOTPError = false
    },
    fillResetPasswords: (state, action) => {
      const { password, confirmPassword } = action.payload
      state.password = password
      state.confirmPassword = confirmPassword
    },

    killResetPasswordAlert: (state, action) => {
      state.resetError = false
    },
    updateCookieState: (state, action) => {
      state.userCookie = document.cookie.startsWith('token')
    },
    defaultResetPasswordPass: (state, action) => {
      state.passwordResetSuccessful = false
    },
    setUsernameToLocalStorage: (state, action) => {
      localStorage.setItem('username', JSON.stringify(state.username))
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.loginLoad = true
        state.loginError = false
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false
        const { status, code, response } = action.payload
        if (code === 500) {
          state.loginError = true
          state.errorMessage = `Can't login due to network`
        } else if (status === 'success') {
          state.isAuthenticated = true
          state.loginEntries = response.user
          state.username = response.user.username
        } else {
          state.loginError = true
          state.errorMessage = response.msg
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loginLoad = false
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
      .addCase(forgotPassword.pending, (state, action) => {
        state.forgotPasswordLoad = true
        state.forgotPasswordError = false
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotPasswordLoad = false
        const { status, code, response } = action.payload
        if (code === 500) {
          state.forgotPasswordError = true
          state.errorMessage = `Can't login due to network`
        } else if (status === 'success') {
          window.location.href = '/password-token'
        } else {
          state.forgotPasswordError = true
          state.errorMessage = response.msg
        }
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordLoad = false
      })
      .addCase(confirmOTP.pending, (state, action) => {
        state.confirmOTPLoad = true
        state.confirmOTPError = false
      })
      .addCase(confirmOTP.fulfilled, (state, action) => {
        state.confirmOTPLoad = false
        const { status, code, response } = action.payload
        if (code === 500) {
          state.confirmOTPError = true
          state.errorMessage = `Failed due to poor network`
        } else if (status === 'success') {
          window.location.href = '/reset-password'
        } else {
          state.confirmOTPError = true
          state.errorMessage = response.msg
        }
      })
      .addCase(confirmOTP.rejected, (state, action) => {
        state.confirmOTPLoad = false
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.resetLoad = true
        state.resetError = false
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetLoad = false
        const { status, code, response } = action.payload
        if (code === 500) {
          state.resetError = true
          state.errorMessage = `Failed due to poor network`
        } else if (status === 'success') {
          state.passwordResetSuccessful = true
        } else {
          state.resetError = true
          state.errorMessage = response.msg
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetLoad = false
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
  fillEmail,
  killForgotPasswordAlert,
  fillResetToken,
  killConfirmOTPAlert,
  fillResetPasswords,
  killResetPasswordAlert,
  defaultResetPasswordPass,
  setUsernameToLocalStorage,
} = authSlice.actions
