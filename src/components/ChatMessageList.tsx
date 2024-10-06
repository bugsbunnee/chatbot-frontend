import React from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react';
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

const ChatMessageList: React.FC = () => {
    const { error, mutate, isPending, isSuccess } = useMutation({ mutationFn: sendChatMessage });
    const { data, isFetching, error: fetchError } = useChatStream(isSuccess);

    const errorMessage = error ? error.message : fetchError ? fetchError.message : '';

    return ( 
        <Box className='flex flex-col h-full'>
            <Box className="flex-1">           
                <ScrollToBottom className='h-[40rem] w-full'>
                    <Box className="my-5 bg-white border border-gray-200 rounded-lg p-4 text-gray-600 flex flex-row items-center gap-4 ">
                        <Text className='text-sm text-left flex-1'>We are here to assist you. You can also send us an email - info@russelsmithgroup.com</Text>
                        <BsInfoCircle />
                    </Box>

                    <Conditional isVisible={data.list.length === 0 && !isPending && !isFetching}>
                        <SimpleGrid columns={6} gap={4} my={10}>
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
                <MessageInput isLoading={isPending || isFetching} onSubmitMessage={(message) => mutate(message)} />
            </Box>
        </Box>
    );
};
 
export default ChatMessageList;