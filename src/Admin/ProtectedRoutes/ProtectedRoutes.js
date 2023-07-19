import React, { useEffect } from 'react'
 
import { useNavigate } from 'react-router-dom'
 

export default function ProtectedRoutes({Component}) {
  const navigate = useNavigate()
  // const {token} = useSelector(authSelector)
  let token = localStorage.getItem('token')
  useEffect(()=>{
    if(!token || token==="undefined" || token==null){
      navigate('/login')
    }
  },[])
 
 
  return (
    <>
      <Component />
    </>
  )
}

