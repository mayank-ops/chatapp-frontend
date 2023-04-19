import React, { useEffect, useState } from 'react'
import { Container, Box, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useHistory } from 'react-router-dom';

function Homepage()
{
    const history = useHistory();

    useEffect(() =>
    {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) history.push("/chats");
    }, [history])

    return (
        <Container maxW='xl' centerContent>
            <Box
                d="flex"
                justifyContent="center"
                p={3}
                bg="white"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="4xl" fontFamily="cursive" color='black'>
                    ChatApp
                </Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" color='black'>
                <Tabs variant='soft-rounded'>
                    <TabList marginBottom='1px'>
                        <Tab width='50%'>Login</Tab>
                        <Tab width='50%'>Sign up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Homepage