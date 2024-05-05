import './dataTable.scss'
import { DataGrid } from '@mui/x-data-grid'
// import { userColumns, userRows } from '../../dataSource.jsx'
import { Link, useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch.js'
import { useEffect, useState } from 'react'
import axiosInstance from '../../useful/axios-instance.js'

const DataTable = ({ type }) => {
  // 🙄 I used this data when the Admin App was not connected to my Database.
  // const [data, setData] = useState(userRows)
  // const handleDelete = (id) => {
  //   setData(data.filter(item => item.id !== id))
  // }

  const userColumns = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'image',
      headerName: 'Image',
      width: 90,
      renderCell: (params) => {
        return (
          <div className='cellWithImg'>
            {
              params.row.image
                ? <img className='cellImg' src={params.row.image} alt='avatar' />
                : <img className='cellImg' src='https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg' alt='avatar' />
            }
          </div>
        )
      }
    },
    { field: 'username', headerName: 'Username', width: 110 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'country', headerName: 'Country', width: 110 },
    { field: 'city', headerName: 'City', width: 120 },
    { field: 'phone', headerName: 'Phone', width: 180 },
    {
      field: 'isAdmin',
      headerName: 'Admin',
      width: 70,
      renderCell: (params) => {
        return (
          <div className='cellWithStatus'>
            <div className={`${params.row.isAdmin}`}>{`${params.row.isAdmin}`}</div>
          </div>
        )
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='cellAction'>
            <Link to={`/${type}/${params.row._id}`} style={{ textDecoration: 'none' }}>
              <div className='viewButton'>View</div>
            </Link>
            <div className='deleteButton' onClick={() => handleDelete(params.row._id)}>Delete</div>
          </div>
        )
      }
    }
  ]

  const hotelColumns = [
    { field: '_id', headerName: 'ID', width: 250 },
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: 'type',
      headerName: 'Type',
      width: 100,
      renderCell: (params) => {
        return (
          <div className='cellWithType'>
            <div className={`${params.row.type}`}>{`${params.row.type}`}</div>
          </div>
        )
      }
    },
    { field: 'city', headerName: 'City', width: 90 },
    { field: 'address', headerName: 'Address', width: 150 },
    { field: 'distance', headerName: 'Distance', width: 80 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'cheapestPrice', headerName: 'Price', width: 80 },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: (params) => {
        return (
          <div className='cellAction'>
            <Link to={`/${type}/${params.row._id}`} style={{ textDecoration: 'none' }}>
              <div className='viewButton'>View</div>
            </Link>
            <div className='deleteButton' onClick={() => handleDelete(params.row._id)}>Delete</div>
          </div>
        )
      }
    }
  ]

  const roomColumns = [
    { field: '_id', headerName: 'ID', width: 250 },
    { field: 'title', headerName: 'Title', width: 270 },
    { field: 'price', headerName: 'Price', width: 80 },
    { field: 'maxPeople', headerName: 'Max People', width: 100 },
    { field: 'description', headerName: 'Description', width: 400 },
    {
      field: 'roomNumbers',
      headerName: 'Room Numbers',
      width: 200,
      renderCell: (params) => {
        return (<div>{params.row.roomNumbers && params.row.roomNumbers.map((r, index) => (<span key={index}>| {r.number} |</span>))}</div>)
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='cellAction'>
            <Link to={`/${type}/${params.row._id}`} style={{ textDecoration: 'none' }}>
              <div className='viewButton'>View</div>
            </Link>
            <div className='deleteButton' onClick={() => handleDelete(params.row._id)}>Delete</div>
          </div>
        )
      }
    }
  ]

  const location = useLocation()
  const path = location.pathname.split('/')[1]
  const [list, setList] = useState([])
  const { data } = useFetch(`/${path}/get`)

  useEffect(() => {
    setList(data)
  }, [data])

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`/${path}/delete/${id}`)
      if (res.status === 200) {
        setList(list.filter(item => item._id !== id))
      }
    } catch (err) { }
  }

  return (
    <div className='dataTable'>
      <div className='title'>All {`${type}s`}<Link className='link' to={`/${type}/new`}>New</Link></div>
      {
        type === 'user' && (
          <DataGrid
            className='dataGrid'
            rows={list}
            columns={userColumns}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection getRowId={row => row._id}
          />
        )
      }
      {
        type === 'hotel' && (
          <DataGrid
            className='dataGrid'
            rows={list}
            columns={hotelColumns}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection getRowId={row => row._id}
          />
        )
      }
      {
        type === 'room' && (
          <DataGrid
            className='dataGrid'
            rows={list}
            columns={roomColumns}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection getRowId={row => row._id}
          />
        )
      }
    </div>
  )
}

export default DataTable
