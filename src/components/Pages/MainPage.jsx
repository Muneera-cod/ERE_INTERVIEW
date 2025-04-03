import { useEffect, useState } from 'react'
import Table from '../Ui/Table'
import SearchBar from '../Ui/SearchBar'
// const url = 'https://dummyjson.com/users'
function MainPage() {
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState(null)

    // const fetchData = async () => {
    //     setLoading(true)
    //     try {
    //         const response = await fetch(url)
        
    //         const result = await response.json()
    //         setData(result.users)
    //     } catch (error) {
    //         setError(error.message)
    //     } finally {
    //         setLoading(false)
    //     }
    // }
    // useEffect(()=>{
    //     fetchData()
    // },[])
  return (
    <div className='outer-container'>
        <Table/>
    </div>
  )
}

export default MainPage