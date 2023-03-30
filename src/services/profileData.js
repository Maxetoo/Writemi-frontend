// ImExit
// AiFillBell
// MdPrivacyTip
import { ImExit } from 'react-icons/im'
import { AiFillBell } from 'react-icons/ai'
import { MdPrivacyTip } from 'react-icons/md'
import { TiUser, TiUserOutline } from 'react-icons/ti'
import { AiFillBug } from 'react-icons/ai'
// AiFillBug
// IoBugSharp

export const profileDate = [
  {
    icon: <TiUser />,
    title: 'Account setting',
    link: 'accountSetting',
  },
  {
    icon: <MdPrivacyTip />,
    title: 'Terms and Conditions',
    link: 'termsAndConditions',
  },
  {
    icon: <AiFillBug />,
    title: 'Report bug',
    link: '',
  },
  {
    icon: <ImExit />,
    title: 'Sign out',
    link: '',
  },
]
