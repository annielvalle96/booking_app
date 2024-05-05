import { useContext, useState } from 'react'
import Footer from '../../components/footer/Footer.jsx'
import Header from '../../components/header/Header.jsx'
import MailList from '../../components/mailList/MailList.jsx'
import Navbar from '../../components/navbar/Navbar.jsx'
import './Hotel.css'
import { FaLocationDot } from 'react-icons/fa6'
import HotelImagesModal from '../../components/modal/HotelImagesModal.jsx'
import BookButtonModal from '../../components/modal/BookButtonModal.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch.js'
import { SearchContext } from '../../contexts/SearchContext.jsx'
import { useAuth } from '../../contexts/AuthContext.jsx'

const Hotel = () => {
  const [slideNumber, setSliderNumber] = useState(0)

  const [openHotelImagesModal, setOpenHotelImagesModal] = useState(false)

  const HandleOpenModalHotelImages = (index) => {
    setSliderNumber(index)
    setOpenHotelImagesModal(true)
  }

  const [openBookButtonModal, setOpenBookButtonModal] = useState(false)

  const { isUserAuthenticated } = useAuth()

  const navigate = useNavigate()

  const HandleOpenBookButtonModal = () => {
    isUserAuthenticated ? setOpenBookButtonModal(true) : navigate('/login')
  }

  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const { data, loading } = useFetch(`/hotel/get/${id}`)

  const { date, options } = useContext(SearchContext)
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays
  }
  const days = dayDifference(date[0].endDate, date[0].startDate)

  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className='hotelContainer'>
        <HotelImagesModal slideNumber={slideNumber} setSliderNumber={setSliderNumber} photos={data.photos} openModal={openHotelImagesModal} setOpenModal={setOpenHotelImagesModal} />
        <div className='hotelWrapper'>
          <button className='bookNow' onClick={() => HandleOpenBookButtonModal()}>Reserve or Book Now!</button>
          <h1 className='hotelTitle'>{data.name}</h1>
          <div className='hotelAddress'>
            <FaLocationDot />
            <span>{data.address}</span>
          </div>
          <span className='hotelDistance'>Excellent location - {data.distance}m from center</span>
          <span className='hotelPriceHighlight'>Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi</span>
          <div className='hotelImages'>
            {
              loading
                ? ('Loading...')
                : (
                  <>{data.photos?.map((photo, index) => (
                    <div className='hotelImageWrapper' key={index}>
                      <img onClick={() => HandleOpenModalHotelImages(index)} className='hotelImage' src={photo} alt='' />
                    </div>))}
                  </>
                  )
            }
          </div>
          <div className='hotelDetails'>
            <div className='hotelDetailsTexts'>
              <h1 className='hotelTitle'>{data.title}</h1>
              <p className='hotelDescription'>{data.description}</p>
            </div>
            <div className='hotelDetailsPrice'>
              <h1>Perfect for a {days}-night stay!</h1>
              <span>Located in the real heart of Krakow, this property has an excellent location score of 9.8!</span>
              <h2><b>${days * data.cheapestPrice * options.room}</b> ({days} nights)</h2>
              <button onClick={() => HandleOpenBookButtonModal()}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      <BookButtonModal openModal={openBookButtonModal} setOpenModal={setOpenBookButtonModal} hotelId={id} />
    </div>
  )
}

export default Hotel
