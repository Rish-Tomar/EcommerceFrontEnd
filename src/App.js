import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Protected from './features/auth/component/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIDAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import NotFound404 from './pages/NotFound404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrderPage from './pages/UserOrderPage';
import ProfilePage from './pages/ProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/component/Logout';
import ForgetPassword from './features/auth/component/ForgetPassword';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected><Home/></Protected>),
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signup",
    element: <SignupPage/>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage/></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout/></Protected>,
  },
  {
    path: "/product-details/:id",
    element: <ProductDetailsPage/>,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage/>,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPasswordPage/>,
  },
  {
    path: "/orders",
    element: <UserOrderPage/>,
  },
  {
    path: "/profile",
    element: <ProfilePage/>,
  },
  {
    path: "/logout",
    element: <Logout/>,
  },
  {
    path: "*",
    element: <NotFound404/>,
  },
]);


function App() {

  const dispatch =useDispatch();
  const user     =useSelector(selectLoggedInUser);
  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIDAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }   
  },[dispatch,user])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
