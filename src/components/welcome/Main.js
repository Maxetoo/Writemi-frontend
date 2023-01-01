import React from 'react'
import { welcomeData } from './Data'
import WelcomeFrame from './Welcome-frame'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { changeSlide } from '../../slices/eventSlice'
import { useNavigate } from 'react-router-dom'
const MainBody = () => {
  const { currentSlide, slideEnded } = useSelector((store) => store.event)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id, image, details, header } = welcomeData[currentSlide]
  return (
    <Wrapper>
      <WelcomeFrame key={id} image={image} details={details} header={header} />
      <div className='btns-container'>
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
  background: #121629;
  color: var(--white-col);

  .btns-container {
    margin-top: -1rem;
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
    color: var(--white-col);
    width: 100%;
    height: 50px;
    font-size: 0.9em;
    border: solid 2px #121629;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .arrow {
    margin-left: 1rem;
    font-size: 1em;
  }

  .skip {
    width: 80%;
    margin-top: -0.5rem;
    opacity: 0.5;
    font-size: 0.9em;
    cursor: pointer;
    text-decoration: underline;
    text-align: center;
  }

  @media only screen and (min-width: 768px) {
    button {
      width: 50%;
      height: 55px;
    }
  }
`

export default MainBody
