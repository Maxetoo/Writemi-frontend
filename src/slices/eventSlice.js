import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeNav: 0,
  currentActive: null,
  welcomeEnded: false,
}

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    changeHomeNav: (state, action) => {
      state.activeNav = action.payload
    },
    getStarted: (state, action) => {},
  },
})

export default eventSlice.reducer
export const { changeHomeNav } = eventSlice.actions
