import React from 'react'
import { useGetHousesQuery, useGetUserHousesQuery } from '../features/houses/houseApiSlice'
import HouseCard from '../components/HouseCard'
import { Container, Divider, Grid } from '@mantine/core'
import { apiSlice } from '../api/apiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/auth/authSlice'

const HousesListScreen = () => {
    const {
        data: houses,isLoading,
        isSuccess,isError,error
    } = useGetHousesQuery()

    // const {data}=useGetUserHousesQuery()
    // console.log(data)
    // const user =useSelector(selectCurrentUser)
    // console.log("This is user from house list : ", user)
    let items=<h1>Items</h1>

    if(isError){
        items= <h3>{error?.data?.message}</h3>
    }

    if(isSuccess){
        const {ids}=houses
        items=ids?.length 
            ? ids.map(houseId=>(
                <Grid.Col xs={12} lg={4} md={6} key={houseId}>
                    <HouseCard key={houseId} houseId={houseId}/>
                </Grid.Col>))
            : null
    }

  return (
    <Container mt={20} size='lg' p={30}>
        <Grid gutter={70}>
            {items}
        </Grid>
    </Container>
  )
}

export default HousesListScreen
