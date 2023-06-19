import React, { useState } from 'react'
import Cart from '../features/cart/Cart'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser, updateUserAsync } from '../features/auth/authSlice'
import { createOrderAsync, selectOrderStatus } from '../features/order/orderSlice'
import { Navigate } from 'react-router-dom'

const addresses=[
    {
        name:'Abc',
        street:'qwerty',
        city:'xyz',
        pincode:202000,
        state:"klmn",
        phone:1234567890
    },
    {
        name:'def',
        street:'qaz',
        city:'xyyz',
        pincode:200231,
        state:"klmnop",
        phone:1234509890
    }
]

function Checkout() {

    const [selectedAddress,setSelectedAddress]=useState(null)
    const [paymentMethod,setPaymentMethod]=useState('cash')

    const dispatch =useDispatch()
    const {register,reset,handleSubmit,formState:{errors}} = useForm()
    const user =useSelector(selectLoggedInUser)
    const orderPlaced = useSelector(selectOrderStatus)

    const handleAddress=(e)=>{
        console.log(e.target.value)
        setSelectedAddress(user.addresses[e.target.value])
    }

    const handlePayment=(e)=>{
        console.log(e.target.value)
        setPaymentMethod(e.target.value)
    }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {orderPlaced && <Navigate to={`/order-success/${orderPlaced.id}`} replace={true}/>}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className='lg:col-span-3'>
            <form className='bg-white px-5' noValidate onSubmit={handleSubmit((data=>{
                dispatch(updateUserAsync({...user,addresses:[...user.addresses,data]}))
                    // checkUserAsync({email:data.email,password:data.password}))
                reset()
                console.log(data)
                }))}
            >
                <div className="space-y-12">

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

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
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Reset
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add Address
                </button>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        choose from existing address
                    </p>
                    <ul role="list" className="divide-y divide-gray-100">
                        {user.addresses.map((address,index) => (
                            <li key={index} className="flex justify-between gap-x-6 py-5">
                            <div className="flex gap-x-4">
                                <input
                                id="card"
                                name="address"
                                type="radio"
                                value={index}
                                onChange={(e)=>handleAddress(e)}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={address.imageUrl} alt="" /> */}
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
                    </ul>

                    <div className="mt-10 space-y-10">
                    <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">Payments Methods</legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
                        <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                            <input
                            id="cash"
                            name="payments"
                            type="radio"
                            onChange={(e)=>handlePayment(e)}
                            checked={paymentMethod==='cash'}
                            value="cash"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                            Cash
                            </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <input
                            id="card"
                            name="payments"
                            type="radio"
                            value="card"
                            checked={paymentMethod==='card'}
                            onChange={(e)=>handlePayment(e)}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                            Online
                            </label>
                        </div>
                        </div>
                    </fieldset>
                    </div>
                </div>
                </div>
            </form>
            </div>
            <div className='lg:col-span-2'>
                <Cart buttonText={'Pay Now'} selectedAddress={selectedAddress} paymentMethod={paymentMethod}/>
            </div>
    </div>
  </div>
  )
}

export default Checkout