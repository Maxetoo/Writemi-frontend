import React from 'react'
import styled from 'styled-components'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'

const Terms = () => {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <div className='header'>
        <div
          className='header-icon back-btn'
          onClick={() => navigate('/signup')}
        >
          <MdOutlineArrowBackIosNew />
        </div>
        <h3 className='header-title'>T&C</h3>
        <div className='header-icon menu'></div>
      </div>
      <div className='message-container'>
        <h3 className='main-header'>Welcome to writeme</h3>
        <p className='msg'>
          By using our app, you agree to be bound by these terms and conditions
          (the "T&C"). If you do not agree to these T&C, please do not use our
          app.
        </p>
        <ol>
          <li>
            Scope of T&C. These T&C apply to your use of the writeme app,
            including any updates or enhancements to the app, as well as any
            other related services or features provided by writeme.
          </li>
          <li>
            Use of the app. You may only use the app for lawful purposes. You
            may not use the app to send or receive messages that are harassing,
            threatening, obscene, or otherwise inappropriate. You are solely
            responsible for the content of any messages you send or receive
            using the app.
          </li>
          <li>
            Privacy. We respect your privacy and will not collect or share your
            personal information with third parties, except as required by law.
            However, please be aware that the anonymity of the app means that we
            cannot control the content of the messages you send or receive, and
            we are not responsible for any damages or liabilities resulting from
            the content of these messages.
          </li>
          <li>
            Disclaimer of warranties. The app is provided on an "as is" and "as
            available" basis. We do not warrant that the app will be free from
            errors or disruptions. We also do not warrant that the app will
            always be accessible or available, and we reserve the right to
            suspend or discontinue the app at any time without notice.
          </li>
          <li>
            Intellectual property. The app and all content and materials
            included on it, including but not limited to text, graphics, logos,
            images, and software, are the property of writemi or its licensors
            and are protected by copyright and trademark laws. You may not use
            any content or materials on the app for any commercial purpose
            without the express written consent of writemi.
          </li>
          <li>
            Indemnification. You agree to indemnify and hold writemi and its
            affiliates, officers, agents, and employees harmless from any claim
            or demand, including reasonable attorneys' fees, made by any third
            party due to or arising out of your use of the app, your violation
            of these T&C, or your violation of any rights of another.
          </li>
          <li>
            Changes to T&C. We may modify these T&C at any time. If we make
            changes, we will post the revised T&C on this page and update the
            "effective date" at the top of the page. By continuing to use the
            app after these changes, you agree to be bound by the revised T&C.
          </li>
          <li>
            Cookies. Writeme collects cookies to deliver better user experience.
            With the help of cookies, We are able to keep you logged in.
          </li>
        </ol>
        <h3>Thank you for using writemi!</h3>
      </div>
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
    height: 50px;
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
    font-size: 0.95em;
  }

  .message-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: start;
    width: 100%;
    height: auto;
    padding: 2rem;
    padding-bottom: 7rem;
  }

  .main-header {
    font-size: 1.2em;
    margin-bottom: 1rem;
    text-decoration: underline;
  }

  h3 {
    width: 100%;
  }

  .msg {
    width: 100%;
    margin: 1rem;
    opacity: 0.8;
  }

  ol {
    margin: 0.5rem;
  }

  li {
    margin-bottom: 1.5rem;
    opacity: 0.8;
  }

  /* @media only screen and (min-width: 768px) {
    .header {
      padding: 0rem 3rem 0rem 10rem;
    }

    .message-container {
      padding: 2rem 2rem 0rem 10rem;
    }
  } */
`

export default Terms
