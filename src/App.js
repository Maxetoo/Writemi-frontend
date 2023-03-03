import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  Home,
  Login,
  Signup,
  Error,
  ResetPassword,
  ForgotPassword,
  Onboarding,
  PersonalMessages,
  GroupMessages,
  Profile,
  Drafts,
  Bookmarks,
} from './page'
import CreatePersonalMessage from './components/personalMessage/createMessage'
import ViewGroupMessages from './components/groups/groupMessageSection'
import CreateGroup from './components/groups/createGroup'
import { RedirectPage, ResetPasswordSuccess } from './components/password-flow'

const App = () => {
  return (
    <React.Fragment>
      <main className='main-app'>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/messages' element={<PersonalMessages />} />
          <Route path='/groups' element={<GroupMessages />} />
          <Route path='/groups/createGroup' element={<CreateGroup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/drafts' element={<Drafts />} />
          <Route path='/bookmarks' element={<Bookmarks />} />
          <Route path='/onboarding' element={<Onboarding />} />
          <Route path='/:id' element={<CreatePersonalMessage />} />
          <Route path='/groups/:id' element={<ViewGroupMessages />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/reset-redirect' element={<RedirectPage />} />
          <Route
            path='/reset-password-success'
            element={<ResetPasswordSuccess />}
          />
          <Route path='*' element={<Error />} />
        </Routes>
      </main>
    </React.Fragment>
  )
}

export default App
