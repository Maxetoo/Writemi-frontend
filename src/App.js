import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Signup, Login, Bookmark, Error, Welcome } from './pages'
const App = () => {
  return (
    <React.Fragment>
      <main className='main-app'>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/bookmark' element={<Bookmark />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </main>
    </React.Fragment>
  )
}

export default App
