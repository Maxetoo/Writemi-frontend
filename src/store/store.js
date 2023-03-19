import { configureStore } from '@reduxjs/toolkit'
import eventSlice from '../slices/eventSlice'
import authSlice from '../slices/authSlice'
import messageSlice from '../slices/personalMsgSlice'
import draftSlice from '../slices/draftSlice'
import bookmarkSlice from '../slices/bookmarkSlice'
import groupSlice from '../slices/groupMsgSlice'
import singleGroupSlice from '../slices/singleGroupSlice'
import profileSlice from '../slices/profileSlice'

export const store = configureStore({
  reducer: {
    actions: eventSlice,
    auth: authSlice,
    messages: messageSlice,
    drafts: draftSlice,
    bookmarks: bookmarkSlice,
    groups: groupSlice,
    groupMessages: singleGroupSlice,
    profile: profileSlice,
  },
})
