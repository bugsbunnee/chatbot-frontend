import { useCallback, useEffect, useState } from "react";
import { ChatStreamResponse, getChatMessages, Message } from "../services/chat";

import dayjs from "dayjs";
import axios from "axios";

const QUERY_COMPLETE_STATES = ['completed', 'failed', 'expired'];

const useChatStream = (refetchStream: boolean) => {
    const [data, setData] = useState<ChatStreamResponse>({ status: 'in_progress', list: [], lastChat: null });
    const [isFetching, setFetching] = useState(false);
    const [error, setError] = useState<Error>();

    const fetchChats = async () => {
        setFetching(true);

        try {
            const response = await getChatMessages();
            
            if (QUERY_COMPLETE_STATES.includes(response.data.status)) {
                setData(response.data);
                setFetching(false);
            } else {
                setData(previous => ({
                    status: response.data.status + Date.now(),
                    list: previous.list,
                    lastChat: previous.lastChat
                }));
            }

        } catch (error) {
            setFetching(false);

            if (axios.isAxiosError(error) && error.status === 404) return;

            setError(error as Error);
        }
    };

    const onAddNewUserMessage = useCallback((message: string) => {
        const createdAt = dayjs().unix();

        const newMessage: Message = {
            id: createdAt.toString(),
            created_at: createdAt,
            role: 'user',
            content: [ { text: { value: message } }],
        };

        setData((previous) => ({ 
            status: previous.status,
            lastChat: previous.lastChat,
            list: [...previous.list, newMessage],
        }))
    }, []);

    useEffect(() => {
        if (!QUERY_COMPLETE_STATES.includes(data.status)) {
            console.log('status not included', data.status);
            fetchChats();
        }
    }, [data.status]);

    useEffect(() => {
        if (refetchStream) {
            fetchChats();
        }
    }, [refetchStream]);

    return { isFetching, data, error, onAddNewUserMessage };
};
 
export default useChatStream;