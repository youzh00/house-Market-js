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
  NumberInput,
  Textarea,
} from '@mantine/core';

export default function Register({toggle,setTitle}) {
  const type ='register';
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
      name: form.values.name,
      password: form.values.password,
      address: form.values.address,
      age: form.values.age,
      bio: form.values.bio,
      phoneNumber: form.values.phoneNumber,
      terms:true
    }
    console.log(data);
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

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            radius="md"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
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

          <Textarea
            required
            label="Bio"
            radius="md"
            placeholder="Your bio"
            value={form.values.bio}
            onChange={(event) => form.setFieldValue('bio', event.currentTarget.value)}
          />

          <Checkbox
            label="I accept terms and conditions"
            checked={form.values.terms}
            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
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
            'Already have an account? Login'
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
}