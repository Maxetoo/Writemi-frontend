import React from 'react'
import styled from 'styled-components'

const Welcomeframe = ({ image, header, details }) => {
  return (
    <Wrapper>
      <div className='welcome-frame'>
        <div className='header'>
          <img src={image} alt='' />
          <div className='counter'>
            {1}/{3}
          </div>
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
  }

  .counter {
    position: absolute;
    font-weight: bold;
    background: #121629;
    color: var(--white-col);
    height: 50px;
    width: 50px;
    display: grid;
    place-content: center;
    border-radius: 50%;
    border: solid 2px black;
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
