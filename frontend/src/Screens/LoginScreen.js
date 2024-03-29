import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Text,
    Anchor,
    Alert,
    Checkbox,
  } from '@mantine/core';
  
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice'
import { useLoginMutation } from '../features/auth/authApiSlice'
import { IconAlertCircle } from '@tabler/icons';
import usePersist from '../hooks/usePersist';

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
  export function LoginScreen() {

    const { classes } = useStyles();
    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    console.log(persist)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login,{isLoading}] = useLoginMutation()
    

    useEffect(()=>{
      userRef.current.focus()
    },[])

    useEffect(()=>{
      setErrMsg('')
    },[email,pwd])

    const handleSubmit=async(e)=>{
      e.preventDefault()
      try {
        const userData = await login({ email, password:pwd }).unwrap()
        dispatch(setCredentials({ ...userData }))
        setEmail('')
        setPwd('')
        navigate('/houses')
    } catch (err) {
      console.log(err.status)
        if (!err?.status) {
            // isLoading: true  until timeout occurs
            setErrMsg('No Server Response');
        } else if (err.status === 400) {
            setErrMsg('Missing Email or Password');
        } else if (err.status === 401) {
            setErrMsg('Unauthorized: Invalid Email or Password');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
    }

    const handleEmailInput = (e) => setEmail(e.target.value)

    const handlePwdInput = (e) => setPwd(e.target.value)

    const handleToggle = () => setPersist(prev => !prev)

    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
            Welcome to <Text color="red" inherit component="span">FindHome</Text>
          </Title>
          <form onSubmit={handleSubmit}>

            <TextInput label="Email address" placeholder="hello@gmail.com" size="md" ref={userRef}  value={email} onChange={handleEmailInput}/>
            <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" value={pwd} onChange={handlePwdInput}/>
            <Checkbox label="Keep me logged in" mt="xl" size="md" onChange={handleToggle} checked={persist}/>

            {errMsg &&
                <div style={{ marginTop: '10px' }}>
                  <Alert icon={<IconAlertCircle size={16} />} title={`${errMsg}`} color="red" ref={errRef}/>
                </div>
            }
            <Button fullWidth mt="xl" size="md" type='submit'>
              Login
            </Button>
          </form>
  
          <Text align="center" mt="md">
            Don&apos;t have an account?{' '}
            <Anchor href="#" weight={700} onClick={(event) => navigate('/auth/register')}>
              Register
            </Anchor>
          </Text>
        </Paper>
      </div>
    );
  }