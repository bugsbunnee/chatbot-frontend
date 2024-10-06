import React from 'react';

import { Box, Flex, Image, SlideFade } from '@chakra-ui/react';
import { BiDotsHorizontal } from 'react-icons/bi';

import logo from '@/assets/logo.png';

interface Props {
    isVisible: boolean;
}

const BotTyping: React.FC<Props> = ({ isVisible }) => {
    if (!isVisible) return null;

    return ( 
        <SlideFade in>
            <Flex className='max-w-xl my-10' flexDirection='row' alignItems='start' gap={5}>
                <Box className='w-12 h-12 rounded-full bg-white flex justify-center items-center'>
                    <Image src={logo} alt='RusselSmith' className='w-9 h-9 object-contain'/>
                </Box>
                <Box className="bg-white rounded-lg p-3 text-sm text-gray-600">
                    <BiDotsHorizontal />
                </Box>
            </Flex>
        </SlideFade>
     );
};
 
export default BotTyping;