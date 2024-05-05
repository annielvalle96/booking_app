import './header.css'
import { FaBed, FaCarSide } from 'react-icons/fa'
import { IoAirplaneSharp } from 'react-icons/io5'
import { MdOutlineAttractions } from 'react-icons/md'
import { BsFillTaxiFrontFill, BsFillPersonFill } from 'react-icons/bs'
import { BiSolidCalendar } from 'react-icons/bi'
import { useContext, useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format } from 'date-fns'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../contexts/SearchContext.jsx'

const Header = ({ type }) => {
  const [openDate, setOpenDate] = useState(false)
  const [date, setDate] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }])

  const [openOptions, setOpenOptions] = useState(false)
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 })

  const [destination, setDestination] = useState('')

  const handleOption = (name, operation) => {
    setOptions((prev) => { return { ...prev, [name]: operation === 'increase' ? options[name] + 1 : options[name] - 1 } })
  }

  const toggleDatesOptions = (component) => {
    if (component === 'Dates') {
      setOpenDate(!openDate)
      setOpenOptions(false)
    } else if (component === 'Options') {
      setOpenDate(false)
      setOpenOptions(!openOptions)
    }
  }

  const navigate = useNavigate()
  const { dispatch } = useContext(SearchContext)

  const HandleSearch = () => {
    dispatch({ type: 'NEW_SEARCH', payload: { destination, date, options } })
    // Address to '/hotels' page and also pass the state.
    navigate('/hotels', { state: { destination, date, options } })
  }

  return (
    <div className='header'>
      <div className={type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>
        <div className='headerList'>
          <div className='headerListItem active'>
            <FaBed /><span>Stays</span>
          </div>
          <div className='headerListItem'>
            <IoAirplaneSharp /><span>Flights</span>
          </div>
          <div className='headerListItem'>
            <FaCarSide /><span>Car rentals</span>
          </div>
          <div className='headerListItem'>
            <MdOutlineAttractions /><span>Attractions</span>
          </div>
          <div className='headerListItem'>
            <BsFillTaxiFrontFill /><span>Airport taxis</span>
          </div>
        </div>
        {
          type !== 'list' &&
            <>
              <h1 className='headerTitle'>A lifetime of discounts? It's Genius.</h1>
              <p className='headerDescription'>Get rewarded for your travels - unlock instant saving of 10% or more with a free Booking account</p>
              <button className='headerButton'>Sign in / Register</button>
              <div className='headerSearch'>
                <div className='headerSearchItem'>
                  <FaBed className='headerIcon' />
                  <input className='headerSearchInput' type='text' placeholder='Where are you going?' onChange={(e) => setDestination(e.target.value)} />
                </div>
                <div className='headerSearchItem'>
                  <BiSolidCalendar className='headerIcon' />
                  <span onClick={() => toggleDatesOptions('Dates')} className='headerSearchText'>{`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span>
                  {
                    openDate &&
                      <DateRange
                        className='headerSearchDate'
                        editableDateInputs
                        onChange={item => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        minDate={new Date()}
                      />
                  }
                </div>
                <div className='headerSearchItem'>
                  <BsFillPersonFill className='headerIcon' />
                  <span onClick={() => toggleDatesOptions('Options')} className='headerSearchText'>{`${options.adult} adults • ${options.children} children • ${options.room} rooms`}</span>
                  {
                    openOptions &&
                      <div className='headerOptions'>
                        <div className='headerOptionItem'>
                          <span className='headerOptionText'>Adult</span>
                          <div className='headerOptionCounter'>
                            <button disabled={options.adult <= 1} className='headerOptionCounterButton' onClick={() => handleOption('adult', 'decrease')}><FaMinus /></button>
                            <span className='headerOptionCounterNumber'>{options.adult}</span>
                            <button className='headerOptionCounterButton' onClick={() => handleOption('adult', 'increase')}><FaPlus /></button>
                          </div>
                        </div>
                        <div className='headerOptionItem'>
                          <span className='headerOptionText'>Children</span>
                          <div className='headerOptionCounter'>
                            <button disabled={options.children <= 0} className='headerOptionCounterButton' onClick={() => handleOption('children', 'decrease')}><FaMinus /></button>
                            <span className='headerOptionCounterNumber'>{options.children}</span>
                            <button className='headerOptionCounterButton' onClick={() => handleOption('children', 'increase')}><FaPlus /></button>
                          </div>
                        </div>
                        <div className='headerOptionItem'>
                          <span className='headerOptionText'>Room</span>
                          <div className='headerOptionCounter'>
                            <button disabled={options.room <= 1} className='headerOptionCounterButton' onClick={() => handleOption('room', 'decrease')}><FaMinus /></button>
                            <span className='headerOptionCounterNumber'>{options.room}</span>
                            <button className='headerOptionCounterButton' onClick={() => handleOption('room', 'increase')}><FaPlus /></button>
                          </div>
                        </div>
                      </div>
                  }
                </div>
                <div className='headerSearchItem'>
                  <button className='headerButton' onClick={HandleSearch}>Search</button>
                </div>
              </div>
            </>
        }
      </div>
    </div>
  )
}

export default Header
