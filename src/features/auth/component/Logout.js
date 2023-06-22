import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SignOutUserAsync, selectLoggedInUser } from "../authSlice"
import { Navigate } from "react-router-dom"

function Logout() {
    const dispatch=useDispatch()
    const user = useSelector(selectLoggedInUser)

    useEffect(()=>{
        dispatch(SignOutUserAsync())
    },)
  return (
    <>
        { !user && <Navigate to='/login' replace={true}/>}
    </>
  )
}

export default Logout