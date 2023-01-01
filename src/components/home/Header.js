import React from 'react'
import styled from 'styled-components'
// AiOutlineMenu
import { AiOutlineMenu } from 'react-icons/ai'
const Header = () => {
  return (
    <Wrapper>
      <h3>Maxeto</h3>
      <div className='menu-btn'>
        <AiOutlineMenu />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  height: 30px;
  width: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  /* border-bottom: solid 1px white; */
  z-index: 1000;
  /* background: black; */

  .menu-btn {
    background: white;
    color: black;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: grid;
    place-content: center;
    cursor: pointer;
  }
`
export default Header
