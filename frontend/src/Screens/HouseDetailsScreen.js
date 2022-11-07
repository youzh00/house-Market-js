import { Badge, Center, Container, createStyles, Divider, Grid, Group, Image, Text, Title,Flex } from '@mantine/core'
import React from 'react'
import { useParams } from 'react-router'
import { useGetHousesQuery } from '../features/houses/houseApiSlice'
import { Carousel } from '@mantine/carousel';
import {MdOutlineDateRange, MdOutlineLocationCity,MdOutlineSpaceDashboard} from 'react-icons/md' 
import { ClassNames } from '@emotion/react';
import {TbBed,TbBath} from 'react-icons/tb'
import {GoLocation} from 'react-icons/go'
import NotFound from '../components/NotFound';
import image from '../Assets/notFound2.jpg';

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
  center:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  }
}));

const HouseDetailsScreen = () => {
    const { classes } = useStyles();

    const { id } = useParams()
    const { house } = useGetHousesQuery("housesList", {
        selectFromResult: ({ data }) => ({
            house: data?.entities[id]
        }),
    })
    if(!house){
        console.log(!house)
        let date=new Date(house.createdAt)
        let createdAt=date.toLocaleString('en-GB', {day:'numeric', month: 'long',  year:'numeric'}) 
    
        console.log(house);
        const slides = house.pictures.map((image) => (
            <Carousel.Slide key={image} >
              <Image radius={20} src={`http://localhost:3000/${image}`} height={300} />
            </Carousel.Slide>
          ))
      return (
        <div>
            <Container mt={20} style={{maxWidth:'1100px'}}>
                <Title order={1} mt={20} >{house.title}</Title>
                <Group>
                    <div className={classes.center}>
                        <MdOutlineLocationCity color='#4c76e1'/> {house.country},{house.city}
                    </div>
                </Group>
    
                <Grid mt={10} >
                    <Grid.Col xs={12} lg={8} >
                        <Carousel slideSize="80%" height={300} align="center" slideGap="sm" controlsOffset="md" loop withIndicators
                            classNames={{
                              root: classes.carousel,
                              controls: classes.carouselControls,
                              indicator: classes.carouselIndicator,
                            }}
                            styles={{
                                indicator: {
                                  width: 12,
                                  height: 4,
                                  transition: 'width 250ms ease',
                        
                                  '&[data-active]': {
                                    width: 40,
                                  },
                                },
                              }}
                        >
                          {slides}
                        </Carousel>
                    </Grid.Col>
                    <Grid.Col xs={12} lg={4} >
                        <Container>
                            <Title order={3} mt={20} >Facilities</Title>
                            <Group mt={10}>
                                <Badge color="red"  size='xl'radius='md' p={15}  >
                                  <Center>
                                     <TbBed color='#000000' size={25}/> 
                                     <Text color='#000000' ml={3} size={18}>{house.bedroom}</Text>
                                  </Center>
                                </Badge >
    
                                <Badge color="red"  size='xl'radius='md' p={15}  >
                                  <Center>
                                     <TbBath color='#000000' size={25}/> 
                                     <Text color='#000000' ml={3} size={18}>{house.bathroom} </Text>
                                  </Center>
                                </Badge >
    
                                <Badge color="red"  size='xl'radius='md' p={15}  >
                                  <Center>
                                     <MdOutlineSpaceDashboard color='black' size={25}/> 
                                     <Text color='#000000' ml={3} fz="lg">{house.size} &#13217; </Text>
                                  </Center>
                                </Badge >
                            </Group>
                            <Divider my="sm" />
                            <Group position="apart" p={0}>
                                <Container p={0} m={0}>
                                    <Text color='#000000' ml={3} fz="lg"><b>Property Type</b></Text>
                                </Container>
                                <Container m={0} p={0}>
                                    <Text color='#000000' ml={3} fz="lg">{house.propertyType}</Text>
                                </Container>
                            </Group> 
                            <Group position="apart" p={0}>
                                <Container  p={0} m={0}>
                                    <Text color='#000000' ml={3} fz="lg"><b>Created At</b></Text>
                                </Container>
                                <Container m={0} p={0} >
                                    <Flex  gap="xs" justify="flex-end" align="center" direction="row" wrap="wrap">
                                        <MdOutlineDateRange />
                                        <Text color='#000000' ml={3} fz="lg">{createdAt}</Text>
                                    </Flex>
                                </Container>
                            </Group>
                        </Container>
                    </Grid.Col>
                </Grid>
    
            </Container>
        </div>
      )
    }
    return (
        <>
            <NotFound/>
        </>
    )
    
}

export default HouseDetailsScreen


