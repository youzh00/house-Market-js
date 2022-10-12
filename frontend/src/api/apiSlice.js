import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import { setCredentials,logOut  } from '../features/auth/authSlice'


const baseQuery=fetchBaseQuery({
    baseUrl: 'http://localhost:3000'
})