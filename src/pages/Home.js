import React from 'react'
import NavBar from '../features/navbar/NavBar'
import ProductList from '../features/productList/ProductList'

function Home() {
  return (
    <div>
        <NavBar>
            <ProductList/>
        </NavBar>
    </div>
  )
}

export default Home