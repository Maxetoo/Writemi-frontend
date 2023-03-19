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

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, userCookie } = useSelector(
    (store) => store.auth
  )
  const location = useLocation()
  const navigate = useNavigate()

  if (!userCookie) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
