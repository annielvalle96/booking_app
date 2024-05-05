import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import './Register.css'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { register, errors, isUserAuthenticated } = useAuth()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')

  const navigate = useNavigate()

  const handleChange = (e) => {
    const value = e.target.id
    if (value === 'username') {
      setUsername(e.target.value)
    } else if (value === 'email') {
      setEmail(e.target.value)
    } else if (value === 'password') {
      setPassword(e.target.value)
    } else if (value === 'country') {
      setCountry(e.target.value)
    } else if (value === 'city') {
      setCity(e.target.value)
    } else if (value === 'phone') {
      setPhone(e.target.value)
    }
  }

  const handleRegister = () => {
    register({ username, email, password, country, city, phone })
  }

  useEffect(() => {
    if (isUserAuthenticated) navigate('/')
  }, [isUserAuthenticated])

  return (
    <div className='register'>
      <div className='registerContainer'>
        <input type='text' placeholder='username' id='username' onChange={handleChange} className='registerInput' />
        <input type='email' placeholder='email' id='email' onChange={handleChange} className='registerInput' />
        <input type='password' placeholder='password' id='password' onChange={handleChange} className='registerInput' />
        <input type='text' placeholder='country' id='country' onChange={handleChange} className='registerInput' />
        <input type='text' placeholder='city' id='city' onChange={handleChange} className='registerInput' />
        <input type='text' placeholder='phone' id='phone' onChange={handleChange} className='registerInput' />
        {/* <button disabled={loading} onClick={handleRegister} className='registerButton'>Register</button> */}
        <button onClick={handleRegister} className='registerButton'>Register</button>
        {errors && <span>{errors}</span>}
      </div>
    </div>
  )
}

export default Register
