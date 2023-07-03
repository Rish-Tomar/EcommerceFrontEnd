import React, { useState,Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  deleteCartItemAsync,
  selectItems,
  updateCartItemAsync,
} from './cartSlice';
import { Link, Navigate } from 'react-router-dom';
import { createOrderAsync, selectOrderStatus } from '../order/orderSlice';
import { selectLoggedInUser } from '../auth/authSlice';


function checkoutButton(buttonText,handleOrder){
  if(buttonText==='Pay Now')
  {
   return(
    <div
    onClick={(e)=>handleOrder(e)}
    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
  >
  {buttonText}
  </div>
   )

  }
  else{
    return(
      <Link to="/checkout"
        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
      >
        {buttonText}
      </Link>
    )
  }
}

export default function Cart({buttonText,selectedAddress,items,paymentMethod}) {
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch();
  const products =useSelector(selectItems)
  const user =useSelector(selectLoggedInUser)
  const totalAmount = products.reduce((amount,item)=>item.product.price*item.quantity+amount,0)
  const totalItems  = products.reduce((total,item)=>item.quantity+total,0)

  const handleQuantityChange=(e,item)=>{
    dispatch(updateCartItemAsync({id:item.id,quantity:+e.target.value}))
  }
  const handleDelete=(e,id)=>{
    dispatch(deleteCartItemAsync(id))
  }

  const handleOrder=(e)=>{
    const order={products,totalAmount,totalItems,user,paymentMethod,selectedAddress,
                 orderStatus:'pending' //can be changed to ordered  delivered etc
                }
    dispatch(createOrderAsync(order))
    console.log("order Created")

    // to clear cart
    // redirect to other page(order success page)
    // on server change the stock values
}

  return (
    <>
    {products.length<1 && <Navigate to ="/" replace={true}></Navigate>}
    {}
    <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">      
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <h2  className="text-2xl font-bold tracking-light text-grey-900"> CART</h2>
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {products.map((product) => (
                            <li key={product.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={product.product.thumbnail}
                                  alt={product.product.title}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={product.href}>{product.product.title}</a>
                                    </h3>
                                    <p className="ml-4">{product.product.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{product.product.brand}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="text-gray-500">
                                    <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                                        Qty
                                    </label>
                                    <select onChange={(e)=>handleQuantityChange(e,product)}>
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option><option>4</option><option>5</option>
                                    </select>
                                  </div>

                                  <div className="flex">
                                    <button
                                      type="button"
                                      onClick={e=>handleDelete(e,product.id)}
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total Item Count</p>
                      <p>{totalItems}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>$ {totalAmount}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      {checkoutButton(buttonText,handleOrder)}
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or
                        <Link to ='/'>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </Link>
                      </p>
                    </div>
                  </div>
    </div>
    </>
  );
}
