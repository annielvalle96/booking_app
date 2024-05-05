import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import './newRoom.scss'
import { roomInputs } from '../../formSource.jsx'
import useFetch from '../../hooks/useFetch.js'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../useful/axios-instance.js'

const NewRoom = () => {
  const [info, setInfo] = useState({})
  const [hotelId, setHotelId] = useState(undefined)
  const [errors, setErrors] = useState('')
  const [rooms, setRooms] = useState('')

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const { data, loading } = useFetch('/hotel/get')

  const handleSelect = (e) => {
    setHotelId(e.target.value)
  }

  const handleWrite = (e) => {
    setRooms(e.target.value)
  }

  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault()
    if (!hotelId) {
      setErrors('Please select a Hotel!')
      return
    }
    const roomNumbers = rooms.split(',').map(room => ({ number: room, unavailableDates: [] }))
    console.log('roomNumbers', roomNumbers)
    const newRoom = { ...info, roomNumbers }
    console.log('newRoom', newRoom)
    try {
      const res = await axiosInstance.post(`/room/create/${hotelId}`, newRoom)
      if (res.status === 200) navigate('/room')
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
    <div className='newRoom'>
      <Sidebar />
      <div className='container'>
        <Navbar />
        <div className='top'>
          <h1 className='title'>Add New Room</h1>
        </div>
        <div className='bottom'>
          <div className='right'>
            <form className='form'>
              {roomInputs.map(input => (
                <div className='input' key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <div className='input'>
                <label>Rooms</label>
                <textarea id='roomNumbers' onChange={handleWrite} placeholder='Give comma between room numbers.' />
              </div>
              <div className='input'>
                <label>Choose a Hotel</label>
                <select id='hotelId' onChange={handleSelect} required>
                  <option value='' disabled selected />
                  {
                    loading
                      ? 'Loading...'
                      : data && data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                      ))
                  }
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
              {errors && <span>{errors}</span>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewRoom
