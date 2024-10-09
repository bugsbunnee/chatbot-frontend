import React, { useCallback } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { Box, Button, Flex, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import ScrollToBottom from 'react-scroll-to-bottom';
import useChatStream from '@/hooks/useChatStream';

import { sendChatMessage } from '@/services/chat';
import { ENQUIRY_TAGS, QUICK_ACTIONS } from '@/utils/constants';

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

    const handleAskChatbotMessage = useCallback((message: { message: string }) => {
        onAddNewUserMessage(message.message);
        mutate(message);
    }, [onAddNewUserMessage, mutate]);

    const isLoading = isPending || isFetching;
    const errorMessage = error ? error.message : fetchError ? fetchError.message : '';

    return ( 
        <Box className='flex flex-col h-full overflow-hidden'>
            <Box className="flex-1">           
                <ScrollToBottom className='h-[35rem] w-full'>
                    <Flex className="my-5 bg-white border border-gray-200 rounded-lg p-4 text-gray-600" gap={4} alignItems='start' mx={10}>
                        <Box className='w-12 h-12 rounded-full bg-white flex justify-center items-center'>
                            <Image src={robot} alt='RusselSmith' className='w-16 h-16 object-contain'/>
                        </Box>
                        <Box className='flex-1'>
                            <Heading size='lg' className='text-[#235681]'>Hi, I'm Dan, RusselSmith's "go-to guy"</Heading>
                            <Text className='text-lg text-left flex-1 max-w-3xl mt-1 leading-5'>I'm here to assist you with any questions that you may have about RusselSmith's services, policies and activities.</Text>
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
                                    isLoading={isLoading}
                                    onClick={() => handleAskChatbotMessage({ message: 'Tell me about ' + tag.label})}
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
            <Box px={10} className='border-t border-gray-300'>
                <Conditional isVisible>
                    <SimpleGrid columns={4} gap={4} my={7}>
                        <Flex alignItems='center' fontWeight='semibold' gap={4} className='text-black'>
                            <BsInfoCircle />
                            <Text>Quick Actions:</Text>
                        </Flex>
                        {QUICK_ACTIONS.map((tag) => (
                            <Button 
                                key={tag.label} 
                                leftIcon={tag.Icon} 
                                bg='#235681'
                                fontSize='xs' 
                                rounded={100}
                                _hover={{ background: '#235681' }}
                                textTransform='uppercase'
                                isLoading={isLoading}
                                onClick={() => handleAskChatbotMessage({ message: tag.prompt })}
                            >
                                {tag.label}
                            </Button>
                        ))}
                    </SimpleGrid>
                </Conditional>

                <MessageInput 
                    isLoading={isPending || isFetching} 
                    onSubmitMessage={handleAskChatbotMessage} 
                />
            </Box>
        </Box>
    );
};
 
export default ChatMessageList;