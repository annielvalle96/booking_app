import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import './newHotel.scss'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import { hotelInputs } from '../../formSource.jsx'
import useFetch from '../../hooks/useFetch.js'
import axiosInstance from '../../useful/axios-instance.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NewHotel = () => {
  const [files, setFiles] = useState('')
  const [info, setInfo] = useState({})
  const [rooms, setRooms] = useState([])
  const [errors, setErrors] = useState('')

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const { data, loading } = useFetch('/room/get')

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value)
    setRooms(value)
  }

  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const list = await Promise.all(Object.values(files).map(async (file) => {
        const data = new FormData()
        const img = file || 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
        data.append('file', img)
        data.append('upload_preset', 'upload')
        const uploadResponse = await axios.post('https://api.cloudinary.com/v1_1/annielvallevalera/image/upload', data)
        const { url } = uploadResponse.data
        return url
      }))

      const newHotel = { ...info, rooms, photos: list }
      const res = await axiosInstance.post('/hotel/create', newHotel)
      if (res.status === 200) navigate('/hotel')
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
    <div className='newHotel'>
      <Sidebar />
      <div className='container'>
        <Navbar />
        <div className='top'>
          <h1 className='title'>Add New Hotel</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img className='image' src={files ? URL.createObjectURL(files[0]) : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} alt='' />
          </div>
          <div className='right'>
            <form className='form'>
              <div className='input'>
                <label htmlFor='file'>Image: <DriveFolderUploadOutlinedIcon className='icon' /></label>
                <input type='file' id='file' multiple onChange={(e) => setFiles(e.target.files)} style={{ display: 'none' }} />
              </div>
              {hotelInputs.map(input => (
                <div className='input' key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <div className='input'>
                <label>Featured</label>
                <select id='featured' onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value>Yes</option>
                </select>
              </div>
              <div className='input'>
                <label>Type</label>
                <select id='type' onChange={handleChange}>
                  <option value='' />
                  <option value='hotel'>Hotel</option>
                  <option value='apartment'>Apartment</option>
                  <option value='resort'>Resort</option>
                  <option value='villa'>Villa</option>
                  <option value='cabin'>Cabin</option>
                </select>
              </div>
              <div className='selectRooms'>
                <label>Rooms</label>
                <select id='rooms' multiple onChange={handleSelect}>
                  {
                    loading
                      ? 'Loading...'
                      : data && data.map((room) => (
                        <option key={room._id} value={room._id}>{room.title}</option>
                      ))
                  }
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
            {errors && <span>{errors}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewHotel
