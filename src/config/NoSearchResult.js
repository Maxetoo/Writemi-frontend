import React from 'react'
import styled from 'styled-components'

const NoSearchResult = () => {
  return <Wrapper>No Search Result!</Wrapper>
}

const Wrapper = styled.article`
  width: 80%;
  height: auto;
  border-radius: 5px;
  text-align: center;
  color: #ffffff;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`
export default NoSearchResult
