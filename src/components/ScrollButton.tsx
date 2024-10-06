import React from 'react';

import { Box, IconButton } from '@chakra-ui/react';
import { BsArrowDown } from 'react-icons/bs';
import { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';

const ScrollButton: React.FC = () => {
    const scrollToBottom = useScrollToBottom();
    const sticky = useSticky();

    if (sticky[0]) return null;

    return ( 
        <Box className='absolute right-3 bottom-0 z-50'>
            <IconButton
                aria-label='Scroll to bottom'
                icon={<BsArrowDown color='black' />}
                bg='white'
                size='md'
                isRound
                onClick={() => scrollToBottom()}
                borderWidth={1}
                borderColor='gray.100'
                className='z-50'
            />
        </Box>
    );
}
 
export default ScrollButton;