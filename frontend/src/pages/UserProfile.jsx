import React from 'react'
import Dashboard from '../components/Dashboard'

const user = localStorage.getItem("user");
const UserProfile = () => {
  return (
    // <Dashboard>
      <>  
      <h1>User Profile</h1>
      <h1>Email: {user.email}</h1>
      <h1>Username: {user.username}</h1>

    </>
    // </Dashboard>
  )
}

export default UserProfile