import { useToggle, upperFirst, useId } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    createStyles,
    Title,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
    NumberInput,
    Textarea,
    Input,
    Alert,
} from '@mantine/core';
import InputMask from 'react-input-mask';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconAlertCircle } from '@tabler/icons';
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
//---------------------------------------------- Component Logic --------------------------------------------------//
//---------------------------------------------- Component Logic --------------------------------------------------//
//---------------------------------------------- Component Logic --------------------------------------------------//
//---------------------------------------------- Component Logic --------------------------------------------------//
//---------------------------------------------- Component Logic --------------------------------------------------//
export default function Register() {
    const { classes } = useStyles();
    const id = useId();
    const dispatch = useDispatch();
  

    
    const form = useForm({
      initialValues: {
        email: '',
        name: '',
        password: '',
        phoneNumber:'',
        address:'',
        age:18,
        bio:''
      },
  
      validate: {
        email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        password: (val) => (val.length <= 8 ? 'Password should include at least 8 characters' : null),
      },
    });
  
    const onSubmit=(e)=>{
      e.preventDefault();
      const data={
        email:form.values.email,
        userName: form.values.name,
        password: form.values.password,
        address: form.values.address,
        age: form.values.age,
        bio: form.values.bio,
        phoneNumber: form.values.phoneNumber,
      }
    
      console.log("This is a registration data from  register screen :", data);
    }
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
        <form onSubmit={(e)=>onSubmit(e)}>
        <Stack>
          <TextInput
              label="Name"
              required
              placeholder="Your name"
              radius="md"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
          />

          <TextInput
            required
            label="Email"
            placeholder="Your email"
            radius="md"

            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
          />

          
          <NumberInput
            defaultValue={18}
            placeholder="Your age"
            label="Your age"
            radius="md"
            required
            value={form.values.age}
            onChange={(val) => form.setFieldValue('age',val)}
          />

          <TextInput
            required
            radius="md"
            label="Address"
            placeholder="Your address"
            value={form.values.address}
            onChange={(event) => form.setFieldValue('address', event.currentTarget.value)}
          />

          <Input.Wrapper id={id} label="Your phone" required >
              <Input component={InputMask} mask="+212 (99) 99-99-99-99" id={id} placeholder="Your phone number" 
                          onChange={(event) => form.setFieldValue('phoneNumber', event.currentTarget.value)}/>
          </Input.Wrapper>
          
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            radius="md"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
          />
          <Textarea
            required
            label="Bio"
            radius="md"
            placeholder="Your bio"
            value={form.values.bio}
            onChange={(event) => form.setFieldValue('bio', event.currentTarget.value)}
          />
          
        </Stack>
        {/* {message &&
          <div style={{ marginTop: '10px' }}>
            <Alert icon={<IconAlertCircle size={16} />} title={`${message}`} color="red"/>
          </div>
  
       } */}

        <Text align="center" mt="md">
            You already have an account?{' '}
            <Anchor href="#" weight={700} onClick={(event) => event.preventDefault()}>
              Login
            </Anchor>
        </Text>
        <Button fullWidth mt="xl" size="md" type='submit'> Register </Button>

      </form>
        </Paper>
      </div>
    );
  }