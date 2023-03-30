import React from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const ProtectPasswordReset = ({ children }) => {
  const location = useLocation()
  const { validToken } = useSelector((store) => store.auth)

  if (!validToken) {
    return <Navigate to='/password-token' state={{ from: location }} replace />
  } else {
    return children
  }
}

export default ProtectPasswordReset
