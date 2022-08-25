import { Container, Center,Avatar, Text,  Paper, Spoiler, Divider, Box  } from '@mantine/core';
import {MdOutlineAlternateEmail,MdPhone,MdInfo} from 'react-icons/md'
import {BsInfoCircle} from 'react-icons/bs'

import React from 'react'

const UserData = ({currentUser}) => {
  return (
    <Container>
      <Paper
          radius="md"
          withBorder
          p="lg"
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
          })}
           mt={20}
          >     
            <Avatar src={`http://localhost:3000${currentUser.user.avatar}`} size='xl' radius={10} mx="auto" />
            <Text align="center" size="lg" weight={500} mt="md">
                  {currentUser.user.userName.toUpperCase()}  
            </Text>  
            <Center Inline style={{display:'block'}}>
              <Center Inline my={20}>
                    <Text align="center">
                        {currentUser.user.bio}
                    </Text>
              </Center>
              <Divider m={10}  
                label={
                    <Center>
                        <BsInfoCircle size={19}/>
                        <Box ml={5}  style={{fontSize:'15px'}}>For Contact infos</Box>
                    </Center>} labelPosition="center" />
              <Center Inline mt={15} mb={5}>
                <MdOutlineAlternateEmail size={20}/>
                <Text align="center" color="black" size="md" ml={5}>{currentUser.user.email} </Text>
              </Center>
              <Center Inline mb={10}>
                <MdPhone size={20}/>
                <Text align="center" color="black" size="md" ml={5}>{currentUser.user.phoneNumber} </Text>
              </Center>
              
            </Center>
                    
        </Paper>
    </Container>
  )
}

export default UserData
