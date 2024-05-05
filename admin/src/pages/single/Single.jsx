import Chart from '../../components/chart/Chart.jsx'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import List from '../../components/table/Table.jsx'
import useFetch from '../../hooks/useFetch.js'
import './single.scss'
import { useLocation } from 'react-router-dom'

const Single = ({ type }) => {
  const location = useLocation()
  const path = location.pathname.split('/')[1]
  const id = location.pathname.split('/')[2]
  const { data } = useFetch(`/${path}/get/${id}`)

  return (
    <div className='single'>
      <Sidebar />
      <div className='container'>
        <Navbar />
        <div className='top'>
          <div className='left'>
            <div className='editButton'>Edit</div>
            <h1 className='title'>Information</h1>
            {
              type === 'user' && data && (
                <div className='item'>
                  <img className='Image' src={data.image} alt='' />
                  <div className='details'>
                    <h1 className='title'>{data.username}</h1>
                    <div className='item'>
                      <span className='itemKey'>Username:</span>
                      <span className='itemValue'>{data.username}</span>
                    </div>
                    <div className='item'>
                      <span className='itemKey'>Email:</span>
                      <span className='itemValue'>{data.email}</span>
                    </div>
                    <div className='item'>
                      <span className='itemKey'>Country:</span>
                      <span className='itemValue'>{data.country}</span>
                    </div>
                    <div className='item'>
                      <span className='itemKey'>City:</span>
                      <span className='itemValue'>{data.city}</span>
                    </div>
                    <div className='item'>
                      <span className='itemKey'>Phone</span>
                      <span className='itemValue'>{data.phone}</span>
                    </div>
                  </div>
                </div>
              )
            }
            {
              type === 'hotel' && data && (
                <div className='item'>
                  <img
                    className='Image'
                    src={data.photos && data.photos.length > 0 ? data.photos[0] : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'}
                    alt=''
                  />
                  <div className='details'>
                    <h1 className='title'>{data.name}</h1>
                    <div className='item'>
                      <span className='itemKey'>Name:</span>
                      <span className='itemValue'>{data.name}</span>
                    </div>
                    <div className='item'>
                      <span className='itemKey'>Type:</span>
                      <span className='itemValue'>{data.type}</span>
                    </div>
                    <div className='item'>
                      <span className='itemKey'>City:</span>
                      <span className='itemValue'>{data.city}</span>
                    </div>
                    <div className='item'>
                      <span className='itemKey'>Address:</span>
                      <span className='itemValue'>{data.address}</span>
                    </div>
                    <div className='item'>
                      <span className='itemKey'>Distance</span>
                      <span className='itemValue'>{data.distance}</span>
                    </div>
                    <div className='item'>
                      <span className='itemKey'>Title</span>
                      <span className='itemValue'>{data.title}</span>
                    </div>
                    <div className='item'>
                      <span className='itemKey'>Description</span>
                      <span className='itemValue'>{data.description}</span>
                    </div>
                    <div className='item'>
                      <span className='itemKey'>Price</span>
                      <span className='itemValue'>{data.cheapestPrice}</span>
                    </div>
                  </div>
                </div>
              )
            }
            {
              type === 'room' && data && (
                <div className='item'>
                  <div className='details'>
                    <h1 className='title'>{data.title}</h1>
                    <div className='item'>
                      <span className='itemKey'>Title:</span>
                      <span className='itemValue'>{data.title}</span>
                    </div>
                    <div className='item'>
                      <span className='itemKey'>Price:</span>
                      <span className='itemValue'>{data.price}</span>
                    </div>
                    <div className='item'>
                      <span className='itemKey'>Max People:</span>
                      <span className='itemValue'>{data.maxPeople}</span>
                    </div>
                    <div className='item'>
                      <span className='itemKey'>Description:</span>
                      <span className='itemValue'>{data.description}</span>
                    </div>
                    <div className='item'>
                      <span className='itemKey'>Room Numbers</span>
                      <div className='itemValue'>{data.roomNumbers && data.roomNumbers.map((r, index) => (<span key={index}>| {r.number} |</span>))}</div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          <div className='right'>
            <Chart aspect={4 / 1} title='User Spending (Last 6 Months)' />
          </div>
        </div>
        <div className='bottom'>
          <List title='Last Transactions' />
        </div>
      </div>
    </div>
  )
}

export default Single
