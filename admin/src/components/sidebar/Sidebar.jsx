import './sidebar.scss'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import CreditCardIcon from '@mui/icons-material/CreditCard'
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
// import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined'
// import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
// import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined'
// import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined'
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { DarkModeContext } from '../../contexts/darkModeContext.jsx'
import { useAuth } from '../../contexts/AuthContext.jsx'

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext)

  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className='sidebar'>
      <div className='top'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className='logo'>Booking Admin App</span>
        </Link>
      </div>
      <div className='center'>
        <ul>
          <p className='title'>MAIN</p>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <li>
              <DashboardOutlinedIcon className='icon' />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className='title'>LIST</p>
          <Link to='/user' style={{ textDecoration: 'none' }}>
            <li>
              <PersonOutlineOutlinedIcon className='icon' />
              <span>Users</span>
            </li>
          </Link>
          <Link to='/hotel' style={{ textDecoration: 'none' }}>
            <li>
              <StoreMallDirectoryOutlinedIcon className='icon' />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to='/room' style={{ textDecoration: 'none' }}>
            <li>
              <CreditCardIcon className='icon' />
              <span>Rooms</span>
            </li>
          </Link>
          {/* <p className='title'>USEFUL</p>
          <li>
            <InsertChartOutlinedIcon className='icon' />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneOutlinedIcon className='icon' />
            <span>Notifications</span>
          </li>
          <p className='title'>SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className='icon' />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className='icon' />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsOutlinedIcon className='icon' />
            <span>Settings</span>
          </li> */}
          <p className='title'>USER</p>
          {/* <li>
            <AccountCircleOutlinedIcon className='icon' />
            <span>Profile</span>
          </li> */}
          <li>
            <ExitToAppIcon className='icon' />
            <span onClick={handleLogout}>Logout</span>
          </li>
        </ul>
      </div>
      <div className='bottom'>
        <div className='colorOption' onClick={() => dispatch({ type: 'LIGHT' })} />
        <div className='colorOption' onClick={() => dispatch({ type: 'DARK' })} />
      </div>
    </div>
  )
}

export default Sidebar
