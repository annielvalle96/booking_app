import './HotelImagesModal.css'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import { IoIosCloseCircle } from 'react-icons/io'

const HotelImagesModal = ({ slideNumber, setSliderNumber, photos, openModal, setOpenModal }) => {
  const handleMove = (direction) => {
    let newSliderNumber
    if (direction === 'left') newSliderNumber = slideNumber === 0 ? photos.length - 1 : slideNumber - 1
    if (direction === 'right') newSliderNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1
    setSliderNumber(newSliderNumber)
  }

  return openModal && (
    <div className='slider'>
      <IoIosCloseCircle className='sliderCloseButton' onClick={() => setOpenModal(false)} />
      <FaArrowCircleLeft className='sliderArrowButton' onClick={() => handleMove('left')} />
      <div className='sliderWrapper'>
        <img className='sliderImage' src={photos[slideNumber]} alt='' />
      </div>
      <FaArrowCircleRight className='sliderArrowButton' onClick={() => handleMove('right')} />
    </div>
  )
}

export default HotelImagesModal
