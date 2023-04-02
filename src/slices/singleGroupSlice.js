import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL } from '../paths/url'

const initialState = {
  messageEntries: [],
  groupSpace: [],
  reportEntries: [],
  isLoading: false,
  errorPresent: false,
  errorMessage: '',
  successMessage: '',
  message: '',
  createLoading: false,
  createSuccess: false,
  createFailed: false,
  totalMessages: 0,
  currentPage: 1,
  loginPrompt: false,
  messageFlagged: false,
}

export const getGroupMessages = createAsyncThunk(
  'actions/getGroupMessages',
  async (payload, thunkApi) => {
    const { searchValue } = thunkApi.getState().actions
    const { currentPage } = thunkApi.getState().groupMessages
    try {
      const resp = await axios.get(
        `${URL}/api/v1/singleGroup/getMessages/${payload}?search=${searchValue}&page=${currentPage}`,
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

export const createGroupMessage = createAsyncThunk(
  'actions/createGroupMessage',
  async (payload, thunkApi) => {
    const { message, _id } = payload
    // const { searchValue } = thunkApi.getState().actions
    try {
      const resp = await axios.post(
        `${URL}/api/v1/singleGroup/addMessage/${_id}`,
        {
          message,
        },
        {
          withCredentials: true,
        }
      )
      window.location.href = `/groups/${_id}`
      thunkApi.dispatch(getGroupMessages())
      return { response: resp.data, status: 'success' }
    } catch (error) {
      console.log(error)
      return {
        response: error.response.data,
        status: 'error',
        code: error.response.status,
      }
    }
  }
)

export const flagGroupMessage = createAsyncThunk(
  'actions/flagGroupMessage',
  async (payload, thunkApi) => {
    try {
      const resp = await axios.patch(
        `${URL}/api/v1/singleGroup/reportMessage/${payload}`,
        {
          withCredentials: true,
        }
      )
      thunkApi.dispatch(getGroupReports(payload))
      return { response: resp.data, status: 'success' }
    } catch (error) {
      thunkApi.dispatch(getGroupReports(payload))
      return {
        response: error.response.data,
        status: 'error',
        code: error.response.status,
      }
    }
  }
)

export const getGroupReports = createAsyncThunk(
  'actions/getGroupReports',
  async (payload, thunkApi) => {
    try {
      const resp = await axios.get(
        `${URL}/api/v1/singleGroup/getReports/${payload}`,
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

const eventSlice = createSlice({
  name: 'groupMessages',
  initialState,
  reducers: {
    fillInput: (state, action) => {
      state.message = action.payload
    },
    killErrorAlert: (state, action) => {
      state.createFailed = false
      state.errorPresent = false
      state.messageFlagged = false
    },
    pageNavigator: (state, action) => {
      const { type, totalPages } = action.payload
      if (type === 'inc') {
        state.currentPage = state.currentPage + 1
      } else {
        state.currentPage = state.currentPage - 1
      }

      if (state.currentPage < 1) {
        state.currentPage = 1
      } else if (state.currentPage > totalPages) {
        state.currentPage = totalPages
      }
    },
    pageToDefault: (state, action) => {
      state.currentPage = 1
    },
    exitPrompt: (state, action) => {
      state.loginPrompt = false
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getGroupMessages.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getGroupMessages.fulfilled, (state, action) => {
        const { response, status, code } = action.payload
        state.isLoading = false
        if (code === 500) {
          state.isLoading = true
          state.errorPresent = true
          state.errorMessage = response.msg
        } else if (status === 'success') {
          state.isLoading = false
          state.errorPresent = false
          state.messageEntries = response.messages
          state.totalMessages = response.count
        } else {
          state.errorPresent = true
          state.isLoading = false
          state.errorMessage = response.msg
        }
      })
      .addCase(getGroupMessages.rejected, (state, action) => {
        state.isLoading = true
      })
      .addCase(createGroupMessage.pending, (state, action) => {
        state.createLoading = true
        state.errorPresent = false
        state.createFailed = false
        state.loginPrompt = false
      })
      .addCase(createGroupMessage.fulfilled, (state, action) => {
        const { response, status, code } = action.payload
        state.createLoading = false
        if (code === 500) {
          state.createFailed = true
          state.errorMessage = `Failed to create message`
        } else if (code === 401) {
          state.loginPrompt = true
        } else if (status === 'success') {
          state.createFailed = false
          state.successMessage = response.msg
        } else {
          state.createFailed = true
          state.errorMessage = response.msg
          state.errorPresent = true
        }
      })
      .addCase(createGroupMessage.rejected, (state, action) => {
        state.isLoading = true
      })
      .addCase(flagGroupMessage.pending, (state, action) => {
        state.errorPresent = false
        state.loginPrompt = false
      })
      .addCase(flagGroupMessage.fulfilled, (state, action) => {
        const { response, status, code } = action.payload
        if (code === 500) {
          state.messageFlagged = false
          state.errorPresent = true
          state.errorMessage = `Failed to create message`
        } else if (code === 401) {
          state.errorPresent = false
          state.loginPrompt = true
        } else if (status === 'success') {
          state.errorPresent = false
          state.messageFlagged = true
          state.successMessage = response.msg
        } else {
          state.messageFlagged = false
          state.errorPresent = true
          state.errorMessage = response.msg
        }
      })
      .addCase(flagGroupMessage.rejected, (state, action) => {
        state.messageFlagged = false
        state.errorPresent = true
      })
  },
})

export default eventSlice.reducer
export const {
  fillInput,
  killErrorAlert,
  pageNavigator,
  pageToDefault,
  exitPrompt,
} = eventSlice.actions
