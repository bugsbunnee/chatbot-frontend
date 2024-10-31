import React, { useCallback } from "react";
import classNames from "classnames";

import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { PiArrowUp } from "react-icons/pi";
import { BiChat } from "react-icons/bi";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageData, messageSchema } from "@/utils/schema";

import Error from "./Error";

interface Props {
    onSubmitMessage: (message: MessageData) => void;
    isLoading: boolean;
}

const MessageInput: React.FC<Props> = ({ isLoading, onSubmitMessage }) => {
    const { formState, register, handleSubmit, reset } = useForm<MessageData>({ resolver: zodResolver(messageSchema), mode: 'all' });

    const onSendMesssage = useCallback((data: MessageData) => {
        onSubmitMessage({ message: data.message });
        reset();
    }, [reset]);

    return ( 
        <form onSubmit={handleSubmit(onSendMesssage)}>
            {formState.errors.message && <Error error={formState.errors.message.message as string} />}
        
            <InputGroup 
                variant='filled'
                rounded={500} 
                size='lg'
                className={classNames({
                    "bg-white border border-gray-200": !formState.errors.message,
                    "bg-red-50 border border-red-200": !!formState.errors.message?.message
                })}
            >
                <InputLeftElement w='3.5rem' color='gray.500'>
                    <BiChat />
                </InputLeftElement>
                <Input
                    placeholder='Ask me anything'
                    _placeholder={{ fontSize: 'sm' }} 
                    color='black' 
                    rounded={500} 
                    fontSize='small'
                    className="outline-none focus:border focus:border-red-100"
                    {...register('message')}
                />
                <InputRightElement w='4rem'>
                    <Button bg='blackAlpha.900' color='whiteAlpha.900' rounded={500} isDisabled={!formState.isValid || isLoading} size='sm' type='submit' isLoading={formState.isSubmitting || isLoading}>
                        <PiArrowUp color='white' />
                    </Button>
                </InputRightElement>
            </InputGroup>
        </form>
    );
};
 
export default MessageInput;