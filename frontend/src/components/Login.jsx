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
} from '@mantine/core';

export default function Login({toggle,setTitle}) {
  const type='login'
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

  console.log(form.values.email)
  console.log(form.values.password)
  return (
    <Paper radius="md" p="xl" >
      <Text size="lg" weight={500}>
        Welcome to Mantine, login with
      </Text>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
       
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
       
        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
}