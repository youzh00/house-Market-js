import React from 'react'
import { Card, Image, Text, Badge, Button, Group, Container, Center, createStyles, ActionIcon } from '@mantine/core';
import { selectHouseById } from '../features/houses/houseApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {TbBed,TbBath} from 'react-icons/tb'
import {MdOutlineSpaceDashboard} from 'react-icons/md'
import {GoLocation} from 'react-icons/go'
import { Carousel } from '@mantine/carousel';
import { IconHeart } from '@tabler/icons';

const useStyles = createStyles((theme, _params, getRef) => ({
  price: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
  like: {
    color: theme.colors.red[6],
  },
  carousel: {
    '&:hover': {
      [`& .${getRef('carouselControls')}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getRef('carouselControls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  carouselIndicator: {
    width: 4,
    height: 4,
    transition: 'width 250ms ease',

    '&[data-active]': {
      width: 16,
    },
  },
}));



const HouseCard = ({houseId}) => {
    
    const { classes } = useStyles();

    const house = useSelector(state => selectHouseById(state, houseId));
    console.log(house)
    const navigate = useNavigate()

    const handleFindMore=()=>{
      navigate(`/houses/${houseId}`)
    }

    
    if(house){
      const slides = house.pictures.map((image) => (
        <Carousel.Slide key={image}>
          <Image src={`http://localhost:3000/${image}`} height={200} />
        </Carousel.Slide>
      ))
        return (
            <Card shadow="sm" p="lg" radius="md" withBorder key={houseId}>
              <Card.Section component="a" >
                <Carousel withIndicators loop
                    classNames={{
                      root: classes.carousel,
                      controls: classes.carouselControls,
                      indicator: classes.carouselIndicator,
                    }}
                >
                  {slides}
                </Carousel>
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
                      <GoLocation  size={18}/> 
                      <Text  ml={3} size={18} fw={700}><b>{house.country}</b>, {house.city} </Text>
                  </Center>
                  <Badge color="gray" radius="md" >
                          <Center>
                            <Text > {house.propertyType} </Text>
                          </Center>
                  </Badge >

              </Group>
              <Group position="apart" mt="md">
                    <div>
                      <Text size="xl" span weight={500} className={classes.price}>
                        {house.price}$
                      </Text>
                      {
                        house.propertyType==='Apartement' && (
                          <Text span size="sm" color="dimmed">
                            {' '}
                            / night
                          </Text>
                        )
                      }
                      
                    </div>

                    <Button    color='blue' radius="md" onClick={handleFindMore}>
                      More Info
                    </Button>  
                    <ActionIcon variant="default" radius="md" size={36}>
                      <IconHeart size={18} className={classes.like} stroke={1.5} />
                    </ActionIcon>            
              </Group>
              
            </Card>
          )
    }
    return null
  
}

export default HouseCard
