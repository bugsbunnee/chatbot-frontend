import React from 'react';
import MarkDown from 'react-markdown';

import { Box, Flex, Image, SlideFade } from '@chakra-ui/react';
import { Message } from '@/services/chat';
import { getRelativeTimeFromTimestamp } from '@/utils/lib';

import robot from '@/assets/dan-robot_blue.png';

interface Props {
    message: Message;
}

const BotMessage: React.FC<Props> = ({ message }) => {
    return ( 
        <SlideFade in>
            <Flex className='max-w-xl mb-10' flexDirection='row' alignItems='start' gap={5} ml={10}>
                <Box className='w-12 h-12 rounded-full bg-white flex justify-center items-center'>
                    <Image src={robot} alt='RusselSmith' className='w-9 h-9 object-contain'/>
                </Box>
                <Box className='flex-1'>
                    <Box className="bg-white rounded-lg p-3 text-sm text-gray-600">
                        <MarkDown>
                            {message.content[0].text.value}
                        </MarkDown>
                    </Box>
                    <Box className="text-xs text-gray-600 mt-4 text-left">DAN - {getRelativeTimeFromTimestamp(message.created_at)}</Box>
                </Box>
            </Flex>
        </SlideFade>
     );
};
 
export default BotMessage;