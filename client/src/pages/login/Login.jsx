import { useEffect, useState } from 'react'
import './Login.css'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login, errors, isUserAuthenticated } = useAuth()

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleLogin = () => {
    login(credentials)
  }

  useEffect(() => {
    if (isUserAuthenticated) navigate('/')
  }, [isUserAuthenticated])

  return (
    <div className='login'>
      <div className='loginContainer'>
        <input type='text' placeholder='username' id='username' onChange={handleChange} className='loginInput' />
        <input type='password' placeholder='password' id='password' onChange={handleChange} className='loginInput' />
        <button onClick={handleLogin} className='loginButton'>Login</button>
        {errors && <span>{errors}</span>}
      </div>
    </div>
  )
}

export default Login
