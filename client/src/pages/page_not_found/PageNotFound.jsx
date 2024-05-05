import './pageNotFound.css'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='pageNotFound'>
      <h1 className='title'>Page Not Found</h1>
      <Link className='button' to='/'>Go to Home</Link>
    </div>
  )
}

export default PageNotFound
