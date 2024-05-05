import { useLocation } from 'react-router-dom'
import Header from '../../components/header/Header.jsx'
import Navbar from '../../components/navbar/Navbar.jsx'
import './list.css'
import { useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem.jsx'
import useFetch from '../../hooks/useFetch.js'

const List = () => {
  const location = useLocation()
  const [destination, setDestination] = useState(location.state.destination)
  const [date, setDate] = useState(location.state.date)
  const [options] = useState(location.state.options)

  const [openDate, setOpenDate] = useState(false)

  const toggleDatesOptions = (component) => {
    if (component === 'Dates') {
      setOpenDate(!openDate)
      // setOpenOptions(false)
    } else if (component === 'Options') {
      setOpenDate(false)
      // setOpenOptions(!openOptions)
    }
  }

  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const { data, loading, reFetchData } = useFetch(`/hotel/getHotelsByCity?city=${destination}&min=${min || 0}&max=${max || 1000}`)

  const handleClick = () => {
    reFetchData()
  }

  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='listTitle'>Search</h1>
            <div className='listItem'>
              <label>Destination</label>
              <input type='text' placeholder={destination} onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className='listItem'>
              <label>Check-in Date</label>
              <span onClick={() => toggleDatesOptions('Dates')}>{`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span>
              {openDate && <DateRange onChange={item => setDate([item.selection])} minDate={new Date()} ranges={date} />}
            </div>
            <div className='listItem'>
              <label>Options</label>
              <div className='listOptions'>
                <div className='listOptionItem'>
                  <span className='listOptionText'>Min price <small>per night</small></span>
                  <input type='number' min={0} className='listOptionInput' onChange={(e) => setMin(e.target.value)} />
                </div>
                <div className='listOptionItem'>
                  <span className='listOptionText'>Max price <small>per night</small></span>
                  <input type='number' min={0} className='listOptionInput' onChange={(e) => setMax(e.target.value)} />
                </div>
                <div className='listOptionItem'>
                  <span className='listOptionText'>Adult</span>
                  <input type='number' min={1} className='listOptionInput' placeholder={options.adult} />
                </div>
                <div className='listOptionItem'>
                  <span className='listOptionText'>Children</span>
                  <input type='number' min={0} className='listOptionInput' placeholder={options.children} />
                </div>
                <div className='listOptionItem'>
                  <span className='listOptionText'>Room</span>
                  <input type='number' min={1} className='listOptionInput' placeholder={options.room} />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className='listResult'>
            {
              loading
                ? ('Loading...')
                : (<>{data.map((item, index) => (<SearchItem item={item} key={index} />))}</>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default List
