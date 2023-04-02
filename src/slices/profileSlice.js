import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL } from '../paths/url'

const initialState = {
  isError: false,
  loading: false,
  newUsername: '',
  newEmail: '',
  newPassword: '',
  passwordVisible: false,
  profile: [],
  errorMessage: '',
  isEditing: false,
  editLoading: false,
  editSuccess: false,
}

export const userLogout = createAsyncThunk(
  'actions/logout',
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.post(`${URL}/api/v1/auth/logout`, {
        withCredentials: true,
      })
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

export const getProfileLogs = createAsyncThunk(
  'actions/getProfileLogs',
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.get(`${URL}/api/v1/user/getProfile`, {
        withCredentials: true,
      })
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

export const editProfile = createAsyncThunk(
  'actions/editProfile',
  async (payload, thunkAPI) => {
    const { username, email } = payload
    try {
      const resp = await axios.patch(
        `${URL}/api/v1/user/editProfile`,
        {
          username,
          email,
        },
        {
          withCredentials: true,
        }
      )
      thunkAPI.dispatch(getProfileLogs())
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

const eventSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    fillProfileInputs: (state, action) => {
      const { username, email } = action.payload
      state.isEditing = true
      state.newUsername = username
      state.newEmail = email
    },
    togglePasswordVisibility: (state, action) => {
      if (action.payload.type === 'password') {
        action.payload.type = 'text'
        state.passwordVisible = true
      } else {
        action.payload.type = 'password'
        state.passwordVisible = false
      }
    },
    killAlertError: (state, action) => {
      state.isError = false
      state.editSuccess = false
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProfileLogs.pending, (state, action) => {
        state.loading = true
        state.isError = false
      })
      .addCase(getProfileLogs.fulfilled, (state, action) => {
        const { status, code, response } = action.payload
        state.loading = true
        if (code === 500) {
          state.isError = true
          state.loading = true
        } else if (status === 'success') {
          state.loading = false
          state.profile = response.user[0]
        } else {
          state.isError = true
          state.loading = true
        }
      })
      .addCase(getProfileLogs.rejected, (state, action) => {
        state.loading = true
      })
      .addCase(editProfile.pending, (state, action) => {
        state.editLoading = true
        state.editSuccess = false
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        const { response, status, code } = action.payload
        state.editLoading = false
        if (code === 500) {
          state.isError = true
          state.errorMessage = response.msg
        } else if (status === 'success') {
          state.isEditing = false
          state.editSuccess = true
          state.successMessage = response.msg
        } else {
          state.isError = true
          state.errorMessage = response.msg
        }
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.editLoading = false
        state.editSuccess = false
      })
  },
})

export default eventSlice.reducer
export const { fillProfileInputs, togglePasswordVisibility, killAlertError } =
  eventSlice.actions
