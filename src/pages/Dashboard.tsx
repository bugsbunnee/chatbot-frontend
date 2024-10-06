import React from 'react';

import { Avatar, Box, Flex, Grid, GridItem, Heading, Show, Stack, Text } from '@chakra-ui/react';
import { Navigate, Outlet } from 'react-router-dom';

import useAuthStore from '../store/auth';
import NavBar from '@/components/NavBar';

const Dashboard: React.FC = () => {
    const authStore = useAuthStore();
    if (!authStore.user) return <Navigate to='/' />;

    const fullName = `${authStore.user.firstName} ${authStore.user.lastName}`;

    return ( 
        <Grid
            className='w-dvw h-dvh'
            overflow="hidden"
            templateAreas={{
                base: `"main"`,
                lg: `"aside main"`,
            }}
            templateColumns={{
                base: '1fr',
                lg: `10rem 1fr`,
            }}
        >
            <Show above="lg">
                <GridItem area="aside">
                    <NavBar />
                </GridItem>
            </Show>

            <GridItem area="main" className='bg-gray-50 h-dvh flex flex-col' overflowY='scroll'>
                <Flex bg='white' className='w-full min-h-20 px-8 border-b border-gray-200 sticky top-0 z-50' align='center' justify='end'>
                    <Flex align='center' gap={3}>
                        <Avatar name={fullName} size='sm' />
                        <Stack spacing={0}>
                            <Heading fontSize='small' color='black' textTransform='capitalize'>
                                {fullName}
                            </Heading>

                            <Text color='gray' fontSize='small'>
                                {authStore.user.email}
                            </Text>
                        </Stack>
                    </Flex>
                </Flex>

                <Box py={5} px={40} className='flex-1'>
                    <Outlet />
                </Box>

                <footer className='min-h-20 bg-white flex items-center px-6 border-t border-gray-200 text-gray-600 text-xs'>
                    @ Copyright RusselSmith Group
                </footer>
            </GridItem>
        </Grid>
    );
};
 
export default Dashboard;