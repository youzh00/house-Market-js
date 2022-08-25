import { SimpleGrid,Container, Input, Title, Center, Grid, Col, createStyles } from '@mantine/core';
import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { Avatar, Text, Button, Paper } from '@mantine/core';
import { IconAt } from '@tabler/icons';
import {MdOutlineAlternateEmail,MdPhone} from 'react-icons/md'
import UserData from '../components/UserData';


const useStyles = createStyles((theme)=>({
  wrapper:{
    padding: `0 ${theme.spacing.xl}px `,
    marginTop: 70,
    display: "flex",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
  }
}))
const ProfileScreen = () => {
    const {classes}=useStyles()
    const navigate = useNavigate()
    const { user: currentUser } = useSelector((state) => state.auth);
    if(!currentUser){
        navigate("/")
    }
  return (
    <Container fluid={true}>
    <Grid>
        
        <Grid.Col   xs={12} lg={4}>     
          <UserData currentUser={currentUser}/>
        </Grid.Col>
        
        <Grid.Col   xs={12} lg={8}>   
          <UserData currentUser={currentUser}/>
        </Grid.Col>
    
    </Grid>
    </Container>
  )
}

export default ProfileScreen




{/* <SimpleGrid
        cols={2}
        spacing="0"
        breakpoints={[
          { maxWidth: "md", cols: 1, spacing: "md" },
        ]}
        className={classes.wrapper}
      >
       <UserData currentUser={currentUser}/>
       <UserData currentUser={currentUser}/>
      </SimpleGrid> */}