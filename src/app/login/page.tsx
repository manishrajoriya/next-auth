'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        
        password: '',
        email: ''
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            setButtonDisabled(true)
            const responce = await axios.post('/api/users/login', user)
            console.log("login success", responce.data);
            router.push('/profile')
            
            toast.success('login successful')
        } catch (error:any) {
            toast.error('login failed')
            console.log(error.message);
            
        } 
    }

    useEffect(( )=> {
        if(user.password.length > 0 && user.email.length > 0) {
           setButtonDisabled(false)
        }else {
            setButtonDisabled(true)
        }
    },[user])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading? "processing" : "Login"}</h1>
        <hr />

        
         

        <label htmlFor="">Email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id='email'
        type="email" 
        placeholder='Email'
        value={user.email} 
        onChange={(e) => setUser({...user, email: e.target.value})} />
        

         <label htmlFor="password">Password</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id='password'
        type="password" 
        placeholder='Password' 
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})} /> 

        
        <button onClick={onLogin} >
            {buttonDisabled? "Fill Data" : "Login"}
        </button>

        <Link href="/signup">Go to Signup</Link>
    </div>
  )
}

