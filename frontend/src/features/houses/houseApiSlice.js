import { createSelector,createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";


const housesAdapter=createEntityAdapter({})

const initialState=housesAdapter.getInitialState()


export const houseApiSlice=apiSlice.injectEndpoints({
    endpoints: builder =>({
        getHouses:builder.query({
            query:()=>({
                url:'/houses',
            }),
            transformResponse:responseData =>{
                console.log("responseData ",responseData)
                const loadedHouses=responseData.map(house=>{
                    house.id=house._id
                    return house
                })
                return housesAdapter.setAll(initialState, loadedHouses)

            },
            providesTags: (result, error, arg) => {
                console.log(result)
                if (result?.ids) {
                    return [
                        { type: 'House', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'House', id }))
                    ]
                } else return [{ type: 'House', id: 'LIST' }]
            }
        })
        
    })
})
export const selectHousesResult = houseApiSlice.endpoints.getHouses.select()

const selectHousesData = createSelector(
    selectHousesResult,
    housesResult => housesResult.data // normalized state object with ids & entities
)

export const {
    selectAll:selectAllHouses,
    selectById:selectHouseById,
    selectIds:selectHouseId,}=housesAdapter.getSelectors(state=>selectHousesData(state) ?? initialState)

export const {useGetHousesQuery}=houseApiSlice