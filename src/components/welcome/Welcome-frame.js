import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { welcomeData } from './Data'

const Welcomeframe = ({ image, header, details }) => {
  const { currentSlide, slideEnded } = useSelector((store) => store.event)
  return (
    <Wrapper>
      <div className='welcome-frame'>
        <div className='header'>
          <img src={image} alt='' />
          {!slideEnded && (
            <div className='counter'>
              {currentSlide + 1}/{welcomeData.length}
            </div>
          )}
        </div>
        <div className='welcome-details'>
          <h3>{header}</h3>
          <p>{details}</p>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .welcome-frame {
    width: 100vw;
    height: auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: row;
    align-items: end;
    margin-top: 1rem;
    position: relative;
  }

  @media only screen and (min-width: 768px) {
    .header {
      height: 250px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: 0.1rem;
    border: solid 1.5px #121629;
    object-position: top;
    background: whitesmoke;
  }

  .counter {
    position: absolute;
    font-weight: bold;
    /* background: #121629; */
    background: white;
    /* color: var(--white-col); */
    color: black;
    height: 55px;
    width: 55px;
    display: grid;
    place-content: center;
    border-radius: 50%;
    border: solid 5px black;
    top: -1rem;
    left: -1rem;
  }

  .welcome-details {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 2rem;
  }

  p {
    margin-top: 1.5rem;
  }
`

export default Welcomeframe
