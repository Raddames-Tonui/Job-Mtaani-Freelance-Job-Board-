import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function Login() {
    const {user} = useContext(UserContext)
  return (
    <div className='h-[90vh] mt-5 bg-blue-200'>

        <h1>Login</h1>
        <p>{user}</p>
    </div>
  )
}

export default Login