import { Link } from 'react-router-dom'
import './searchItem.css'

const SearchItem = ({ item }) => {
  return (
    <div className='searchItem'>
      <img className='searchItemImage' src={item.photos[0]} alt='' />
      <div className='searchItemDescription'>
        <h1 className='searchItemTitle'>{item.name}</h1>
        <span className='searchItemDistance'>{item.distance}m from center</span>
        <span className='searchItemTaxiOption'>Free airport taxi</span>
        <span className='searchItemSubtitle'>Studio Apartment with Air conditioning</span>
        {/* <span className='searchItemFeatures'>{item.description}</span> */}
        <span className='searchItemCancelOption'>Free cancellation </span>
        <span className='searchItemCancelOptionSubtitle'>You can cancel later, so lock in this great price today!</span>
      </div>
      <div className='searchItemDetails'>
        {
        item.rating &&
          <div className='searchItemRating'>
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        }
        <div className='searchItemTexts'>
          <span className='c'>${item.cheapestPrice}</span>
          <span className='searchItemTaxesOption'>Include taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className='searchItemCheckButton'>See availability</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
