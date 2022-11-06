import React from 'react'
import { Card, Image, Text, Badge, Button, Group, Container } from '@mantine/core';
import { selectHouseById } from '../features/houses/houseApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {TbBed} from 'react-icons/tb'

const HouseCard = ({houseId}) => {

    const house = useSelector(state => selectHouseById(state, houseId));
    
    const navigate = useNavigate()

    if(house){
        return (
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section component="a" href="https://mantine.dev/">
                <Image
                  src={`http://localhost:3000/${house.pictures[0]}`}
                  height={160}
                  alt={`${house.title}`}
                />
              </Card.Section>
        
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Norway Fjord Adventures</Text>
                {
                    house.forRent && (
                        <Badge color="pink" variant="light">
                            For Rent
                        </Badge >
                    )
                }
                {
                    house.forSale && (
                        <Badge color="green" variant="light">
                            For Sale
                        </Badge>
                    )
                }
              </Group>
              <Group position='left'>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Badge color="blue"  size='xl'radius='md' p={15} >
                            <TbBed color='blue' size={25}/>
                        </Badge >
                </div>
              </Group>
        
              <Text size="sm" color="dimmed">
                {house.description}
              </Text>
        
              <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                Book classic tour now
              </Button>
            </Card>
          )
    }
    return null
  
}

export default HouseCard
