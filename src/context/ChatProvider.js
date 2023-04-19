import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
const ChatContext = React.createContext();

function ChatProvider({ children })
{
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [notification, setNotification] = useState([]);
    const history = useHistory();

    useEffect(() =>
    {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if (!userInfo) history.push("/");
        console.log(history);
    }, [history])

    const reset = () =>
    {
        setUser(null);
        setSelectedChat(null);
        setChats([]);
        setNotification([]);
    }

    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, notification, setNotification, reset }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () =>
{
    return useContext(ChatContext);
}

export default ChatProvider