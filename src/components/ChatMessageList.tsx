import React from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { Box, Button, Flex, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import ScrollToBottom from 'react-scroll-to-bottom';
import useChatStream from '@/hooks/useChatStream';

import { sendChatMessage } from '@/services/chat';
import { ENQUIRY_TAGS } from '@/utils/constants';

import BotMessage from './BotMessage';
import BotTyping from './BotTyping';
import Conditional from './Conditional';
import Error from './Error';
import MessageInput from './MessageInput';
import ScrollButton from './ScrollButton';
import UserMessage from './UserMessage';

import robot from '@/assets/dan-robot.png';

const ChatMessageList: React.FC = () => {

    const { error, mutate, isPending, isSuccess } = useMutation({ 
        mutationFn: sendChatMessage,
    });

    const { data, isFetching, error: fetchError, onAddNewUserMessage } = useChatStream(isSuccess);

    const errorMessage = error ? error.message : fetchError ? fetchError.message : '';

    return ( 
        <Box className='flex flex-col h-full'>
            <Box className="flex-1">           
                <ScrollToBottom className='h-[40rem] w-full'>
                    <Flex className="my-5 bg-white border border-gray-200 rounded-lg p-4 text-gray-600" gap={4} alignItems='start' mx={10}>
                        <Box className='w-12 h-12 rounded-full bg-white flex justify-center items-center'>
                            <Image src={robot} alt='RusselSmith' className='w-9 h-9 object-contain'/>
                        </Box>
                        <Box className='flex-1'>
                            <Heading size='md'>Hi, I'm Dan, RusselSmith's "go-to guy"</Heading>
                            <Text className='text-sm text-left flex-1 mt-1'>I'm here to assist you with any questions that you may have about RusselSmith's services, policies and activities.</Text>
                        </Box>
                        <BsInfoCircle />
                    </Flex>

                    <Conditional isVisible={data.list.length === 0 && !isPending && !isFetching}>
                        <SimpleGrid columns={6} gap={4} m={10}>
                            {ENQUIRY_TAGS.map((tag) => (
                                <Button 
                                    key={tag.label} 
                                    leftIcon={tag.Icon} 
                                    className='border border-gray-200' 
                                    bg='white' 
                                    color='gray.600' 
                                    fontSize='xs' 
                                    textTransform='uppercase'
                                    isLoading={isPending}
                                    onClick={() => mutate({ message: 'Tell me about ' + tag.label})}
                                >
                                    {tag.label}
                                </Button>
                            ))}
                        </SimpleGrid>
                    </Conditional>

                    <Conditional isVisible={data.list.length > 0}>
                        {data.list.map((message) => message.role === 'assistant' 
                            ? <BotMessage key={message.id} message={message} /> 
                            : <UserMessage key={message.id} message={message} />
                        )}
                    </Conditional>

                    <BotTyping isVisible={isFetching} />

                    {errorMessage && <Error error={errorMessage} />}
                    
                    <ScrollButton />
                </ScrollToBottom>
            </Box>
            <Box>
                <MessageInput 
                    isLoading={isPending || isFetching} 
                    onSubmitMessage={(message) => {
                        onAddNewUserMessage(message.message);
                        mutate(message);
                    }} 
                />
            </Box>
        </Box>
    );
};
 
export default ChatMessageList;