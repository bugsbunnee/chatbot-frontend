import React from 'react';

import { Box, Flex, HStack, Image, Skeleton, SlideFade } from '@chakra-ui/react';

import logo from '@/assets/logo.png';
import { AnimatePresence } from 'framer-motion';

interface Props {
    isVisible: boolean;
}

const BotTyping: React.FC<Props> = ({ isVisible }) => {
    if (!isVisible) return null;

    return ( 
        <AnimatePresence>
            <SlideFade in>
                <Flex className='max-w-xl my-10 animation-pulse' flexDirection='row' alignItems='start' gap={5}>
                    <Box className='w-12 h-12 rounded-full bg-white flex justify-center items-center'>
                        <Image src={logo} alt='RusselSmith' className='w-9 h-9 object-contain'/>
                    </Box>
                    <Box className="bg-white rounded-lg p-3 text-sm text-gray-600">
                        <HStack gap={1} alignItems='center' justifyContent='center'>
                            <Skeleton className='w-2 h-2' startColor='pink.100' endColor='blue.100' borderRadius={100} />
                            <Skeleton className='w-2 h-2' startColor='pink.100' endColor='blue.100' borderRadius={100} />
                            <Skeleton className='w-2 h-2' startColor='pink.100' endColor='blue.100' borderRadius={100} />
                        </HStack>
                    </Box>
                </Flex>
            </SlideFade>
        </AnimatePresence>
     );
};
 
export default BotTyping;