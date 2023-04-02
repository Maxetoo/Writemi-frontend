import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL } from '../paths/url'

export const addToBookmark = createAsyncThunk(
  'actions/addBookmark',
  async (payload, thunkAPI) => {
    const { message, source, link } = payload
    try {
      const resp = await axios.post(
        `${URL}/api/v1/bookmark/addToBookmark`,
        {
          source,
          message,
          link,
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

export const getBookmarks = createAsyncThunk(
  'actions/getBookmarks',
  async (payload, thunkApi) => {
    const { searchValue } = thunkApi.getState().actions
    const { currentPage } = thunkApi.getState().bookmarks

    try {
      const resp = await axios.get(
        `${URL}/api/v1/bookmark/getBookmarks?search=${searchValue}&page=${currentPage}`,
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

export const deleteBookmark = createAsyncThunk(
  'actions/deleteBookmark',
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.delete(
        `${URL}/api/v1/bookmark/deleteBookmark/${payload}`,
        {
          withCredentials: true,
        }
      )
      // console.log(resp.data)
      thunkAPI.dispatch(setBtnIndex(payload))
      thunkAPI.dispatch(getBookmarks())
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

export const clearAllBookmarks = createAsyncThunk(
  'actions/clearBookmarks',
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.delete(`${URL}/api/v1/bookmark/clearBookmarks`, {
        withCredentials: true,
      })
      thunkAPI.dispatch(getBookmarks())
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

const initialState = {
  isError: false,
  loading: false,
  fetchLoading: false,
  clearLoading: false,
  alertMessage: '',
  bookmarkAdded: false,
  bookmarkEntries: [],
  deletePending: false,
  deleteSuccess: false,
  copySuccess: false,
  deleteError: false,
  bookmarkAlertMsg: '',
  targetId: '',
  showClearBtn: false,
  totalMessages: 0,
  currentPage: 1,
  bookmarkLoginPrompt: false,
}

const eventSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    killBookmarkAlert: (state, action) => {
      state.isError = false
      state.alertMessage = ''
      state.bookmarkAdded = false
    },
    alertErrorKill: (state, action) => {
      state.deleteSuccess = false
    },
    setBtnIndex: (state, action) => {
      state.targetId = state.bookmarkEntries.find(
        (value) => value._id === action.payload
      )._id
      console.log('target', state.targetId)
    },

    toggleShowClearBtn: (state, action) => {
      if (state.showClearBtn) {
        state.showClearBtn = false
      } else {
        state.showClearBtn = true
      }
    },
    exitClearBtn: (state, action) => {
      state.showClearBtn = false
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
    exitLoginPrompt: (state, action) => {
      state.bookmarkLoginPrompt = false
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addToBookmark.pending, (state, action) => {
        state.loading = true
        state.isError = false
        state.alertMessage = ''
        state.bookmarkAdded = false
        state.bookmarkLoginPrompt = false
      })
      .addCase(addToBookmark.fulfilled, (state, action) => {
        state.loading = false
        const { status, code, response } = action.payload
        if (code === 500) {
          state.isError = true
          state.bookmarkAdded = false
          state.alertMessage = 'Unable to bookmark message'
        } else if (code === 401) {
          state.isError = false
          state.bookmarkLoginPrompt = true
        } else if (status === 'success') {
          state.bookmarkAdded = true
          state.isError = false
          state.alertMessage = 'message added to bookmark'
        } else {
          state.isError = true
          state.bookmarkAdded = false
          state.alertMessage = response.msg
        }
      })
      .addCase(addToBookmark.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getBookmarks.pending, (state, action) => {
        state.fetchLoading = true
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.fetchLoading = true
        const { response, status, code } = action.payload
        if (code === 500) {
          state.loading = true
        } else if (status === 'success') {
          state.fetchLoading = false
          state.isError = false
          state.bookmarkEntries = response.bookmarks
          state.totalMessages = response.count
        } else {
          state.isError = true
          state.fetchLoading = false
        }
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        state.fetchLoading = false
      })
      .addCase(deleteBookmark.pending, (state, action) => {
        state.deletePending = true
        state.deleteError = false
        state.deleteSuccess = false
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        const { code, status, response } = action.payload
        state.deletePending = false
        if (code === 500) {
          state.bookmarkAlertMsg = 'Unable to delete message'
          state.deleteError = true
        } else if (status === 'success') {
          state.deleteSuccess = true
          state.bookmarkAlertMsg = response.msg
        }
        console.log(action.payload)
      })
      .addCase(deleteBookmark.rejected, (state, action) => {
        state.deletePending = false
      })
      .addCase(clearAllBookmarks.pending, (state, action) => {
        state.clearLoading = true
      })
      .addCase(clearAllBookmarks.fulfilled, (state, action) => {
        const { code, status, response } = action.payload
        state.clearLoading = false
        if (code === 500) {
          state.bookmarkAlertMsg = 'Unable to clear messages'
          state.deleteError = true
        } else if (status === 'success') {
          state.deleteSuccess = true
          state.bookmarkAlertMsg = response.msg
        }
      })
      .addCase(clearAllBookmarks.rejected, (state, action) => {
        state.clearLoading = false
      })
  },
})

export default eventSlice.reducer
export const {
  killBookmarkAlert,
  alertErrorKill,
  setBtnIndex,
  toggleShowClearBtn,
  exitClearBtn,
  pageNavigator,
  pageToDefault,
  exitLoginPrompt,
} = eventSlice.actions
