import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const getOnboardingToLocalStorage = () => {
  const draftData = localStorage.getItem('onboarding')
  if (draftData) {
    return JSON.parse(localStorage.getItem('onboarding'))
  } else {
    return false
  }
}

const initialState = {
  activeNav: 0,
  currentActive: null,
  welcomeEnded: false,
  textCopied: false,
  showSearchInput: false,
  searchValue: '',
  onboardingDone: getOnboardingToLocalStorage(),
}

const eventSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    changeHomeNav: (state, action) => {
      state.activeNav = action.payload
    },
    alertErrorKill: (state, action) => {
      state[action.payload] = false
    },
    changeActiveNav: (state, action) => {
      state.activeNav = action.payload
    },
    copyToClipboard: (state, action) => {
      navigator.clipboard.writeText(action.payload)
      state.textCopied = true
    },
    killCopyAlert: (state, action) => {
      state.textCopied = false
    },
    fillSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    toggleShowSearch: (state, action) => {
      if (state.showSearchInput) {
        state.searchValue = ''
        state.showSearchInput = false
      } else {
        state.showSearchInput = true
      }
    },

    exitSearch: (state, action) => {
      if (state.showSearchInput) {
        state.searchValue = ''
        state.showSearchInput = false
      }
    },
    setOnboardingToLocalStorage: (state, action) => {
      localStorage.setItem('onboarding', JSON.stringify(state.onboardingDone))
    },
  },
})

export default eventSlice.reducer
export const {
  changeHomeNav,
  alertErrorKill,
  changeActiveNav,
  copyToClipboard,
  killCopyAlert,
  fillSearchValue,
  toggleShowSearch,
  exitSearch,
  setOnboardingToLocalStorage,
} = eventSlice.actions
