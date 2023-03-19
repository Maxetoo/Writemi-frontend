import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const getDraftToLocalStorage = () => {
  const draftData = localStorage.getItem('draftEntries')
  if (draftData) {
    return JSON.parse(localStorage.getItem('draftEntries'))
  } else {
    return []
  }
}

const initialState = {
  draftEntries: getDraftToLocalStorage(),
  isEditing: false,
  message: '',
  editId: '',
  draftIdCorrect: true,
  draftMessageLength: 0,
}

const eventSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    saveToDraft: (state, action) => {
      state.draftEntries = [...state.draftEntries, action.payload]
    },
    setDraftToLocalStorage: (state, action) => {
      localStorage.setItem('draftEntries', JSON.stringify(state.draftEntries))
    },
    deleteDraftMessage: (state, action) => {
      state.draftEntries = state.draftEntries.filter(
        (value) => value._id !== action.payload
      )
    },
    fillEditValues: (state, action) => {
      state.message = action.payload
      state.draftMessageLength = state.message.length
    },

    editDraftMessage: (state, action) => {
      const { id, message } = action.payload
      state.isEditing = true
      state.editId = id
      state.message = message
    },

    saveDraftMessage: (state, action) => {
      if (state.isEditing && state.message.length > 5) {
        state.draftEntries = state.draftEntries.map((value) => {
          if (value._id === state.editId) {
            return {
              ...value,
              dateUpdated: new Date().getTime(),
              message: state.message,
            }
          }
          return value
        })
      }
      state.isEditing = false
      state.editId = ''
    },

    checkDraftId: (state, action) => {
      const draftMessagePresent = state.draftEntries.find(
        (value) => value._id.toString() === action.payload.toString()
      )
      if (draftMessagePresent) {
        state.draftIdCorrect = true
      } else {
        state.draftIdCorrect = false
      }

      console.log(state.draftIdCorrect)
    },
  },
})

export default eventSlice.reducer
export const {
  saveToDraft,
  setDraftToLocalStorage,
  deleteDraftMessage,
  saveDraftMessage,
  fillEditValues,
  editDraftMessage,
  checkDraftId,
} = eventSlice.actions
