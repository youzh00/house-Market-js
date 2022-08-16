import { useState } from 'react';
import { Modal, Button, Group, useMantineTheme, MantineProvider } from '@mantine/core';
import Auth from './Auth';
import { useToggle } from "@mantine/hooks";


export default function AuthModal() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const [type, toggle] = useToggle(["login", "register"]);
  const [title, setTitle] = useState("login");

  return (
    <>
      <Modal
        color='black'
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
      >
        {/* Modal content */}

        <Auth type={type} toggle={toggle} setTitle={setTitle} />

      </Modal>

      <MantineProvider theme={{
      colors: {
        brand: ['#BA0225'],
      },
      primaryColor: 'brand',
      }}>
          <Group position="center" color='#BA0225'>
             <Button onClick={() => setOpened(true)} color={theme.colors.red[3]}>Get Started</Button>
          </Group>
     </MantineProvider>
      
    </>
  );
}