import { useState,lazy } from 'react';
import {
  createStyles,Container,Avatar,UnstyledButton,
  Group,Text,Menu,Tabs, Image,
} from '@mantine/core';
import {
  IconLogout,IconHeart,IconStar,IconMessage,IconSettings,
  IconPlayerPause,IconTrash,IconSwitchHorizontal,IconChevronDown,
} from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';
import AuthModal from './AuthModal';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/authSlice";
import defaultPic from '../userPic/sample.png'
//*---------------------------------------------- Style -----------------------------------------------------//
const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.fn.variant({ variant: 'filled', color: "red" }).background,
    borderBottom: `1px solid ${
      theme.fn.variant({ variant: 'filled', color: 'red' }).background
    }`,
    marginBottom: 120,
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
  const tabs=["Home", "About", "Contact"]
  const dispatch = useDispatch();
  
  const { isLoggedIn,user:currentUser } = useSelector((state) => state.auth);
  
  const userPicExist=false;
  if(currentUser && !currentUser.user.avatar.includes("sample")) {
    userPicExist = true;
  }
  const userPic=!userPicExist && defaultPic 
  const handleLogout=(e)=>{
    dispatch(logout())
  }
  const pic='../userPic/avatar-1660828500084.jpg'

  console.log(userPic)
  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <MantineLogo size={28} inverted />
          {
            isLoggedIn ?(
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
                  <Avatar  alt={userPic} radius="xl" size={20} color="indigo" />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1, color: theme.white }} mr={3}>
                    {currentUser.user.userName}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconHeart size={14} stroke={1.5} color={theme.colors.red[6]} />}>
                Liked posts
              </Menu.Item>
              <Menu.Item icon={<IconStar size={14} stroke={1.5} color={theme.colors.yellow[6]} />}>
                Saved posts
              </Menu.Item>
              <Menu.Item icon={<IconMessage size={14} stroke={1.5} color={theme.colors.blue[6]} />}>
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>Account settings</Menu.Item>
              <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
                Change account
              </Menu.Item>
              <Menu.Item icon={<IconLogout size={14} stroke={1.5} />} onClick={(e)=>handleLogout(e)}>Logout</Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item icon={<IconPlayerPause size={14} stroke={1.5} />}>
                Pause subscription
              </Menu.Item>
              <Menu.Item color="red" icon={<IconTrash size={14} stroke={1.5} />}>
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu> 
            ): <AuthModal/>
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