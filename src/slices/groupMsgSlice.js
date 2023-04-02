import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL } from '../paths/url'

export const getGroups = createAsyncThunk(
  'actions/getGroups',
  async (payload, thunkApi) => {
    const { searchValue } = thunkApi.getState().actions
    try {
      const resp = await axios.get(
        `${URL}/api/v1/group?search=${searchValue}&page=1`,
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

export const uploadGroupImage = createAsyncThunk(
  'actions/uploadGroupImage',
  async (payload, thunkApi) => {
    try {
      const {
        data: { image },
      } = await axios.post(
        `${URL}/api/v1/group/space/uploadImage`,
        {
          image: payload,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      )
      return { response: image, status: 'success' }
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

export const createGroupSpace = createAsyncThunk(
  'actions/createGroup',
  async (payload, thunkAPI) => {
    const { name, description, image } = payload

    try {
      const resp = await axios.post(
        `${URL}/api/v1/group/space`,
        {
          name,
          description,
          image,
        },
        {
          withCredentials: true,
        }
      )
      window.location.href = `/groups`
      thunkAPI.dispatch(getGroups())
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

export const getSingleGroup = createAsyncThunk(
  'actions/getSingleGroup',
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.get(`${URL}/api/v1/group/getGroup/${payload}`, {
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

export const deleteGroup = createAsyncThunk(
  'actions/deleteGroup',
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.delete(`${URL}/api/v1/group/space/${payload}`, {
        withCredentials: true,
      })
      thunkAPI.dispatch(toggleGroupModal())
      thunkAPI.dispatch(getGroups())
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

export const editGroup = createAsyncThunk(
  'actions/editGroup',
  async (payload, thunkAPI) => {
    const { name, description, image, _id } = payload
    try {
      const resp = await axios.patch(
        `${URL}/api/v1/group/space/${_id}`,
        {
          name,
          description,
          image,
        },
        {
          withCredentials: true,
        }
      )
      thunkAPI.dispatch(getSingleGroup(_id))
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
  'actions/clearGroups',
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.delete(`${URL}/api/v1/group/space/clearSpaces`, {
        withCredentials: true,
      })
      thunkAPI.dispatch(getGroups())
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
  groupCreated: false,
  groupEntries: [],
  loading: false,
  isError: false,
  image:
    'https://ouch-cdn2.icons8.com/S07cWPmLAvXHhTADC95jExsKeh9oXk_4noCrCoSfZZY/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNTg1/LzFjYWI0MDMwLWNm/N2EtNGU0Zi1hNThm/LTYxMzUxZmVkZTFm/NS5zdmc.png',
  errorMessage: '',
  successMessage: '',
  uploadSuccess: false,
  uploadError: false,
  groupTitle: '',
  groupDescription: '',
  descriptionLength: 0,
  showGroupModal: false,
  getSingleGroupLoad: false,
  getSingleGroupEntry: [],
  deleteSuccess: false,
  deleteLoading: false,
  isEditing: false,
  editLoading: false,
  editSuccess: false,
  showClearBtn: false,
  clearLoading: false,
}

const eventSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    fillInputs: (state, action) => {
      const { title, description, isEditing } = action.payload
      state.groupTitle = title
      state.groupDescription = description
      state.descriptionLength = description.length
      state.isEditing = isEditing
    },
    killCreationAlert: (state, action) => {
      state.isError = false
      state.uploadError = false
      state.groupCreated = false
    },
    toggleGroupModal: (state, action) => {
      if (state.showGroupModal) {
        state.showGroupModal = false
      } else {
        state.showGroupModal = true
      }
    },
    killEditAlert: (state, action) => {
      state.isError = false
      state.editSuccess = false
    },
    defaultInputValues: (state, action) => {
      state.groupTitle = ''
      state.groupDescription = ''
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
  },
  extraReducers(builder) {
    builder
      .addCase(getGroups.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        const { response, status, code } = action.payload
        state.loading = true
        if (code === 500) {
          state.loading = true
        } else if (status === 'success') {
          state.loading = false
          state.isError = false
          state.groupEntries = response.cluster
        } else {
          state.isError = true
          state.loading = false
        }
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(uploadGroupImage.pending, (state, action) => {
        state.loading = true
        state.errorMessage = ''
        state.uploadError = false
      })
      .addCase(uploadGroupImage.fulfilled, (state, action) => {
        const { response, status, code } = action.payload
        state.loading = false
        if (code === 500) {
          state.uploadError = true
          state.uploadSuccess = false
          state.errorMessage = 'Failed to upload image'
        } else if (status === 'success') {
          state.uploadError = false
          state.uploadSuccess = true
          state.image = response.url
        } else {
          state.uploadError = false
          state.uploadSuccess = false
          state.errorMessage = 'Failed to upload image'
        }
      })
      .addCase(uploadGroupImage.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(createGroupSpace.pending, (state, action) => {
        state.loading = true
        state.errorMessage = ''
        state.groupCreated = false
      })
      .addCase(createGroupSpace.fulfilled, (state, action) => {
        const { response, status, code } = action.payload
        state.loading = false
        if (code === 500) {
          state.isError = true
          state.errorMessage = 'You appear to be offline'
        } else if (status === 'success') {
          state.groupCreated = true
          state.successMessage = response.msg
          state.groupTitle = ''
          state.groupDescription = ''
          state.descriptionLength = 0
          state.image = ''
        } else {
          state.isError = true
          state.errorMessage = response.msg
        }
      })
      .addCase(createGroupSpace.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getSingleGroup.pending, (state, action) => {
        state.getSingleGroupLoad = true
      })
      .addCase(getSingleGroup.fulfilled, (state, action) => {
        const { response, status, code } = action.payload
        state.getSingleGroupLoad = false
        if (code === 500) {
          state.isError = true
          state.getSingleGroupLoad = true
          state.errorMessage = 'You appear to be offline'
        } else if (status === 'success') {
          state.getSingleGroupEntry = response.group
        } else {
          state.isError = true
          state.getSingleGroupLoad = true
        }
      })
      .addCase(getSingleGroup.rejected, (state, action) => {
        state.getSingleGroupLoad = true
      })
      .addCase(deleteGroup.pending, (state, action) => {
        state.deleteLoading = true
        state.deleteSuccess = false
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        const { response, status, code } = action.payload
        state.deleteLoading = false
        if (code === 500) {
          state.isError = true
          state.errorMessage = 'You appear to be offline'
        } else if (status === 'success') {
          state.deleteSuccess = true
        } else {
          state.isError = true
          state.errorMessage = 'Unable to delete group'
        }
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false
        state.deleteSuccess = false
      })
      .addCase(editGroup.pending, (state, action) => {
        state.editLoading = true
        state.editSuccess = false
      })
      .addCase(editGroup.fulfilled, (state, action) => {
        const { response, status, code } = action.payload
        state.editLoading = false
        if (code === 500) {
          state.isError = true
          state.errorMessage = 'You appear to be offline'
        } else if (status === 'success') {
          state.editSuccess = true
          state.successMessage = response.msg
        } else {
          state.isError = true
          state.errorMessage = 'Unable to edit group'
        }
      })
      .addCase(editGroup.rejected, (state, action) => {
        state.editLoading = false
        state.editSuccess = false
      })
      .addCase(clearAllBookmarks.pending, (state, action) => {
        state.clearLoading = true
      })
      .addCase(clearAllBookmarks.fulfilled, (state, action) => {
        const { code, status, response } = action.payload
        state.clearLoading = false
        if (code === 500) {
          state.errorMessage = 'Unable to clear messages'
          state.isError = true
        } else if (status === 'success') {
          state.successMessage = response.msg
        }
      })
      .addCase(clearAllBookmarks.rejected, (state, action) => {
        state.clearLoading = false
      })
  },
})

export default eventSlice.reducer
export const {
  fillInputs,
  toggleGroupModal,
  killEditAlert,
  killCreationAlert,
  defaultInputValues,
  toggleShowClearBtn,
  exitClearBtn,
} = eventSlice.actions
