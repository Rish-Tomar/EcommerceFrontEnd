import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
 fetchLoggedInUserOrderAsync, selectUser
} from '../userSlice';
import { selectUserOrders } from '../userSlice';

export default function UserOrders() {
  const dispatch = useDispatch();
  const user =useSelector(selectUser)
  const orders =useSelector(selectUserOrders)
  
  useEffect(()=>{
    dispatch(fetchLoggedInUserOrderAsync(user.id))
  },[])

  return (
    <div>
      {orders.map(order => 
             <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8 bg-red">      
             <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
             <h2  className="text-2xl font-bold tracking-light text-grey-900">Items in this order , Order ID :{order.id}</h2>
                             <div className="flow-root">
                               <ul role="list" className="-my-6 divide-y divide-gray-200">
                                 {order.products.map((product) => (
                                   <li key={product.id} className="flex py-6">
                                     <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                       <img
                                         src={product.thumbnail}
                                         alt={product.title}
                                         className="h-full w-full object-cover object-center"
                                       />
                                     </div>
       
                                     <div className="ml-4 flex flex-1 flex-col">
                                       <div>
                                         <div className="flex justify-between text-base font-medium text-gray-900">
                                           <h3>
                                             <a href={product.href}>{product.title}</a>
                                           </h3>
                                           <p className="ml-4">{product.price}</p>
                                         </div>
                                         <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                                       </div>
                                       <div className="flex flex-1 items-end justify-between text-sm">
                                         <div className="text-gray-500">
                                           <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                                               Qty {product.quantity}
                                           </label>
                                         </div>
                                       </div>
                                     </div>
                                   </li>
                                 ))}
                               </ul>
                             </div>
                           </div>
                         
       
                         <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                         <div className="flex justify-between text-base font-medium text-gray-900 ">
                             <p>Total Item Count</p>
                             <p>{order.totalItems}</p>
                           </div>
                           <div className="flex justify-between text-base font-medium text-gray-900">
                             <p>Subtotal</p>
                             <p>$ {order.totalAmount}</p>
                           </div>
                           <p className="mt-0.5 text-sm text-gray-500">Address :</p>
                           <div className="mt-6">
                             {/* {checkoutButton(buttonText,handleOrder)} */}
                           </div>
                           <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                           </div>
                         </div >
                         {order.user.addresses.map((address,index) => (
                            <li key={index} className="flex justify-between gap-x-6 py-5 border-solid border-2 px-5 border-grey margin-10">
                            <div className="flex gap-x-4">
                                <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.email}</p>
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">{address.street}</p>
                                <p className="mt-1 text-xs leading-5 text-gray-500">{address.state}</p> 
                                <p className="mt-1 text-xs leading-5 text-gray-500">{address.city}</p>
                                <p className="mt-1 text-xs leading-5 text-gray-500">{address.phone}</p>                                
                            </div>
                            </li>
                        ))}
           </div>
        )}
    </div>
  );
}
