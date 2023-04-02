import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL } from '../paths/url'

const initialState = {
  loading: false,
  isError: false,
  sendingError: false,
  message: '',
  errorMessage: '',
  successMessage: '',
  messageLength: 0,
  sendLoading: false,
  messageSent: false,
  deletePending: false,
  deleteError: false,
  personalMessages: [],
  personalMessagesCopy: [],
  userOffline: false,
  addToDraft: false,
  messageDeleted: false,
  messageId: '',
  clearLoading: false,
  clearSuccess: false,
  showClearBtn: false,
  totalMessages: 0,
  currentPage: 1,
}

export const getPersonalMessages = createAsyncThunk(
  'action/getall',
  async (payload, thunkApi) => {
    const { searchValue } = thunkApi.getState().actions
    const { currentPage } = thunkApi.getState().messages
    try {
      const resp = await axios.get(
        `${URL}/api/v1/personal?search=${searchValue}&page=${currentPage}`,
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

export const deletePersonalMessage = createAsyncThunk(
  'action/delete',
  async (payload, thunkApi) => {
    try {
      const resp = await axios.delete(`${URL}/api/v1/personal/${payload}`, {
        withCredentials: true,
      })
      thunkApi.dispatch(getPersonalMessages())
      return { response: resp.data, status: 'success' }
    } catch (error) {
      // thunkApi.dispatch()
      return {
        response: error.response.data,
        status: 'error',
        code: error.response.status,
      }
      // return error.response.data
    }
  }
)

export const createPersonalMessage = createAsyncThunk(
  'action/create',
  async (payload, thunkApi) => {
    const { username, message } = payload
    try {
      const resp = await axios.post(
        `${URL}/api/v1/personal?username=${username}`,
        {
          message,
        },
        {
          withCredentials: true,
        }
      )
      console.log(resp.data)
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

export const clearAllPersonalMessages = createAsyncThunk(
  'actions/clearPersonalMessages',
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.delete(`${URL}/api/v1/personal/clearMessages`, {
        withCredentials: true,
      })
      thunkAPI.dispatch(getPersonalMessages())
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

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fillMessageInput: (state, action) => {
      state.message = action.payload
      state.messageLength = state.message.length
    },
    alertErrorKill: (state, action) => {
      state.sendingError = false
    },
    killDeleteAlert: (state, action) => {
      state.deleteError = false
      state.messageDeleted = false
    },
    toggleShowClearBtn: (state, action) => {
      if (state.showClearBtn) {
        state.showClearBtn = false
      } else {
        state.showClearBtn = true
      }
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
    exitClearBtn: (state, action) => {
      state.showClearBtn = false
    },
    getMessageId: (state, action) => {
      // state.messageId = state.personalMessages.find(
      //   (value) => value._id === action.payload
      // )
      console.log(state.personalMessagesCopy)
      // console.log('message', state.personalMessages)
    },
    sender: (state, action) => {
      console.log(action.payload)
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPersonalMessages.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getPersonalMessages.fulfilled, (state, action) => {
        const { response, status, code } = action.payload
        state.loading = true
        if (code === 500) {
          state.loading = true
        } else if (status === 'success') {
          state.loading = false
          state.isError = false
          state.personalMessages = response.messages
          state.totalMessages = response.count
        } else {
          state.isError = true
          state.loading = false
        }
      })
      .addCase(getPersonalMessages.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(deletePersonalMessage.pending, (state, action) => {
        state.deletePending = true
        state.deleteError = false
        // state.messageId = state.personalMessages
        // console.log('resp', state.personalMessages)
      })
      .addCase(deletePersonalMessage.fulfilled, (state, action) => {
        const { code, status, response } = action.payload
        state.deletePending = false
        if (code === 500) {
          state.errorMessage = 'Unable to delete message'
          state.deleteError = true
        } else if (status === 'success') {
          state.messageDeleted = true
          state.successMessage = 'message deleted'
        }
      })
      .addCase(deletePersonalMessage.rejected, (state, action) => {
        state.deleteSuccessful = false
      })
      .addCase(createPersonalMessage.pending, (state, action) => {
        state.sendLoading = true
        state.sendingError = false
        state.addToDraft = false
        console.log('LOAD...')
      })
      .addCase(createPersonalMessage.fulfilled, (state, action) => {
        state.sendLoading = false
        const { status, response, code } = action.payload
        if (code === 500 && state.messageLength > 5) {
          state.addToDraft = true
          state.sendingError = true
          state.errorMessage = `You appear to be offline, message will be saved to draft`
          state.messageSent = false
        } else if (code === 500 && state.messageLength < 5) {
          state.sendingError = true
          state.errorMessage = `Your connection is down`
          state.messageSent = false
        } else if (status === 'error') {
          state.sendingError = true
          state.errorMessage = response.msg
          state.messageSent = false
        } else {
          state.sendingError = false
          state.messageSent = true
        }
      })
      .addCase(createPersonalMessage.rejected, (state, action) => {
        state.sendLoading = false
        state.addToDraft = false
      })
      .addCase(clearAllPersonalMessages.pending, (state, action) => {
        state.clearLoading = true
        state.clearSuccess = false
      })
      .addCase(clearAllPersonalMessages.fulfilled, (state, action) => {
        const { code, status, response } = action.payload
        state.clearLoading = false
        if (code === 500) {
          state.errorMessage = 'Unable to clear messages'
          state.deleteError = true
        } else if (status === 'success') {
          state.clearSuccess = true
          state.successMessage = response.msg
        }
      })
      .addCase(clearAllPersonalMessages.rejected, (state, action) => {
        state.clearLoading = false
      })
  },
})

export default messageSlice.reducer
export const {
  fillMessageInput,
  sender,
  alertErrorKill,
  killDeleteAlert,
  getMessageId,
  fillSearchValue,
  toggleShowClearBtn,
  exitClearBtn,
  pageNavigator,
  pageToDefault,
} = messageSlice.actions
