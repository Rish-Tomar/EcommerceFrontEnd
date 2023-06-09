import React from 'react'
import Cart from '../features/cart/Cart'
import NavBar from '../features/navbar/NavBar'

function CartPage() {
  return (
    <NavBar>
        <Cart buttonText={'Checkout'}/>
    </NavBar>
  )
}

export default CartPage