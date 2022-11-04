import React from 'react'
import { useGetHousesQuery } from '../features/houses/houseApiSlice'
import HouseCard from '../components/HouseCard'
import { Container, Divider, Grid } from '@mantine/core'

const HousesListScreen = () => {
    const {
        data: houses,isLoading,
        isSuccess,isError,error
    } = useGetHousesQuery()
    let items=<h1>Items</h1>
    if(isError){
        items= <h3>{error?.data?.message}</h3>
    }
    if(isSuccess){
        const {ids}=houses
        items=ids?.length 
            ? ids.map(houseId=>(
                <Grid.Col xs={12} lg={4} md={6}>
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