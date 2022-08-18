import { useToggle, upperFirst } from '@mantine/hooks';
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
  Alert,
  Container,
} from '@mantine/core';
import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user/authSlice";
import { clearMessage } from "../features/user/messageSlice";
import { IconAlertCircle } from '@tabler/icons';

export default function Login({toggle,setTitle}) {
  const type='login'
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 8 ? 'Password should include at least 8 characters' : null),
    },
  });
  
  const handleFormSubmit =(e) => {
    e.preventDefault();
    console.log('Form submission')
    const {email, password} =form.values;
    dispatch(login({ email, password }))
  }
  console.log(form.values.email)
  console.log(form.values.password)
  console.log("This is the message from backend",message)
  return (
    <Paper radius="md" p="xl" >
      <Text size="lg" weight={500}>
        Welcome to Aji-Tesken, login with
      </Text>

      <Divider labelPosition="center" my="lg" />

      <form onSubmit={(e)=>handleFormSubmit(e)}>
       
         <Stack>
         <TextInput
           required
           label="Email"
           placeholder="Your email"
           value={form.values.email}
           onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
           error={form.errors.email && 'Invalid email'}
         />

         <PasswordInput
           required
           label="Password"
           placeholder="Your password"
           value={form.values.password}
           onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
           error={form.errors.password && 'Password should include at least 6 characters'}
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
            "Don't have an account? Register"
          </Anchor>
          <Button type="submit" color={'violet'}>{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
}