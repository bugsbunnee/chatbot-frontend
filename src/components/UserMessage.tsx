import React from 'react';

import { Box, SlideFade, Stack, Text } from '@chakra-ui/react';
import { Message } from '@/services/chat';
import { getRelativeTimeFromTimestamp } from '@/utils/lib';

interface Props {
    message: Message;
}

const UserMessage: React.FC<Props> = ({ message }) => {
    return ( 
        <SlideFade in>
            <Stack className='mb-10' justifyContent='end' alignItems='end' mb={3} mr={10}>
                <Box className="bg-gray-100 rounded-lg p-3 text-sm max-w-xl text-gray-600">
                    {message.content?.[0]?.text?.value}
                </Box>
                <Text className="text-xs text-gray-600 mt-2 text-left">You - {getRelativeTimeFromTimestamp(message.created_at)}</Text>
            </Stack>
        </SlideFade>
     );
};
 
export default UserMessage;