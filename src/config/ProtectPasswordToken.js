import React from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const ProtectPasswordToken = ({ children }) => {
  const location = useLocation()
  const { validEmail } = useSelector((store) => store.auth)
  if (!validEmail) {
    return <Navigate to='/forgot-password' state={{ from: location }} replace />
  } else {
    return children
  }
}

export default ProtectPasswordToken
