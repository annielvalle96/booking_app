import useFetch from '../../hooks/useFetch'
import './featuredProperties.css'

const FeaturedProperties = () => {
  const { data, loading } = useFetch('/hotel/get?featured=true&limit=5&min=1&max=1000')

  const photos = [
    'https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=35b70a7e8a17a71896996cd55d84f742cd15724c3aebaed0d9b5ba19c53c430b&o=',
    'https://cf.bstatic.com/xdata/images/hotel/square600/121402222.webp?k=f7f266ab09f90ddea4464309eca14d79429afe4218ced6887cb52f82c42c03dc&o=',
    'https://cf.bstatic.com/xdata/images/hotel/square600/87428762.webp?k=de5db8fe94cbfe08d3bf16d3c86def035fd73b43ee497cffe27b03363764e0e2&o=',
    'https://cf.bstatic.com/xdata/images/hotel/square600/73220198.webp?k=62588a8129bafa49162b4cdfd8af8f8018c42b8628090650a1cb9e4d4041c467&o=',
    'https://cf.bstatic.com/xdata/images/hotel/square600/85257658.webp?k=e3f110e4ed0978310a028465a3bdd609149ecbded601555c881106255556b52e&o='
  ]

  return (
    <div className='FeaturedProperties'>
      {
        loading
          ? ('Loading...')
          : (
            <>{data && data.length > 0 && data.map((item, index) => (
              <div className='FeaturedPropertiesItem' key={index}>
                <img className='FeaturedPropertiesImg' src={photos[index]} alt='' />
                <span className='FeaturedPropertiesName'>{item.name}</span>
                <span className='FeaturedPropertiesCity'>{item.city}</span>
                <span className='FeaturedPropertiesPrice'>Starting from ${item.cheapestPrice}</span>
                {item.rating &&
                  <div className='FeaturedPropertiesRating'>
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                  </div>}
              </div>))}
            </>
            )
      }

    </div>
  )
}

export default FeaturedProperties
