import { useSelector } from "react-redux";
import { apiSlice } from "../../api/apiSlice";
import { logOut, selectCurrentUser, setCredentials } from "./authSlice";

const GetUser=()=>{
    const user =useSelector(selectCurrentUser)
    return user
}


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout:builder.mutation({
            query:() => ({
                url:'/auth/logout',
                method:'POST',
            }),
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                try {
                    console.log("form sendLogout")
                    const {data}=await queryFulfilled
                    console.log("Data form sendLogout",data)
                    dispatch(logOut())
                    setTimeout(()=>{
                        dispatch(apiSlice.util.resetApiState())
                    },1000)

                } catch (error) {
                    console.log("Error from send Logout : ",error)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log("data from refresh reducer",data)
                    const user=GetUser();
                    console.log("user from refresh reducer: ", user)
                    const { accessToken } = data

                    dispatch(setCredentials({ user,accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        register:builder.mutation({
            query: credentials => ({
                url: '/auth/register',
                method: 'POST',
                body: { ...credentials }
            })
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshMutation,
    useSendLogoutMutation
} = authApiSlice