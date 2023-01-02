import React from 'react'
import styled from 'styled-components'
import { HomePageData } from './Data.js'
import { Link } from 'react-router-dom'
import { BiChevronRight } from 'react-icons/bi'
import { AiOutlinePoweroff } from 'react-icons/ai'
// AiOutlinePoweroff
// BiChevronRight

const Body = () => {
  return (
    <Wrapper>
      {HomePageData.map((value) => {
        const { id, link, icon, text } = value
        return (
          <Link className='home-list' to={link} key={id}>
            <div className='home-list--left'>
              <p className='icon' style={{ color: '#232946' }}>
                {icon}
              </p>
              <h5>{text}</h5>
            </div>
            <BiChevronRight />
          </Link>
        )
      })}
      <div className='logout-btn'>
        <AiOutlinePoweroff className='off-icon' />
        <h5 className='logout'>Log out</h5>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .home-list {
    width: 80%;
    height: 55px;
    display: flex;
    font-size: 1.1em;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0.5rem;
    background: white;
    border-radius: 5px;
    text-decoration: none;
    padding: 1.5rem;
    color: black;
    border: solid 1px var(--stroke);
  }

  .home-list--left {
    display: flex;
    flex-direction: row;
  }

  h5 {
    margin-top: 0.25rem;
  }

  .icon {
    margin-right: 1rem;
    margin-top: 0.3rem;
  }

  .logout-btn {
    width: 80%;
    height: 50px;
    display: flex;
    font-size: 1.1em;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 2rem;
    /* background: #ffab91; */
    background: #f25042;
    color: white;
    border-radius: 5px;
    border: solid 1px var(--stroke);
    cursor: pointer;
  }

  .off-icon {
    margin-right: 0.5rem;
    /* margin-top: 0.2rem; */
  }

  .logout {
    margin-bottom: 0.4rem;
  }
`
export default Body
