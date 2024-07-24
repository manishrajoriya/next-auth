'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: ''
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            setButtonDisabled(true)
            const responce = await axios.post('/api/users/signup', user)
            console.log("signup success", responce.data);
            router.push('/verifyemail')
            
            toast.success('Signup successful')
        } catch (error:any) {
            toast.error('Signup failed')
            console.log(error.message);
            
        } 
    }

    useEffect(( )=> {
        if(user.username.length > 0 && user.password.length > 0 && user.email.length > 0) {
           setButtonDisabled(false)
        }else {
            setButtonDisabled(true)
        }
    },[user])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading? "processing" : "Signup"}</h1>
        <hr />

        <label htmlFor="">Username</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id='username'
        type="text" 
        value={user.username}
        placeholder='Username' 
        onChange={(e) => setUser({...user, username: e.target.value})} />
         

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


        <button onClick={onSignup} >
            {buttonDisabled? "Fill Data" : "Signup"}
        </button>

        <Link href="/login">Visit for Login</Link>
    </div>
  )
}

