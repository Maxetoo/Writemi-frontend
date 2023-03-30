import React from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const RedirectRoute = ({ children }) => {
  const location = useLocation()
  const { isAuthenticated, userCookie } = useSelector((store) => store.auth)
  if (userCookie) {
    return <Navigate to='/home' state={{ from: location }} replace />
  } else {
    return children
  }
}

export default RedirectRoute
