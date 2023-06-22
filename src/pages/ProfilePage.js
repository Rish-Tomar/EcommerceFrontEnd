import React from 'react'
import NavBar from '../features/navbar/NavBar'
import UserProfile from '../features/user/components/UserProfile'

function ProfilePage() {
  return (
    <NavBar>
        <UserProfile/>
    </NavBar>
  )
}

export default ProfilePage