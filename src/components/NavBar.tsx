import React from 'react';
import useAuthStore from '../store/auth';

import { Box, Flex, Link as ChakraLink, Stack, Text, Image, Center } from '@chakra-ui/react';
import { BiLogOutCircle, BiSolidDashboard } from 'react-icons/bi';
import { Link, Navigate } from 'react-router-dom';

import logo from '@/assets/logo-white.png';

const routes = [
    {
        label: 'Home',
        route: '/dashboard',
        Icon: BiSolidDashboard,
    },
];

const NavBar: React.FC = () => {
    const auth = useAuthStore();
    if (!auth.user) return <Navigate to='/' />;

    return ( 
        <Box className="w-full flex flex-col h-dvh bg-[#235681] bg-[url('./assets/bg.png')] z-20 relative">
            <Center className='h-32'>
                <Image src={logo} alt='RusselSmith' className='w-20 h-20 object-contain'/>
            </Center>

            {routes.map((route) => (
                <ChakraLink as={Link} key={route.label} color='white' className='hover:no-underline' to={route.route}>
                    <Stack align='center' justify='center' spacing={3} className='h-40 w-full hover:bg-gray-800 transition-all duration-300'>
                        <Flex justify='center' align='center'>
                            {<route.Icon size={30}  />}
                        </Flex>
                        <Text mt={2} fontSize='xs' textTransform='uppercase' textAlign='center'>{route.label}</Text>
                    </Stack>
                </ChakraLink>
            ))}

            <ChakraLink mt='auto' as={Link} color='white' className='hover:no-underline' to='/dashboard/logout'>
                <Stack  align='center' justify='center' spacing={3} className='h-40 w-full hover:bg-gray-800 transition-all duration-300'>
                    <Flex justify='center' align='center'>
                        {<BiLogOutCircle size={30}  />}
                    </Flex>
                    <Text mt={2} fontSize='xs' textTransform='uppercase' textAlign='center'>Logout</Text>
                </Stack>
            </ChakraLink>
        </Box>
     );
}
 
export default NavBar;