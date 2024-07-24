"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


export default function page() {
  const router = useRouter()
  const [data, setData] = useState("Nothing")

  const getUserDetail =async () => {
   try {
     const res = await axios.post("/api/users/me")
     console.log(res.data);
     setData(res.data._id)

   } catch (error:any) {
    console.log(error.message);
    toast.error("Session Expired")
    
   }
    
  }

  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logged out successfully")
      router.push("/login")
    } catch (error:any) {
      console.log(error.message);
      toast.error("Something went wrong")
    }
  }

    
  return (
    <div>
      <h1>Protected Page</h1>
      <h2>{data}</h2>




      <button
      className='bg-blue-500 p-2 rounded-lg'
      onClick={getUserDetail}>Get User Detail</button>
      <button 
      className='bg-red-500 p-2 rounded-lg'
      onClick={logout}>Logout</button>
    </div>
  )
}

