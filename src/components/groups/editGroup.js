import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from '../home'
import { BsPencilSquare } from 'react-icons/bs'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import { Loader, AlertError, AlertSuccess } from '../../config'
import {
  getSingleGroup,
  fillInputs,
  uploadGroupImage,
  editGroup,
  killEditAlert,
} from '../../slices/groupMsgSlice'

const EditGroup = () => {
  const {
    getSingleGroupLoad,
    getSingleGroupEntry,
    deleteSuccess,
    deleteLoading,
    groupTitle,
    isEditing,
    isError,
    groupDescription,
    descriptionLength,
    uploadSuccess,
    image: latestImage,
    editLoading,
    editSuccess,
    errorMessage,
    successMessage,
  } = useSelector((store) => store.groups)
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const { name, _id, createdAt, image, description } = getSingleGroupEntry

  useEffect(() => {
    dispatch(getSingleGroup(id))
  }, [])

  useEffect(() => {
    if (isError || editSuccess) {
      const timer = setTimeout(() => {
        dispatch(killEditAlert())
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isError, editSuccess])

  return (
    <Wrapper>
      <div className='header'>
        <div
          className='header-icon back-btn'
          onClick={() => navigate('/groups')}
        >
          <MdOutlineArrowBackIosNew />
        </div>
        <h3 className='header-title'>Edit Group</h3>
        <div className='header-icon menu'></div>
      </div>
      <div className='edit-container'>
        {getSingleGroupLoad ? (
          <Loader />
        ) : (
          <>
            <img src={uploadSuccess ? latestImage : image} alt='icon8' />
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
              value={isEditing ? groupTitle : name}
              onChange={(e) => {
                dispatch(
                  fillInputs({
                    title: e.target.value,
                    description,
                    isEditing: true,
                  })
                )
              }}
            />
            <textarea
              placeholder='Description'
              draggable='true'
              className='group-desc'
              value={isEditing ? groupDescription : description}
              maxLength={30}
              onChange={(e) => {
                dispatch(
                  fillInputs({
                    description: e.target.value,
                    title: name,
                    isEditing: true,
                  })
                )
              }}
            ></textarea>
            <p className='count'>
              {/* {isEditing && !getSingleGroupLoad
              ? descriptionLength
              : description.length} */}
              {/* {!getSingleGroupLoad ? isEditing ? description.length : descriptionLength} */}
              /30
            </p>
            <button
              type='button'
              className={editLoading ? `btn-loading` : ''}
              onClick={() => {
                dispatch(
                  editGroup({
                    name: `${isEditing ? groupTitle : name}`,
                    description: `${
                      isEditing ? groupDescription : description
                    }`,
                    image: latestImage,
                    _id,
                  })
                )
              }}
            >
              Edit
            </button>
          </>
        )}
      </div>
      {/* {uploadError && <AlertError message={errorMessage} />} */}
      {isError && <AlertError message={errorMessage} />}
      {editSuccess && <AlertSuccess message={successMessage} />}
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

  .edit-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    margin-top: 2rem;
    padding-bottom: 7rem;
  }

  /* .edit-btn-container {
    position: absolute;
    top: 110px;
    right: 39%;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: grid;
    place-content: center;
    background: var(--login-secondary);
    color: var(--white-col);
    font-size: 1em;
  } */

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
    margin-top: 0.5rem;
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
`
export default EditGroup
