import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'
import { onBoardingData } from '../services/onboardingData'
import OnboardingSlide from '../components/onboarding/OnboardingSlide'
import Slider from 'react-touch-drag-slider'

const Onboarding = () => {
  const navigate = useNavigate()
  const btn = useRef()
  const [slideIndex, setSlideIndex] = useState(0)

  const navigatePage = () => {
    navigate('/login')
  }

  const navigateSlides = (index) => {
    setSlideIndex(index)
  }

  return (
    <Wrapper>
      <div className='btn-container'>
        {onBoardingData.map((value, index) => {
          return (
            <div
              key={index}
              className={`line ${index <= slideIndex ? 'active' : ''}`}
              onClick={() => navigateSlides(index)}
            ></div>
          )
        })}
      </div>
      <Slider
        onSlideComplete={(i) => {
          setSlideIndex(i)
        }}
        // onSlideStart={(i) => {
        //   setSlideIndex(i)
        // }}
        activeIndex={slideIndex}
        threshHold={100}
        transition={0.5}
        scaleOnDrag={true}
      >
        {onBoardingData.map((value, index) => {
          return <OnboardingSlide {...value} key={index} />
        })}
      </Slider>

      <button type='button' ref={btn} onClick={navigatePage}>
        {slideIndex === onBoardingData.length - 1 ? 'Get started' : 'Skip'}
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: var(--dark-secondary);
  color: var(--white-col);
  overflow: none;
  padding: 1rem;

  .btn-container {
    margin: 1rem;
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  button {
    margin: 3.05rem;
    height: 55px;
    width: 75%;
    border: none;
    background: var(--login-secondary);
    color: var(--white-col);
    font-size: 0.9em;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1em;
  }

  .line {
    width: 100%;
    margin: 0.1rem;
    height: 2px;
    background: var(--white-col);
    cursor: pointer;
  }

  .active {
    background: #0000ff;
    transition: 1s all;
  }

  @media only screen and (min-width: 768px) {
    button {
      width: 350px;
    }
    .btn-container {
      width: 350px;
    }
  }
`

export default Onboarding
