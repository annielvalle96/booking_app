import { IoIosCloseCircle } from 'react-icons/io'
import './BookButtonModal.css'
import useFetch from '../../hooks/useFetch.js'
import { useContext, useState } from 'react'
import { SearchContext } from '../../contexts/SearchContext.jsx'
import axiosInstance from '../../useful/axios-instance.js'
import { useNavigate } from 'react-router-dom'

const BookButtonModal = ({ openModal, setOpenModal, hotelId }) => {
  const { data } = useFetch(`/hotel/rooms/${hotelId}`)

  const [selectedRooms, setSelectedRooms] = useState([])

  const { date } = useContext(SearchContext)

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const date = new Date(start.getTime())
    const dates = []
    while (date <= end) {
      dates.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }
    return dates
  }
  const allDates = getDatesInRange(date[0].startDate, date[0].endDate)
  const isAvailable = (rn) => {
    const isFound = rn.unavailableDates.some((date) => allDates.includes(new Date(date).getTime()))
    return !isFound
  }

  const handleSelect = (e) => {
    const checked = e.target.checked
    const value = e.target.value
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value))
  }

  const navigate = useNavigate()
  const handleReserve = async () => {
    try {
      await Promise.all(selectedRooms.map((roomId) => {
        const res = axiosInstance.put(`/room/availability/${roomId}`, { dates: allDates })
        return res.data
      }))
      setOpenModal(false)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return openModal && (
    <div className='reserve'>
      <div className='reserveContainer'>
        <IoIosCloseCircle className='reserveCloseButton' onClick={() => setOpenModal(false)} />
        <span>Select your rooms:</span>
        {data && data.map((d) => (
          <div className='reserveItem' key={d._id}>
            <div className='reserveItemInfo'>
              <div className='reserveTitle'>{d.title}</div>
              <div className='reserveDescription'>{d.description}</div>
              <div className='reserveMax'>Max people: <b>{d.maxPeople}</b></div>
              <div className='reservePrice'>{d.price}</div>
            </div>
            <div className='reserveSelectRooms'>
              {d.roomNumbers && d.roomNumbers.map((rn) => (
                <div className='room' key={rn._id}>
                  <label>{rn.number}</label>
                  <input type='checkbox' value={rn._id} onChange={handleSelect} disabled={!isAvailable(rn)} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className='reserveButton' onClick={handleReserve}>Reserve Now!</button>
      </div>
    </div>
  )
}

export default BookButtonModal
