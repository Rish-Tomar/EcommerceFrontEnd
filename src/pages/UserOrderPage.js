import React from 'react'
import NavBar from '../features/navbar/NavBar'
import UserOrders from '../features/user/components/UserOrders'

function UserOrderPage() {
  return (
    <NavBar>
        <h1 className='mx-auto text-2xl'>Orders</h1>
        <UserOrders/>
    </NavBar>
  )
}

export default UserOrderPage