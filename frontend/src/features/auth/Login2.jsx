import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
  } from '@mantine/core';
  
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

  const useStyles = createStyles((theme) => ({
    wrapper: {
      minHeight: 900,
      backgroundSize: 'cover',
      backgroundImage:
        'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
    },
  
    form: {
      borderRight: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
      minHeight: 900,
      maxWidth: 450,
      paddingTop: 80,
  
      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        maxWidth: '100%',
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  
    logo: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      width: 120,
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));
//*---------------------------------------------- Component Logic --------------------------------------------------*//
  export function AuthenticationImage() {
    const { classes } = useStyles();
    const userRef = useRef(null)
    const errRef = useRef(null)
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login,{isLoading}] = useLoginMutation()

    // useEffect(()=>{
    //   userRef.current.focus()
    // },[])

    useEffect(()=>{
      setErrMsg('')
    },[email,pwd])

    const handleSubmit=async()=>{
      console.log('handleSubmit')
      try {
        const userData = await login({ email, pwd }).unwrap()
        console.log(userData);
        dispatch(setCredentials({ ...userData, email }))
        setEmail('')
        setPwd('')
        navigate('/welcome')
    } catch (err) {
        if (!err?.originalStatus) {
            // isLoading: true until timeout occurs
            setErrMsg('No Server Response');
        } else if (err.originalStatus === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.originalStatus === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        // errRef.current.focus();
    }
    }

    const handleEmailInput = (e) => {
      console.log(e.target.value);
      setEmail(e.target.value)
    }

    const handlePwdInput = (e) => {
      console.log(e.target.value);
      setPwd(e.target.value)
    }

    
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
            Welcome back to Mantine!
          </Title>
          <form onSubmit={handleSubmit}>

            <TextInput label="Email address" placeholder="hello@gmail.com" size="md" onChange={handleEmailInput}/>
            <PasswordInput label="Password" placeholder="Your password" mt="md" size="md"  onChange={handlePwdInput}/>
            <Checkbox label="Keep me logged in" mt="xl" size="md" />
            <Button fullWidth mt="xl" size="md" type='submit'>
              Login
            </Button>
          </form>
  
          <Text align="center" mt="md">
            Don&apos;t have an account?{' '}
            <Anchor href="#" weight={700} onClick={(event) => event.preventDefault()}>
              Register
            </Anchor>
          </Text>
        </Paper>
      </div>
    );
  }