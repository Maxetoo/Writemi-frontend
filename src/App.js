import React, { useEffect, useLayoutEffect } from 'react'
import {
  Route,
  Routes,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  userIsLoggedIn,
  updateCookieState,
  setUsernameToLocalStorage,
} from './slices/authSlice'
import { setDraftToLocalStorage } from './slices/draftSlice'
import { setOnboardingToLocalStorage, exitSearch } from './slices/eventSlice'
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
  Terms,
} from './page'
import {
  AccountSetting,
  Notification,
  TermsandConditions,
  Signout,
} from './components/profile'
import CreatePersonalMessage from './components/personalMessage/createMessage'
import ViewGroupMessages from './components/groups/groupMessageSection'
import CreateGroup from './components/groups/createGroup'
import EditGroup from './components/groups/editGroup'
import { EditDraftMessage } from './components/drafts'
import CreateGroupMessage from './components/groups/createMessage'
import {
  RedirectPage,
  ResetPasswordSuccess,
  EnterPasswordToken,
} from './components/password-flow'
import {
  ProtectedRoute,
  RedirectRoute,
  ProtectPasswordToken,
  ProtectPasswordReset,
} from './config'
import { getProfileLogs } from './slices/profileSlice'

const App = () => {
  const {
    isAuthenticated,
    isLoggedIn,
    userCookie,
    passwordResetSuccessful,
    username: getUsername,
  } = useSelector((store) => store.auth)
  const { draftEntries } = useSelector((store) => store.drafts)
  const { onboardingDone } = useSelector((store) => store.actions)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation().pathname
  const { loading, profile } = useSelector((store) => store.profile)
  const { username } = profile

  useEffect(() => {
    dispatch(setOnboardingToLocalStorage())
  }, [onboardingDone])

  useEffect(() => {
    dispatch(updateCookieState())
  }, [userCookie])

  useEffect(() => {
    dispatch(setDraftToLocalStorage())
  }, [draftEntries])

  useEffect(() => {
    if (location === '/' && userCookie) {
      navigate('/home')
    }
  }, [location])

  useEffect(() => {
    dispatch(exitSearch())
  }, [location])

  // useEffect(() => {
  //   if (!getUsername) {
  //     dispatch(getProfileLogs())
  //   }
  // }, [getUsername])

  // useEffect(() => {
  //   if (!loading) {
  //     dispatch(setUsernameToLocalStorage(username))
  //   }
  // }, [loading])

  return (
    <React.Fragment>
      <main className='main-app'>
        <Routes>
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/messages'
            element={
              <ProtectedRoute>
                <PersonalMessages />
              </ProtectedRoute>
            }
          />
          <Route
            path='/groups'
            element={
              <ProtectedRoute>
                <GroupMessages />
              </ProtectedRoute>
            }
          />
          <Route
            path='/groups/createGroup'
            element={
              <ProtectedRoute>
                <CreateGroup />
              </ProtectedRoute>
            }
          />
          <Route
            path='/groups/editGroup/:id'
            element={
              <ProtectedRoute>
                <EditGroup />
              </ProtectedRoute>
            }
          />
          <Route path='/groups/:id' element={<ViewGroupMessages />} />
          <Route
            path='/group/addMessage/:id'
            element={<CreateGroupMessage />}
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/accountSetting'
            element={
              <ProtectedRoute>
                <AccountSetting />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/notificationSetting'
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/termsAndConditions'
            element={
              <ProtectedRoute>
                <TermsandConditions />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/signout'
            element={
              <ProtectedRoute>
                <Signout />
              </ProtectedRoute>
            }
          />
          <Route
            path='/drafts'
            element={
              <ProtectedRoute>
                <Drafts />
              </ProtectedRoute>
            }
          />
          <Route
            path='/drafts/:id'
            element={
              <ProtectedRoute>
                <EditDraftMessage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/bookmarks'
            element={
              <ProtectedRoute>
                <Bookmarks />
              </ProtectedRoute>
            }
          />
          <Route
            path='/'
            element={
              <RedirectRoute>
                <Onboarding />
              </RedirectRoute>
            }
          />
          <Route path='/:id' element={<CreatePersonalMessage />} />
          <Route
            path='/login'
            element={
              <RedirectRoute>
                <Login />
              </RedirectRoute>
            }
          />
          <Route
            path='/signup'
            element={
              <RedirectRoute>
                <Signup />
              </RedirectRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <RedirectRoute>
                <ForgotPassword />
              </RedirectRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectPasswordReset>
                <RedirectRoute>
                  {passwordResetSuccessful ? (
                    <ResetPasswordSuccess />
                  ) : (
                    <ResetPassword />
                  )}
                </RedirectRoute>
              </ProtectPasswordReset>
            }
          />
          <Route
            path='/reset-redirect'
            element={
              <RedirectRoute>
                <RedirectPage />
              </RedirectRoute>
            }
          />
          <Route
            path='/password-token'
            element={
              <ProtectPasswordToken>
                <RedirectRoute>
                  <EnterPasswordToken />
                </RedirectRoute>
              </ProtectPasswordToken>
            }
          />
          <Route path='/signup/terms' element={<Terms />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </main>
    </React.Fragment>
  )
}

export default App
