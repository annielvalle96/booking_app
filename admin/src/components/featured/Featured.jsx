import './featured.scss'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'

const Featured = () => {
  return (
    <div className='featured'>
      <div className='top'>
        <h1 className='title'>Total Revenue</h1>
        <MoreVertOutlinedIcon className='icon' />
      </div>
      <div className='bottom'>
        <div className='featuredChart'>
          <CircularProgressbar value={70} text={`${70}%`} strokeWidth={5} />
        </div>
        <p className='title'>Total sales made today</p>
        <p className='amount'>$420</p>
        <p className='description'>Previous transactions processing. Last payments may not be included.</p>
        <div className='summary'>
          <div className='item'>
            <div className='title'>Target</div>
            <div className='result negative'>
              <KeyboardArrowDownOutlinedIcon className='icon' />
              <div className='amount'>$12.4k</div>
            </div>
          </div>
          <div className='item'>
            <div className='title'>Last Week</div>
            <div className='result positive'>
              <KeyboardArrowUpOutlinedIcon className='icon' />
              <div className='amount'>$12.4k</div>
            </div>
          </div>
          <div className='item'>
            <div className='title'>Last Month</div>
            <div className='result positive'>
              <KeyboardArrowUpOutlinedIcon className='icon' />
              <div className='amount'>$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured
