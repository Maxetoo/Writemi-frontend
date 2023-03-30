import React from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

const EmptyGroup = () => {
  const { id } = useParams()
  const currentUrl = `${window.origin}/group/addMessage/${id}`
  const shareUrl = () => {
    window.navigator
      .share({
        url: currentUrl,
        title: 'Writeme',
        text: `You're invited to contribute your thoughts to this space`,
      })
      .then(() => console.log('success'))
      .catch(() => 'Error')
  }
  const navigate = useNavigate()
  return (
    <Wrapper>
      <img
        src='https://ouch-cdn2.icons8.com/FJEiV3x9qjSs-JComNUliI-fOzwuRCzNqohb5e_aexU/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNTg4/Lzg2YTMxMTI2LTc4/NzktNDI4My05Yjky/LWYyMjliNDc0OGU4/NC5zdmc.png'
        alt='empty'
      />
      <h3>Nothing yet..😅</h3>
      <p>Tap on the share button to invite people to add messages</p>
      <button type='button' onClick={shareUrl}>
        Share
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  width: 80%;
  height: auto;
  border-radius: 5px;
  text-align: center;
  /* background: #435c6d; */
  color: #ffffff;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  /* border: solid 1px black; */

  img {
    margin-top: -4rem;
  }

  p {
    width: 70%;
    text-align: center;
    margin-top: 0.5rem;
  }

  button {
    margin: 1rem;
    height: 50px;
    width: 90%;
    border: none;
    background: var(--login-secondary);
    color: var(--white-col);
    font-size: 0.9em;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }
`
export default EmptyGroup
