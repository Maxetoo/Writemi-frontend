// ImExit
// AiFillBell
// MdPrivacyTip
import { ImExit } from 'react-icons/im'
import { AiFillBell } from 'react-icons/ai'
import { MdPrivacyTip } from 'react-icons/md'
import { TiUser, TiUserOutline } from 'react-icons/ti'

export const profileDate = [
  {
    icon: <TiUser />,
    title: 'Account setting',
    link: 'accountSetting',
  },
  {
    icon: <AiFillBell />,
    title: 'Notification',
    link: 'notificationSetting',
  },
  {
    icon: <MdPrivacyTip />,
    title: 'Privacy policy',
    link: 'privacyPolicy',
  },
  {
    icon: <ImExit />,
    title: 'Sign out',
    link: 'signout',
  },
]
