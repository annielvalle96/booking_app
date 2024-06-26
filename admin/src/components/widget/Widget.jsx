import './widget.scss'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'

const Widget = ({ type }) => {
  let data

  switch (type) {
    case 'user':
      data = {
        title: 'USERS',
        isMoney: false,
        link: 'See all users',
        icon: <PersonOutlineOutlinedIcon className='icon' style={{ color: 'crimson', background: 'rgba(255, 0, 0, 0.2)' }} />
      }
      break
    case 'order':
      data = {
        title: 'ORDERS',
        isMoney: false,
        link: 'See all orders',
        icon: <ShoppingCartOutlinedIcon className='icon' style={{ color: 'goldenrod', background: 'rgba(218, 165, 32, 0.2)' }} />
      }
      break
    case 'earning':
      data = {
        title: 'EARNINGS',
        isMoney: true,
        link: 'See net earnings',
        icon: <MonetizationOnOutlinedIcon className='icon' style={{ color: 'green', background: 'rgba(0, 128, 0, 0.2)' }} />
      }
      break
    case 'balance':
      data = {
        title: 'BALANCES',
        isMoney: true,
        link: 'See all details',
        icon: <AccountBalanceWalletOutlinedIcon className='icon' style={{ color: 'purple', background: 'rgba(128, 0, 128, 0.2)' }} />
      }
      break
    default:
      break
  }

  // Temporary.
  const amount = 100
  const diff = 20

  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{data.title}</span>
        <span className='counter'>{data.isMoney && '$'}{amount}</span>
        <span className='link'>{data.link}</span>
      </div>
      <div className='right'>
        <div className='percentage positive'><KeyboardArrowUpOutlinedIcon />{diff} %</div>
        {data.icon}
      </div>
    </div>
  )
}

export default Widget
