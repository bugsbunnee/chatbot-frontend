import React from 'react';

import { Box, Button, Flex, FormControl, FormErrorMessage, Heading, Input, InputGroup, InputLeftElement, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { BiEnvelope } from 'react-icons/bi';

import { EmailData, emailSchema } from '../utils/schema';
import { initializeLogin } from '../services/auth';

import toast from 'react-hot-toast';

const InitializeLogin: React.FC = () => {
    const navigate = useNavigate();

    const { register, formState, handleSubmit, setError } = useForm<EmailData>({
        resolver: zodResolver(emailSchema),
        mode: 'all'
    });

    const onSubmit = async (data: EmailData) => {
        const response = await initializeLogin(data);
        if (response.isError) {
            toast.error(response.message);
            setError('email', { type: 'custom', message: response.message });
            
            return;
        }

        const searchParams = createSearchParams({ email: data.email }).toString();
        if (response.isValid) return navigate({ pathname: '/register', search: searchParams });

        return navigate({ pathname: '/login', search: searchParams });
    };

    return ( 
        <Flex className='p-4 w-dvw h-dvh bg-gray-50' justify='center' align='center'>
            <Box className='bg-white rounded-md border border-gray-300 max-w-96'>
                <form id='initialize-login-form' className='p-8' onSubmit={handleSubmit(onSubmit)}>
                    <Heading color='black' textAlign='center'>Welcome back</Heading>

                    <Stack spacing={4}>
                        <FormControl mt={7} isInvalid={!!formState.errors.email}>
                            <InputGroup variant='outline' borderColor='gray.200' size='lg' rounded={2}>
                                <InputLeftElement pointerEvents='none'>
                                    <BiEnvelope color='gray' />
                                </InputLeftElement>
                                <Input placeholder='Enter Email Address' _placeholder={{ fontSize: 'sm' }} color='black' fontSize='small' {...register('email')} />
                            </InputGroup>

                            {formState.errors.email && <FormErrorMessage color='red'>{formState.errors.email.message}</FormErrorMessage>}
                        </FormControl>
                    </Stack>

                    <Button isDisabled={!formState.isValid} bg='blue.600' _hover={{ bg: 'blue.300' }} form='initialize-login-form' type='submit' mt={8} p={4} className='w-full' size='4' isLoading={formState.isSubmitting}>
                       Continue
                    </Button>
                </form>

                <Box className='border-t border-gray-300 p-7 text-center' mt={4}>
                    <Text className='text-black' fontSize='small' fontWeight='500'>Dont't have an account? <ChakraLink as={Link} to='/register' color='blue.600'>Create a new account</ChakraLink></Text>
                </Box>
            </Box>
        </Flex>
    );
};
 
export default InitializeLogin;