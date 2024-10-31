import React from 'react';
import Lottie from 'lottie-react';

import { Box, Flex, HStack, Image, Skeleton, SlideFade } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';

import robot from '@/assets/dan-robot_blue.png';
import thinking from '@/assets/thinking.json';

interface Props {
    isVisible: boolean;
}

const USE_LOTTIE = true;

const BotTyping: React.FC<Props> = ({ isVisible }) => {
    if (!isVisible) return null;

    const renderLottie = () => {
        return (
            <Lottie 
                animationData={thinking} 
                loop={true} 
                width={50}
                height={50}
                className='w-12 h-12'
            />
        )
    };

    const renderTyping = () => {
        return (
            <HStack gap={1} alignItems='center' justifyContent='center'>
                <Skeleton className='w-2 h-2' startColor='pink.100' endColor='whiteAlpha.800' borderRadius={100} />
                <Skeleton className='w-2 h-2' startColor='pink.100' endColor='whiteAlpha.800' borderRadius={100} />
                <Skeleton className='w-2 h-2' startColor='pink.100' endColor='whiteAlpha.800' borderRadius={100} />
            </HStack>
        )
    };

    return ( 
        <AnimatePresence>
            <SlideFade in>
                <Flex className='max-w-xl my-10' flexDirection='row' alignItems='start' gap={5} ml={10}>
                    <Box className='w-12 h-12 rounded-full bg-white flex justify-center items-center'>
                        <Image src={robot} alt='RusselSmith' className='w-9 h-9 object-contain'/>
                    </Box>
                    <Box className="bg-[#eaf5ff] rounded-lg p-1 text-sm text-gray-600 animate-pulse">
                        {USE_LOTTIE ? renderLottie() : renderTyping()}
                    </Box>
                </Flex>
            </SlideFade>
        </AnimatePresence>
     );
};
 
export default BotTyping;