import React, { useState, useEffect } from 'react'
import { welcomeData } from './Data'
import WelcomeFrame from './Welcome-frame'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { changeSlide } from '../../slices/eventSlice'
import { Link, useNavigate } from 'react-router-dom'
const MainBody = () => {
  const { currentSlide, slideEnded } = useSelector((store) => store.event)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id, image, details, header } = welcomeData[currentSlide]
  return (
    <Wrapper>
      <WelcomeFrame key={id} image={image} details={details} header={header} />
      <div className='btns-container'>
        {/* {!slideEnded && (
          <div className='counter'>
            {currentSlide + 1}/{welcomeData.length}
          </div>
        )} */}
        {slideEnded ? (
          <button
            type='button'
            onClick={() => {
              navigate('/signup')
            }}
          >
            Get Started
          </button>
        ) : (
          <button
            type='button'
            onClick={() => dispatch(changeSlide(welcomeData.length - 1))}
          >
            Next
          </button>
        )}
      </div>
      {!slideEnded && (
        <p
          className='skip'
          onClick={() => {
            navigate('/signup')
          }}
        >
          Skip
        </p>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.article`
  height: auto;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--welcome-page-bg);

  .btns-container {
    margin-top: -0.5rem;
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  button {
    color: var(--white-col);
    background: #ff8906;
    width: 200px;
    height: 50px;
    font-size: 0.9em;
    border: solid 2px #121629;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
    font-weight: bold;
  }

  .skip {
    width: 80%;
    margin-top: -1rem;
    opacity: 0.5;
    font-size: 1em;
    cursor: pointer;
    /* text-decoration: underline; */
    text-align: end;
  }
`

export default MainBody
