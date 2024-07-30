import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function NoPage() {
  const {user} = useContext(UserContext)
  return (
    <div className='h-[90vh]'>NoPage

        <ul>
          {user && user?.map ((user, index) => {
            return <li key={index}>{user}</li>
          })

          }
        </ul>
    </div>
  )
}

export default NoPage