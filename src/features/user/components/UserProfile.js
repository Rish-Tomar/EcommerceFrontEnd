import React, { useEffect, useState} from 'react';
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import { 
 fetchLoggedInUserOrderAsync, selectUser, updateUserAsync
} from '../userSlice';
import { selectUserOrders } from '../userSlice';
import { selectLoggedInUser } from '../../auth/authSlice';


export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo =useSelector(selectUser)
  const orders =useSelector(selectUserOrders)  
  const {register,reset,handleSubmit,formState:{errors},setValue} = useForm()
  const [selectedAddressIndex,setSelectedAddressIndex] =useState(-1)

  const handleAddressEdit=(index)=>{
    setSelectedAddressIndex(index)
    const address=userInfo.addresses[index]
    setValue('name',address.name)
    setValue('email',address.email)
    setValue('street',address.street)
    setValue('city',address.city)
    setValue('state',address.state)
    setValue('pincode',address.pinCode)
    setValue('phone',address.phone)
  }

  const handleEdit=(addressUpdate,index)=>{
    const userData = {...userInfo,addresses:[...userInfo.addresses]} // for shallow coppy issue
    userData.addresses.splice(index,1,addressUpdate)
    dispatch(updateUserAsync(userData))
    console.log('Edit button clicked')
    setSelectedAddressIndex(-1)
  }

  const handleRemove=(e,index)=>{
    const userData = {...userInfo,addresses:[...userInfo.addresses]} // for shallow coppy issue
    userData.addresses.splice(index,1)
    dispatch(updateUserAsync(userData))
  }

  return (
    <div>   
           <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8 bg-red">      
           <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
           <h2  className="text-2xl font-bold tracking-light text-grey-900">USER EMAIL : {userInfo.email}</h2>
           </div>
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <p className="mt-0.5 text-sm text-gray-500">Address :</p>
                    </div >
                      
                       {userInfo.addresses.map((address,index) => (
                          <div key={index}>
                                {selectedAddressIndex===index &&
                                    <form className='bg-white px-5' noValidate 
                                        onSubmit={handleSubmit((data=>{
                                            handleEdit(data,index)
                                            reset()
                                            console.log(data)
                                            }))}
                                    >
                                        <div className="space-y-12">
                                        <div className="border-b border-gray-900/10 pb-12">
                                            <h2 className="text-base font-semibold leading-7 text-gray-900">Enter Address</h2>
                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Name
                                                    </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        {...register('name',{required:'Please Enter Your Name'})}
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Email address
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="email"
                                                        {...register('email',{required:'Please Enter Your Email'})}
                                                        type="email"
                                                        // value={address.email} this was not editable so commented and used setValue
                                                        autoComplete="email"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                            Phone Number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="tel"
                                                {...register('phone',{required:'Please Enter Your Contact number'})}
                                                id="phone"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                            Street address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register('street',{required:'Please Enter Your Street'})}
                                                id="street-address"
                                                autoComplete="street-address"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        City
                                        </label>
                                        <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('city',{required:'Please Enter Your City'})}
                                            id="city"
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                        State / Province
                                        </label>
                                        <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('state',{required:'Please Enter Your State'})}
                                            id="region"
                                            autoComplete="address-level1"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                        ZIP / Postal code
                                        </label>
                                        <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('pinCode',{required:'Please Provide pin code'})}
                                            id="postal-code"
                                            autoComplete="postal-code"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        </div>
                                    </div>
                                    </div>
                                </div>

                                
                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="submit" className="text-sm font-semibold leading-6 text-gray-900"
                                        onClick={(e)=>setSelectedAddressIndex(-1)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add Address
                                </button>
                                </div>
                            
                                </div>
                                    </form>
                                }

                        {/* showing address part  */}
                         { selectedAddressIndex!==index&&<li key={index} className="flex justify-between gap-x-6 py-5 border-solid border-2 px-5 border-grey margin-10">
                            <div className="flex gap-x-4">
                                <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p> 
                                <p className="mt-1 text-xs leading-5 text-gray-500">{address.state}</p> 
                                <p className="mt-1 text-xs leading-5 text-gray-500">{address.city}</p>
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:flex-col sm:items-end">                
                                <p className="text-sm leading-6 text-gray-900">{address.email}</p>              
                                <p className="mt-1 text-xs leading-5 text-gray-500">{address.phone}</p>                                
                            </div>
                            <div className="hidden sm:flex sm:flex-col sm:items-end">                                
                                <button
                                    type="button"
                                    onClick={e=>handleAddressEdit(index)}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                   Edit
                                </button> 
                                <button
                                    type="button"
                                    onClick={e=>handleRemove(e,index)}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                   Remove
                                </button>                               
                            </div>
                          </li>}
                          </div>
                      ))}
         </div>

  </div>
   );
}
