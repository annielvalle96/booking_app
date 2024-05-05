import DataTable from '../../components/datatable/DataTable.jsx'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import './list.scss'

const Users = ({ type }) => {
  return (
    <div className='list'>
      <Sidebar />
      <div className='container'>
        <Navbar />
        <DataTable type={type} />
      </div>
    </div>
  )
}

export default Users
