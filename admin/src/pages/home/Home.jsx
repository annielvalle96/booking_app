import './home.scss'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import Navbar from '../../components/navbar/Navbar.jsx'
import Widget from '../../components/widget/Widget.jsx'
import Featured from '../../components/featured/Featured.jsx'
import Chart from '../../components/chart/Chart.jsx'
import List from '../../components/table/Table.jsx'

const Home = () => {
  return (
    <div className='home'>
      <Sidebar />
      <div className='container'>
        <Navbar />
        <div className='widgets'>
          <Widget type='user' />
          <Widget type='order' />
          <Widget type='earning' />
          <Widget type='balance' />
        </div>
        <div className='charts'>
          <Featured />
          <Chart aspect={3 / 1} title='Last 6 Months (Revenue)' />
        </div>
        <div className='list'>
          <List title='Latest Transactions' />
        </div>
      </div>
    </div>
  )
}

export default Home
