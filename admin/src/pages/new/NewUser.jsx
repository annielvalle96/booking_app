import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import './newUser.scss'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import axios from 'axios'
import axiosInstance from '../../useful/axios-instance.js'
import { useNavigate } from 'react-router-dom'
import { userInputs } from '../../formSource.jsx'

const NewUser = () => {
  const [file, setFile] = useState('')
  const [info, setInfo] = useState({})
  const [errors, setErrors] = useState('')

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setInfo((prev) => ({ ...prev, [e.target.id]: value }))
  }

  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault()
    const data = new FormData()
    const img = file || 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
    data.append('file', img)
    data.append('upload_preset', 'upload')
    try {
      const uploadResponse = await axios.post('https://api.cloudinary.com/v1_1/annielvallevalera/image/upload', data)
      const { url } = uploadResponse.data
      const newUser = { ...info, image: url }
      const res = await axiosInstance.post('/user/create', newUser)
      if (res.status === 200) navigate('/user')
    } catch (error) {
      const errorMessage = error.response?.data?.message
      setErrors(errorMessage)
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors('')
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  return (
    <div className='newUser'>
      <Sidebar />
      <div className='container'>
        <Navbar />
        <div className='top'>
          <h1 className='title'>Add New User</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img className='image' src={file ? URL.createObjectURL(file) : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} alt='' />
          </div>
          <div className='right'>
            <form className='form'>
              <div className='input'>
                <label htmlFor='file'>Image: <DriveFolderUploadOutlinedIcon className='icon' /></label>
                <input type='file' id='file' onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} />
              </div>
              {userInputs.map(input => (
                <div className='input' key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
            {errors && <span>{errors}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewUser
