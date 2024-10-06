import React, { useCallback, useState } from 'react';

import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputLeftElement, Link as ChakraLink, Stack, Text, InputRightElement, IconButton } from '@chakra-ui/react';
import { PiEye, PiEyeClosed, PiEnvelope, PiPencil } from 'react-icons/pi';
import { BiLock } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useSearchParams } from 'react-router-dom';

import { AuthData, authSchema } from '../utils/schema';
import { login } from '../services/auth';

import useAuthStore from '../store/auth';

const Login: React.FC = () => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [searchParams] = useSearchParams();

    const email = searchParams.get('email') || '';

    const { loginUser } = useAuthStore();
    const { register, formState, handleSubmit } = useForm<AuthData>({
        resolver: zodResolver(authSchema),
        mode: 'all',
        defaultValues: {
            email,
            password: ''
        }
    });

    const onLogin = async (data: AuthData) => {
        const token = await login(data);
        if (!token) return;

        loginUser(token);

        window.location.href = '/dashboard';
    };

    const handlePasswordToggle = useCallback(() => {
        setPasswordVisible((previous) => !previous);
    }, []);

    return ( 
        <Flex className='p-4 w-dvw h-dvh bg-gray-50' justify='center' align='center'>
            <Box className='bg-white rounded-md border border-gray-300 max-w-96'>
                <form id='login-form' className='p-8' onSubmit={handleSubmit(onLogin)}>
                    <Heading color='black' textAlign='center' fontSize='3xl'>Enter your password</Heading>
                    
                    <Stack spacing={4}>
                        <FormControl mt={7} isInvalid={!!formState.errors.email}>
                            <InputGroup variant='outline' borderColor='gray.200' size='lg' rounded={2}>
                                <InputLeftElement pointerEvents='none'>
                                    <PiEnvelope color='gray' />
                                </InputLeftElement>
                                <Input 
                                    placeholder='Enter Email Address'
                                    _placeholder={{ fontSize: 'sm' }} 
                                    color='black' fontSize='small' 
                                    readOnly={!!email}
                                    {...register('email')} 
                                />
                                <InputRightElement>
                                    <Button as={Link} bg='gray.50' to='/' size='sm'>
                                        <PiPencil color='gray' />
                                    </Button>
                                </InputRightElement>
                            </InputGroup>

                            {formState.errors.email && <FormErrorMessage color='red'>{formState.errors.email.message}</FormErrorMessage>}
                        </FormControl>
                        
                        <FormControl isInvalid={!!formState.errors.password}>
                            <FormLabel color='black' fontSize='medium'>Password:</FormLabel>
                            
                            <InputGroup variant='outline' borderColor='gray.200' size='lg' rounded={2}>
                                <InputLeftElement pointerEvents='none'>
                                    <BiLock color='gray' />
                                </InputLeftElement>
                                <Input 
                                    {...register('password')}
                                    autoFocus={!!email}
                                    placeholder='Enter Password' 
                                    color='black' 
                                    fontSize='small'  
                                    type={isPasswordVisible ? 'text' : 'password'} 
                                    _placeholder={{ fontSize: 'sm' }} 
                                    _hover={{ borderColor: 'blue.100' }} 
                                />
                                <InputRightElement width='4.5rem'>
                                    <IconButton
                                        colorScheme='gray'
                                        aria-label='Password Display' 
                                        onClick={handlePasswordToggle}
                                        size='md'
                                        icon={isPasswordVisible ? <PiEyeClosed color='gray' /> : <PiEye color='gray' />}
                                    />
                                </InputRightElement>
                            </InputGroup>

                            {formState.errors.password && <FormErrorMessage>{formState.errors.password.message}</FormErrorMessage>}
                        </FormControl>
                    </Stack>

                    <Button isDisabled={!formState.isValid} bg='blue.600' _hover={{ bg: 'blue.300' }} form='login-form' type='submit' mt={8} p={4} className='w-full' size='4' isLoading={formState.isSubmitting}>
                        Login
                    </Button>
                </form>

                <Box className='border-t border-gray-300 p-7 text-center' mt={4}>
                    <Text className='text-black' fontSize='small' fontWeight='500'>Dont't have an account? <ChakraLink as={Link} to='/register' color='blue.600'>Create a new account</ChakraLink></Text>
                </Box>
            </Box>
        </Flex>
    );
};
 
export default Login;