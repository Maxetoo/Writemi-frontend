import React from 'react'
import styled from 'styled-components'
import { Navbar } from '../home'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'

const CreateGroup = () => {
  return (
    <Wrapper>
      <div className='header'>
        <div className='header-icon back-btn'>
          <MdOutlineArrowBackIosNew />
        </div>
        <h3 className='header-title'>Create Group</h3>
        <div className='header-icon menu'>
          {/* <HiOutlineDotsVertical /> */}
        </div>
      </div>
      <div className='create-container'>
        <img src='' alt='' />
        <input
          type='file'
          id='image-input'
          accept='image/*'
          className='upload'
        />
        <input type='text' className='group-title' placeholder='Group title' />
        <textarea
          placeholder='Description'
          draggable='true'
          className='group-desc'
        ></textarea>
        <button type='button'>Create</button>
      </div>
      <Navbar />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  background: var(--secondary-home);
  text-align: center;
  color: var(--white-col);

  .header {
    height: 55px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    color: #ffffff;
    background: #435c6d;
  }

  .header-icon {
    font-size: 1.3em;
    cursor: pointer;
  }

  .header-title {
    font-size: 1em;
  }

  .create-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    margin-top: 2rem;
    padding-bottom: 7rem;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: whitesmoke;
    margin: 1rem;
  }

  .upload {
    background: #0000ff;
    border-radius: 5px;
  }

  input {
    background: none;
    color: var(--white-col);
  }

  .group-title {
    width: 80%;
    height: 50px;
    border: none;
    padding: 1rem;
    outline: none;
    font-size: 1em;
    margin: 1rem;
    border-bottom: solid 1.5px white;
  }

  .group-desc {
    margin: 1rem;
    min-width: 80%;
    max-width: 80%;
    min-height: 40px;
    border: none;
    outline: none;
    font-size: 1em;
    padding: 1rem;
    background: none;
    border-bottom: solid 1.5px white;
    color: var(--white-col);
  }

  button {
    margin: 1rem;
    height: 50px;
    width: 80%;
    border: none;
    background: var(--login-secondary);
    color: var(--white-col);
    font-size: 0.7em;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2em;
  }
`
export default CreateGroup
