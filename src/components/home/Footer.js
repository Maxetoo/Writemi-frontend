import React from 'react'
import styled from 'styled-components'
import { MdOutlineCopyright } from 'react-icons/md'

const Footer = () => {
  return (
    <Wrapper>
      <MdOutlineCopyright className='icon' /> Writemi 2023. All rights reserved
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  width: 100%;
  background: #ffab91;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.75em;
  margin-top: 3rem;

  .icon {
    margin-right: 0.5rem;
    margin-top: 0.1rem;
  }
`

export default Footer
