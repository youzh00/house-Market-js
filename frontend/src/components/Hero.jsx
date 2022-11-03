import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
    TextInput, TextInputProps, ActionIcon, useMantineTheme
  } from '@mantine/core';
  import { IconCheck, IconSearch, IconArrowRight, IconArrowLeft  } from '@tabler/icons';
  import { useNavigate } from 'react-router';
  import image from '../Assets/hero2.png';
  
  const useStyles = createStyles((theme) => ({
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing.xl * 4,
      paddingBottom: theme.spacing.xl * 3,
    },
  
    content: {
      maxWidth: 480,
      marginRight: theme.spacing.xl * 3,
  
      [theme.fn.smallerThan('md')]: {
        maxWidth: '100%',
        marginRight: 0,
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: 50,
      lineHeight: 1.2,
      fontWeight: 900,
  
      [theme.fn.smallerThan('xs')]: {
        fontSize: 28,
      },
    },
  
    control: {
      [theme.fn.smallerThan('xs')]: {
        flex: 1,
      },
    },
  
    image: {
      flex: 1,
  
      [theme.fn.smallerThan('md')]: {
        display: 'none',
      },
    },
  
    highlight: {
      position: 'relative',
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      borderRadius: theme.radius.sm,
      padding: '4px 12px',
    },
  }));

  //------------------------------------------------- Component -----------------------------------------------------//
  //------------------------------------------------- Component -----------------------------------------------------//
  //------------------------------------------------- Component -----------------------------------------------------//
  
  export default function Hero() {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    const navigate=useNavigate();

    const handleGetStarted=()=>navigate('/auth/login')
    return (
      <div   style={{backgroundColor:'#eafcfc',height:'100%'}} >
        <Container style={{backgroundColor:"#eafcfc", }}  >
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title} >
                Let's <Text color="red" inherit component="span">Find</Text> Your Dream House
                {/* Find out a place you'll love to Live */}
              </Title>
              <Text color="dimmed" mt="md" size={20}>
               Find out a place you'll love to live with the most complete source of homes for sale & real estate near you
              </Text>
              <List mt={30} spacing="sm" size="sm"
                    icon={
                        <ThemeIcon size={20} radius="xl" color='red'>
                            <IconCheck size={12} stroke={1.5} />
                        </ThemeIcon>
                }>           
                <List.Item>
                    <b>To the point</b> 
                </List.Item>
                <List.Item>
                  <b>Free and easy to use</b> 
                </List.Item>
                <List.Item>
                  <b>No annoying focus ring</b>
                </List.Item>
              </List>
              <Group mt={35}>
                <Button radius="xl" size="md" className={classes.control} color='red' onClick={handleGetStarted}>
                  Get started
                </Button>
              </Group>
            </div>
            <Image src={image} className={classes.image} width={550} />

          </div>
        </Container>
      </div>
    );
  }