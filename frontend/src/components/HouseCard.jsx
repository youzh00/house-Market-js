import React from 'react'
import { Card, Image, Text, Badge, Button, Group, Container, Center } from '@mantine/core';
import { selectHouseById } from '../features/houses/houseApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {TbBed,TbBath} from 'react-icons/tb'
import {MdOutlineSpaceDashboard} from 'react-icons/md'
import {GoLocation} from 'react-icons/go'

const HouseCard = ({houseId}) => {

    const house = useSelector(state => selectHouseById(state, houseId));
    console.log(house)
    const navigate = useNavigate()

    const handleFindMore=()=>{
      navigate(`/houses/${house.houseId}`)
    }

    if(house){
        return (
            <Card shadow="sm" p="lg" radius="md" withBorder key={houseId}>
              <Card.Section component="a" >
                <Image
                  src={`http://localhost:3000/${house.pictures[0]}`}
                  height={160}
                  alt={`${house.title}`}
                />
              </Card.Section>
        
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{house.title}</Text>
                {
                    house.forRent && (
                        <Badge color="blue" variant="light">
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
              <Group position='apart'>
                        <Badge color="red"  size='xl'radius='md' p={15}  >
                          <Center>
                             <TbBed color='red' size={25}/> 
                             <Text color='#ff0000' ml={3} size={18}>{house.bedroom}</Text>
                          </Center>
                        </Badge >

                        <Badge color="red"  size='xl'radius='md' p={15}  >
                          <Center>
                             <TbBath color='red' size={25}/> 
                             <Text color='#ff0000' ml={3} size={18}>{house.bathroom} </Text>
                          </Center>
                        </Badge >

                        <Badge color="red"  size='xl'radius='md' p={15}  >
                          <Center>
                             <MdOutlineSpaceDashboard color='red' size={25}/> 
                             <Text color='#ff0000' ml={3} fz="lg">{house.size} &#13217; </Text>
                          </Center>
                        </Badge >
              </Group>

              <Group m={10} position='apart'>
                <Center >
                    <GoLocation  size={20}/> 
                    <Text  ml={3} size={18} fw={700}><b>{house.country}</b>, {house.city} </Text>
                  </Center>
                <Text fz="lg"> <b>{house.price} $ </b></Text>

              </Group>
        
              <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={handleFindMore}>
                More Info
              </Button>
            </Card>
          )
    }
    return null
  
}

export default HouseCard
