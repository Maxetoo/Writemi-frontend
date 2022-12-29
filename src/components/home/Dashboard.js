import React from 'react'
import styled from 'styled-components'

const Dashboard = () => {
  return (
    <Wrapper>
      <div className='dashboard-container'></div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  padding: 2rem;

  .dashboard-container {
    background: #e0e4e8;
    width: 100%;
    height: 350px;
    border-radius: 10px;
    border: solid 2px black;
  }
`
export default Dashboard
