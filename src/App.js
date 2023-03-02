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
} from './page'

import { RedirectPage, ResetPasswordSuccess } from './components/password-flow'

const App = () => {
  return (
    <React.Fragment>
      <main className='main-app'>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/messages' element={<PersonalMessages />} />
          <Route path='/groups' element={<GroupMessages />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/onboarding' element={<Onboarding />} />
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
