import { Container, createStyles, Grid, Text, Title, Card, Badge, Button, Group, Center, Image } from '@mantine/core'
import React from 'react'
import buy from '../Assets/buyHouse.png'
import sell from '../Assets/saleHouse.png'
import rent from '../Assets/rentHouse.png'

const useStyles = createStyles((theme) => ({
    inner: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems:'space-between',
      alignContent:'space-between',
      paddingTop: theme.spacing.xl * 4,
      paddingBottom: theme.spacing.xl * 3,
    },
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: 42,
      lineHeight: 1.2,
      fontWeight: 900,
  
      [theme.fn.smallerThan('xs')]: {
        fontSize: 28,
      },
    },
    card:{
        display: 'flex',
        flexDirection: 'column',
        padding:20,
        backgroundColor: '#eafcfc',
        borderRadius: 20,
    },
    logoContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ffdec7',
        padding:20,
        borderRadius: 20,
    }
  }));


const OurServices = () => {
    const { classes } = useStyles();

  return (
    <div style={{height:'100vh'}}>
      <Container>
        <div className={classes.inner}>
            <div>
                <Text weight={500} color='#b9b7bd' size={20} m={10}>Our Services</Text>
                <Title className={classes.title} m={10}>
                    We have the most listing and constant updates. So you'll never miss out.
                </Title>
            </div>
            <div style={{margin:'30px'}}>
                <Grid gutter='xl'>
                    <Grid.Col xs={12} lg={4}>
                       <div className={classes.card}>
                            <Container mb={10}>
                                <div className={classes.logoContainer}>
                                    <Image src={buy} width={50}/>
                                </div>

                            </Container>
                            <div style={{margin:'10px'}}>
                                <Title order={3}> Buy a home</Title>
                                <Text weight={300} color='#b0afb3' size={18}>
                                    Find your place with an immersive photo experiece and the most listings, including things you won't find anywhere else.
                                </Text>

                            </div>
                       </div>
                    </Grid.Col>
                    <Grid.Col xs={12} lg={4}>
                        <div className={classes.card} >
                                <Container mb={10}>
                                    <div className={classes.logoContainer} style={{backgroundColor:'#e3dcfe'}}>
                                        <Image src={sell} width={50}/>
                                    </div>
    
                                </Container>
                                <div style={{margin:'10px'}}>
                                    <Title order={3}> Sell a home</Title>
                                    <Text weight={300} color='#b0afb3' size={18}>
                                        Whether you sell with new AjiTesken Offers™ or take another approach, we'll help you navigate the path to a successful sale.
                                    </Text>
    
                                </div>
                        </div>
                    </Grid.Col>
                    <Grid.Col xs={12} lg={4}>
                        <div className={classes.card}>
                            <Container mb={10}>
                                <div className={classes.logoContainer} style={{backgroundColor:'#f9d9ea'}}>
                                    <Image src={rent} width={50}/>
                                </div>

                            </Container>
                            <div style={{margin:'10px'}}>
                                <Title order={3}> Rent a home</Title>
                                <Text weight={300} color='#b0afb3' size={18}>
                                    We're creating a seamless experience from search to move-in, with tools and services to help you every step of the way.
                                </Text>

                            </div>
                       </div>
                    </Grid.Col>
                </Grid>
            </div>
        </div>
      </Container>
    </div>
  )
}

export default OurServices
