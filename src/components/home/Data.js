// AiFillMessage
// AiOutlineMessage
// FaUsers
// MdQuestionAnswer
import { AiFillMessage } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import { MdQuestionAnswer } from 'react-icons/md'
import { AiFillPhone, AiFillInstagram } from 'react-icons/ai'
import { RiWhatsappFill } from 'react-icons/ri'
import { BsFillShareFill } from 'react-icons/bs'
import { MdOutlineCopyright, MdEmail, MdShare } from 'react-icons/md'
export const HomePageData = [
  {
    id: 0,
    link: 'personalMessages',
    icon: <AiFillMessage />,
    text: 'View Messages',
    bg: '#ffffff',
    color: '#000000',
  },
  {
    id: 1,
    link: 'groupMessages',
    icon: <FaUsers />,
    text: 'View Spaces',
    bg: '#000000',
    color: '#ffffff',
  },
  {
    id: 2,
    link: 'questionAndAnswers',
    icon: <MdQuestionAnswer />,
    text: 'Q/A',
    bg: '#ffffff',
    color: '#000000',
  },
  {
    id: 3,
    link: '',
    icon: <MdShare />,
    text: 'Share Profile',
    bg: '#000000',
    color: '#ffffff',
  },
]

export const Socials = [
  {
    id: 0,
  },
]
