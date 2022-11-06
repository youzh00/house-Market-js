import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router"
import { useRefreshMutation } from "../features/auth/authApiSlice"
import { selectCurrentToken } from "../features/auth/authSlice"
import usePersist from "../hooks/usePersist"
import PulseLoader from 'react-spinners/PulseLoader'
import { Link } from "react-router-dom"




const PersistLogin = () => {
    const [persist]=usePersist()

    console.log(persist);
    
    const token=useSelector(selectCurrentToken)
    const effectRan=useRef(false)

    const [trueSuccess,setTrueSuccess]=useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    await refresh()

                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])

  let content
    if (!persist) { // persist: no
        console.log('no persist')
        content = <Outlet />
    } else if (isLoading) { //persist: yes, token: no
        console.log('loading')
        content = <PulseLoader color={"#FFF"} />
    } else if (isError) { //persist: yes, token: no
        console.log('error')
        content = (
            <p className='errmsg'>
                {`${error?.data?.message} - `}
                <Link to="/auth/login">Please login again</Link>.
            </p>
        )
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token: yes
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }

    return content
}

export default PersistLogin