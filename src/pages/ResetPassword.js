import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
  return (
    <Wrapper>
      <h2>Reset Password</h2>
      <p>Please enter new password</p>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(
    174.2deg,
    rgba(255, 244, 228, 1) 7.1%,
    rgba(240, 246, 238, 1) 67.4%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export default ResetPassword