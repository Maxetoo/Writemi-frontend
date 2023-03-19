import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  messageEntries: [],
  isLoading: false,
  errorPresent: false,
  errorMessage: '',
}

export const getGroupMessages = createAsyncThunk(
  'actions/getGroupMessages',
  async (payload, thunkApi) => {
    const { searchValue } = thunkApi.getState().actions
    try {
      const resp = await axios.get(`/api/v1/group/getMessage/${payload}`, {
        withCredentials: true,
      })
      console.log(resp.data)
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

export const createGroupMessage = createAsyncThunk(
  'actions/createGroupMessage',
  async (payload, thunkApi) => {
    const { message, _id } = payload
    // const { searchValue } = thunkApi.getState().actions
    try {
      const resp = await axios.patch(
        `/api/v1/group/addMessage/${_id}`,
        {
          message,
        },
        {
          withCredentials: true,
        }
      )
      thunkApi.dispatch(getGroupMessages())
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

export const flagGroupMessage = createAsyncThunk(
  'actions/flagGroupMessage',
  async (payload, thunkApi) => {
    const { message, _id } = payload
    // const { searchValue } = thunkApi.getState().actions
    try {
      const resp = await axios.patch(
        `/api/v1/group/addMessage/${_id}`,
        {
          message,
        },
        {
          withCredentials: true,
        }
      )
      thunkApi.dispatch(getGroupMessages())
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
  reducers: {},
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
        } else if (status === 'success') {
          state.isLoading = false
          state.errorPresent = false
          state.messageEntries = response.space[0].messages
        } else {
          state.errorPresent = true
          state.isLoading = false
        }
      })
      .addCase(getGroupMessages.rejected, (state, action) => {
        state.isLoading = true
      })
  },
})

export default eventSlice.reducer
export const {} = eventSlice.actions
