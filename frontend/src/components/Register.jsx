import { useToggle, upperFirst, useId } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
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
import { register } from "../features/user/authSlice";
import { clearMessage } from "../features/user/messageSlice";
import { IconAlertCircle } from '@tabler/icons';
//*--------------------------------------------------------------------------------------------------------------//
//*---------------------------------------------- Component -----------------------------------------------------//
//*--------------------------------------------------------------------------------------------------------------//

export default function Register({toggle,setTitle}) {
  const id = useId();
  const type ='register';
  const { message } = useSelector((state) => state.message);
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  
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
    setSuccessful(false);
    dispatch(register(data)).unwrap()
    .then(() => {
      setSuccessful(true);
    })
    .catch(() => {
      setSuccessful(false);
    });
    console.log("This is a registration data from  register screen :", data);
  }
  return (
    <Paper radius="md" p="xl" >
      <Text size="lg" weight={500}>
        Welcome to Aji-Tesken, {type} with
      </Text>
      <Divider labelPosition="center" my="lg" />

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
        {message &&
          <div style={{ marginTop: '10px' }}>
            <Alert icon={<IconAlertCircle size={16} />} title={`${message}`} color="red"/>
          </div>
  
       }

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            'Already have an account? Login'
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
}