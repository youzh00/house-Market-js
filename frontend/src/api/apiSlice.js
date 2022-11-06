import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import { setCredentials,logOut  } from '../features/auth/authSlice'


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    
    let result = await baseQuery(args, api, extraOptions)
   
    if (result?.error?.status === 403 ) {

        console.log('sending refresh token')

        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        console.log("Refresh results :",refreshResult)


        if (refreshResult?.data) {

            const user = api.getState().auth.user
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data,user }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)

            console.log("Results :",result)

        } else {
            api.dispatch(logOut())
        }
    }

    return result
}


export const apiSlice=createApi({
    baseQuery:baseQueryWithReauth,
    tagTypes:['House'],
    endpoints: (builder)=>({})
})