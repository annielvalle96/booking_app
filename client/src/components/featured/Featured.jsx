import useFetch from '../../hooks/useFetch.js'
import './featured.css'

const Featured = () => {
  const { data, loading } = useFetch('/hotel/CitiesAndCountHotels')

  const photos = [
    'https://cf.bstatic.com/xdata/images/city/600x600/690410.jpg?k=65d60a6bcc5be784f80b7db8682a0a14a81b7918c7684429f0db5a20bfcdfc9d&o=',
    'https://cf.bstatic.com/xdata/images/city/600x600/976730.jpg?k=6020d54a04fa7aeba7b1e523c84b8ef42178370fc824bee8c0861cbfb199daa9&o=',
    'https://cf.bstatic.com/xdata/images/city/600x600/690334.jpg?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=',
    'https://cf.bstatic.com/xdata/images/city/600x600/976891.jpg?k=a338d6d7d70db6b8a90b2634f7b84801d68a9c2d036b7a41d5d32a73503001f1&o=',
    'https://cf.bstatic.com/xdata/images/city/600x600/976877.jpg?k=2aab28217f0fb039e0f35ea2b2c3976141b5860b074f74220edf998115935cda&o='
  ]

  return (
    <div className='featured'>
      {
        loading
          ? ('Loading...')
          : (
            <>{data && data.length > 0 && data.map((item, index) => (
              <div className='featuredItem' key={index}>
                <img className='featuredImage' src={photos[index]} alt='' />
                <div className='featuredTitles'>
                  <h1>{item.city}</h1>
                  <h2>{item.count} properties</h2>
                </div>
              </div>))}
            </>
            )
      }
    </div>
  )
}

export default Featured
