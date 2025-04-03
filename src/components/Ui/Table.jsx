import { useEffect, useState } from 'react'
import { useGetUsersQuery } from '../../redux/reducers/Api/userApi'
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react'
function Table() {
    const { data, error, isLoading } = useGetUsersQuery()
    const [ search, setSearch ] = useState('')
    const [ filteredData, setFilteredData ] = useState([])
    const [ page, setPage ] = useState(2)
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                const filtered = data?.users.filter(user =>
                    user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase()) ||
                    user.company.name.toLowerCase().includes(search.toLowerCase())
                )
                setFilteredData(filtered)
            } else {
                setFilteredData(data?.users)
            }
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [search, data])

    const handleAscnngSort = (key) => {
        const sortedData = [...filteredData].sort((a, b) => {
            if (a[key] < b[key]) return -1
            if (a[key] > b[key]) return 1
            return 0
        })
        setFilteredData(sortedData)
    }
   const handleDescendingSort = (key) => {
        const sortedData = [...filteredData].sort((a, b) => {
            if (a[key] < b[key]) return 1
            if (a[key] > b[key]) return -1
            return 0
        })
        setFilteredData(sortedData)
    }
    const handleReset = () => setFilteredData(data?.users)


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
       <div className='sort-bar'>
        <IconSortDescending title='Sort by name' onClick={()=>handleDescendingSort('firstName')} className='sort-icon' size={24} color="#000" strokeWidth={2} />
        <IconSortDescending title='Sort by email' onClick={()=>handleDescendingSort('email')} className='sort-icon' size={24} color="#000" strokeWidth={2} />
         <IconSortAscending title='Sort by name' onClick={()=>handleAscnngSort('firstName')} className='sort-icon' size={24} color="#000" strokeWidth={2} />
         <IconSortAscending title='Sort by email' onClick={()=>handleAscnngSort('email')} className='sort-icon' size={24} color="#000" strokeWidth={2} />
        </div>
    </div>
    <p className='see-all' onClick={handleReset}>See all</p>
    <div className='center-absolute'>{[...Array(6).keys()].map((n)=><span key={n} onClick={()=>setPage(n+2)}>{n}</span>)}</div>
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
                { filteredData?.slice(page*5 - 5 - 5 , page*5 - 5).map((user)=><tr key={user.id}>
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