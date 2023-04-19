import React, { useEffect, useState } from 'react'
import instance from '../axios';
import { ChatState } from '../context/ChatProvider';
import Sidedrawer from '../components/miscellaneous/Sidedrawer';
import Chatbox from '../components/Chatbox';
import Mychats from '../components/Mychats';
import { Box } from '@chakra-ui/react';

function Chatpage()
{
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div style={{ width: '100%' }}>
            {user && <Sidedrawer />}
            <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
                {user && <Mychats fetchAgain={fetchAgain} />}
                {user && (
                    <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                )}
            </Box>
        </div>
    )
}

export default Chatpage