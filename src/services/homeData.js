import {
  AiFillHome,
  AiOutlineHome,
  AiFillMessage,
  AiOutlineMessage,
  AiFillInstagram,
} from 'react-icons/ai'
import { RiMessage3Fill, RiMessage3Line } from 'react-icons/ri'
import { HiUserGroup, HiOutlineUserGroup } from 'react-icons/hi'
import { TiUser, TiUserOutline } from 'react-icons/ti'
import { RiDraftFill, RiDraftLine } from 'react-icons/ri'
import {
  BsBookmarksFill,
  BsBookmarks,
  BsChatRightTextFill,
  BsChatRightText,
  BsFacebook,
} from 'react-icons/bs'
import { FaShare } from 'react-icons/fa'
import { RiWhatsappFill } from 'react-icons/ri'
import { IoCopyOutline, IoMdNotifications } from 'react-icons/io'
import { MdOutlinePeople } from 'react-icons/md'
// MdOutlinePeople
export const navData = [
  {
    id: 0,
    title: 'Home',
    icon: <AiOutlineHome />,
    activeIcon: <AiFillHome />,
    link: '/home',
  },
  {
    id: 1,
    title: 'Messages',
    icon: <RiMessage3Line />,
    activeIcon: <RiMessage3Fill />,
    link: '/messages',
  },
  {
    id: 2,
    title: 'Groups',
    icon: <HiOutlineUserGroup />,
    activeIcon: <HiUserGroup />,
    link: '/groups',
  },
  {
    id: 3,
    title: 'Profile',
    icon: <TiUserOutline />,
    activeIcon: <TiUser />,
    link: '/profile',
  },
]

export const homeData = [
  {
    id: 0,
    title: 'Personal messages',
    icon: <AiOutlineMessage />,
    activeIcon: <AiFillMessage />,
    link: '/messages',
  },
  {
    id: 1,
    title: 'Group messages',
    icon: <MdOutlinePeople />,
    activeIcon: <BsChatRightTextFill />,
    link: '/groups',
  },
  {
    id: 2,
    title: 'Bookmarked messages',
    icon: <BsBookmarks />,
    activeIcon: <BsBookmarksFill />,
    link: '/bookmarks',
  },
  {
    id: 3,
    title: 'Drafts',
    icon: <RiDraftLine />,
    activeIcon: <RiDraftFill />,
    link: '/drafts',
  },
]

// IoMdNotifications
export const socials = [
  <FaShare />,
  <RiWhatsappFill />,
  <BsFacebook />,
  <AiFillInstagram />,
]
