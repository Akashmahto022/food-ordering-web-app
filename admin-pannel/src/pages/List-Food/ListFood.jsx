import React, { useEffect, useState } from 'react'
import './listfood.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const ListFood = () => {
  const url = 'http://localhost:3000'
  const [list , setList] = useState([])

  const fetchList = async ()=>{
    const response = await axios.get(`${url}/api/food/getallfoods`)
    console.log(response.data.data)
    if (response.data.success) {
      setList(response.data.data)
    }else{
      toast.error("Error in loadpost")
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div className='list add flex-col'>
      <p>All foods List</p>
      
    </div>
  )
}

export default ListFood