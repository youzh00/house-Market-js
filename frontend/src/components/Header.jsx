import { useState } from 'react';
import {
  createStyles,Container,Avatar,UnstyledButton,
  Group,Text,Menu,Tabs, Image, Badge, MantineProvider, Button,
} from '@mantine/core';
import {
  IconLogout,IconStar,IconSettings,
  IconTrash,IconChevronDown, IconUserCircle,  IconHome2,
} from '@tabler/icons';
import {  useSelector } from "react-redux";
// import { logOut } from "../features/auth/authSlice";
import { useNavigate } from 'react-router';
import {selectCurrentUser} from '../features/auth/authSlice'
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
//*---------------------------------------------- Style -----------------------------------------------------//
const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.fn.variant({ variant: 'filled', color: "red" }).background,
    borderBottom: `1px solid ${
      theme.fn.variant({ variant: 'filled', color: 'red' }).background
    }`,
 },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.white,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: 'red' }).background,
        0.1
      ),
    },

    [theme.fn.smallerThan('xs')]: {
      // display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: 'red' }).background,
      0.1
    ),
  },

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      // display: 'none',
      marginLeft:"10px"
    },
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  tab: {
    fontWeight: 500,
    height: 38,
    color: theme.white,
    backgroundColor: 'transparent',
    borderColor: theme.fn.variant({ variant: 'filled', color: 'red' }).background,

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: 'red' }).background,
        0.1
      ),
    },

    '&[data-active]': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: 'red' }).background,
        0.1
      ),
      borderColor: theme.fn.variant({ variant: 'filled', color: 'red' }).background,
    },
  },
}));

//*--------------------------------------------------------------------------------------------------------------//
//*---------------------------------------------- Component -----------------------------------------------------//
//*--------------------------------------------------------------------------------------------------------------//


export function Header( ) {
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const tabs=["Buy", "Rent","Sale","Help"]
  

  const navigate=useNavigate();

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useSendLogoutMutation()
  
  const currentUser =useSelector(selectCurrentUser)
  

  const handleProfileClick=()=>navigate('/me/profile')

  const handleGetStarted=()=>navigate('/auth/login')

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  const avatar = (
    <Avatar
      alt="Avatar for badge"
    >
        <IconHome2 size={24} /> 
    </Avatar>
  );
  return (
    
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
        <Badge  size="lg"  color="red" radius="sm" >House Market Place</Badge>
        {currentUser ?(
              <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })} 
              >
                <Group spacing={7}>
                  <Avatar  src={`http://localhost:3000${currentUser.avatar}`} alt='userProfilePicture' radius="xl" size={20} color="indigo" />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1, color: theme.white }} mr={3}>
                    {currentUser.userName}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconStar size={14} stroke={1.5} color={theme.colors.yellow[6]} />}>
                Saved posts
              </Menu.Item>
              <Menu.Item icon={<IconUserCircle size={14} stroke={1.5} color={theme.colors.blue[6]} />} onClick={()=>handleProfileClick()}>
                Profile
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>Account settings</Menu.Item>
              <Menu.Item icon={<IconLogout size={14} stroke={1.5} />} onClick={sendLogout}>Logout</Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item color="red" icon={<IconTrash size={14} stroke={1.5} />}>
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu> 
            ): 
            (
              <MantineProvider theme={{
                colors: {
                  brand: ['#BA0225'],
                },
                primaryColor: 'brand',
                }}>
                    <Group position="center" color='#BA0225'>
                       <Button onClick={handleGetStarted}  style={{backgroundColor:'#BA0225'}} >Get Started</Button>
                    </Group>
               </MantineProvider>
            )
          }
          

           
        </Group>
      </Container>
      <Container>
        <Tabs
          variant="outline"
          classNames={{
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
      
    </div>
   
  );
}