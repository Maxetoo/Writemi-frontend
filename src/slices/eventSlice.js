import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentSlide: 0,
  slideEnded: false,
  welcomeEnded: false,
}

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    changeSlide: (state, action) => {
      state.currentSlide = state.currentSlide + 1
      console.log(state.currentSlide, action.payload)
      if (state.currentSlide === action.payload) {
        state.slideEnded = true
      }
    },
    getStarted: (state, action) => {},
  },
})

export default eventSlice.reducer
export const { changeSlide, getStarted } = eventSlice.actions
