import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Navbar } from '../home'
import { BsPencilSquare } from 'react-icons/bs'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import Logo from '../../assets/images/half-logo.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  uploadGroupImage,
  fillInputs,
  createGroupSpace,
  killCreationAlert,
  defaultInputValues,
} from '../../slices/groupMsgSlice'
import { AlertError, AlertSuccess } from '../../config'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

// BsPencilSquare

const CreateGroup = () => {
  const {
    loading,
    isError,
    image,
    errorMessage,
    uploadSuccess,
    uploadError,
    groupTitle,
    groupDescription,
    groupCreated,
    descriptionLength,
    successMessage,
  } = useSelector((store) => store.groups)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (uploadError || isError || uploadSuccess || groupCreated) {
      const timer = setTimeout(() => {
        dispatch(killCreationAlert())
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [uploadError, isError, uploadSuccess, groupCreated])

  useEffect(() => {
    dispatch(defaultInputValues())
  }, [])

  return (
    <Wrapper>
      <div className='header'>
        <div
          className='header-icon back-btn'
          onClick={() => navigate('/groups')}
        >
          <MdOutlineArrowBackIosNew />
        </div>
        <h3 className='header-title'>Create Group</h3>
        <div className='header-icon menu'>
          {/* <HiOutlineDotsVertical /> */}
        </div>
      </div>
      <div className='create-container'>
        <img
          src={
            uploadSuccess
              ? image
              : `https://ouch-cdn2.icons8.com/S07cWPmLAvXHhTADC95jExsKeh9oXk_4noCrCoSfZZY/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNTg1/LzFjYWI0MDMwLWNm/N2EtNGU0Zi1hNThm/LTYxMzUxZmVkZTFm/NS5zdmc.png`
          }
          alt='icon8'
        />
        <input
          type='file'
          id='image-input'
          accept='image/*'
          className='upload'
          onChange={(e) => {
            dispatch(uploadGroupImage(e.target.files[0]))
          }}
        />
        <input
          type='text'
          className='group-title'
          placeholder='Group title'
          value={groupTitle}
          onChange={(e) => {
            dispatch(
              fillInputs({
                title: e.target.value,
                description: groupDescription,
                isEditing: false,
              })
            )
          }}
        />
        <textarea
          placeholder='Description'
          draggable='true'
          className='group-desc'
          value={groupDescription}
          maxLength={30}
          onChange={(e) => {
            dispatch(
              fillInputs({
                description: e.target.value,
                title: groupTitle,
                isEditing: false,
              })
            )
          }}
        ></textarea>
        <p className='count'>{descriptionLength}/30</p>
        <button
          type='button'
          className={loading ? `btn-loading` : ''}
          onClick={() => {
            dispatch(
              createGroupSpace({
                name: groupTitle,
                description: groupDescription,
                image,
              })
            )
          }}
        >
          Create
        </button>
      </div>
      {uploadError && <AlertError message={errorMessage} />}
      {isError && <AlertError message={errorMessage} />}
      {/* {groupCreated && <AlertSuccess message={successMessage} />} */}

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
    /* position: relative */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    margin-top: 2rem;
    padding-bottom: 7rem;
  }

  .edit-btn-container {
    position: absolute;
    top: 110px;
    right: 39%;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: grid;
    place-content: center;
    /* color: black; */
    background: var(--login-secondary);
    color: var(--white-col);
    font-size: 1em;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #f5f5f5;
    margin: 1rem;
    border: solid 1.5px #000000;
    object-fit: contain;
  }

  .upload {
    margin-left: 5rem;
  }

  input {
    background: none;
    color: var(--white-col);
  }

  .group-title {
    width: 80%;
    height: 50px;
    padding: 1rem;
    outline: none;
    font-size: 1em;
    margin-top: 1.5rem;
    border: solid 1px var(--login-secondary);
    border-radius: 5px;
  }

  .group-desc {
    margin-top: 0.5rem;
    min-width: 80%;
    max-width: 80%;
    min-height: 40px;
    outline: none;
    font-size: 1.2em;
    padding: 1rem;
    background: none;
    color: var(--white-col);
    border: solid 1px var(--login-secondary);
    border-radius: 5px;
  }

  .count {
    width: 80%;
    text-align: end;
    margin: 0.5rem;
    opacity: 0.8;
    font-size: 0.8em;
  }

  button {
    margin-top: 1rem;
    height: 45px;
    width: 50%;
    border: none;
    background: var(--login-secondary);
    color: var(--white-col);
    font-size: 0.7em;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }

  .btn-loading {
    opacity: 0.75;
  }

  @media only screen and (min-width: 768px) {
    .header {
      padding: 0rem 3rem 0rem 10rem;
    }

    .group-title {
      width: 50%;
    }

    .group-desc {
      min-width: 50%;
      max-width: 50%;
    }

    .count {
      width: 50%;
    }

    button {
      width: 50%;
    }
  }
`
export default CreateGroup
