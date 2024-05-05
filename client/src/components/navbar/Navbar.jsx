import { Link } from 'react-router-dom'
import './navbar.css'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { useState } from 'react'

const Navbar = () => {
  const { logout, isUserAuthenticated } = useAuth()

  const [local] = useState(JSON.parse(window.localStorage.getItem('booking_app_user')))

  return (
    <div className='navbar'>
      <div className='navContainer'>
        <Link className='logo' to='/'><span>Booking</span></Link>
        {
        isUserAuthenticated
          ? (
            <div className='navItems'>
              <span>{local.username}</span>
              <button className='navButton' onClick={logout}>Logout</button>
            </div>
            )
          : (
            <div className='navItems'>
              <button className='navButton'><Link className='link' to='/register'>Register</Link></button>
              <button className='navButton'><Link className='link' to='/login'>Login</Link></button>
            </div>
            )
        }
      </div>
    </div>
  )
}

export default Navbar
