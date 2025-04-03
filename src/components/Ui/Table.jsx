import { useEffect, useState } from 'react'
import { useGetUsersQuery } from '../../redux/reducers/Api/userApi'
import { IconSortAscending } from '@tabler/icons-react'

function Table() {
    const { data, error, isLoading } = useGetUsersQuery()

    const [ search, setSearch ] = useState('')
    const [ filteredData, setFilteredData ] = useState([])
    const handleSearch = (e) => {
        setSearch(e.target.value)

    }
  
    useEffect(() => {
        if (search) {
            const filtered = data?.users.filter(user => user.firstName.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) || user.company.name.toLowerCase().includes(search.toLowerCase()))   
            setFilteredData(filtered)
        } else {
            setFilteredData(data?.users)
        }
    }, [search, data])

    if (isLoading) return <div className='center'>Loading...</div>
    if (error) return <div className='center'>Error: {error.message}</div>
    if (!data) return <div className='center'>No data found</div>
  return  (
    <>
    <div className='top-bar'>
      <div className='search-bar'>
            <input type="text"  placeholder='Search...' className='search-input' onChange={(e)=>handleSearch(e)} />
            {/* <button className='search-button'>Search</button> */}
       </div>
       <IconSortAscending/>
    </div>
    { !data.users.length && !filteredData.length ? <p className='center'>No user Found</p> : <div>
        <table className="table">
            <thead>
            <tr>
                <th className="">ID</th>
                <th className="">Name</th>
                <th className="">Email</th>
                <th className="">Company Name</th>
                <th>Address</th>
            </tr>
            </thead>
            <tbody>
                { filteredData?.map((user)=><tr key={user.id}>
                    <td className="">{user.id}</td>
                    <td className="">{user.firstName}</td>
                    <td className="">{user.email}</td>
                    <td className="">{user.company.name}</td>
                    <td className="">
                        {user.address.city} , {user.address.address}</td>
                    
                  
                </tr>
            )}
            </tbody>
        </table>
    </div>}
    </>

  )
}

export default Table