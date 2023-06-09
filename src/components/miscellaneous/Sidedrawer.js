import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from '../../context/ChatProvider';
import Profilemodal from './Profilemodal';
import { useHistory } from 'react-router-dom'
import instance from '../../axios';
import Chatloading from '../Chatloading';
import UserListItem from '../useravatar/UserListItem';
import { getSender } from '../../config/Chatlogics';
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

function Sidedrawer()
{
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const { user, setSelectedChat, chats, setChats, notification, setNotification, reset } = ChatState();
    const history = useHistory();
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const logoutHandler = () =>
    {
        localStorage.removeItem("userInfo");
        reset();
        history.push("/");
    };

    const accessChat = async (userId) =>
    {

        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await instance.post(`/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) {
                setChats([data, ...chats]);
            }
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }

    const handleSearch = async () =>
    {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await instance.get(`/api/user?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }

    return (
        <>
            <Box
                d="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px"
            >
                <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                    <Button variant="ghost" onClick={onOpen}>
                        <i className="fas fa-search"></i>
                        <Text d={{ base: "none", md: "flex" }} px={4}>
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans">
                    Chat-App
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <NotificationBadge
                                count={notification.length}
                                effect={Effect.SCALE}
                            />
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                        <MenuList pl={2}>
                            {!notification.length && 'no new messages'}
                            {notification.map(notif => (
                                <MenuItem key={notif._id} onClick={() =>
                                {
                                    setSelectedChat(notif.chat);
                                    setNotification(notification.filter((n) => n !== notif));
                                }}>
                                    {notif.chat.isGroupChat
                                        ? `New Message in ${notif.chat.chatName}`
                                        : `New Message from ${getSender(user, notif.chat.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton p={1} as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.name}
                                src={user.pic}
                            />
                        </MenuButton>
                        <MenuList>
                            <Profilemodal user={user}>
                                <MenuItem>My Profile</MenuItem>{" "}
                            </Profilemodal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
            <Drawer
                placement='left'
                isOpen={isOpen}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottom='1px'>Search Users</DrawerHeader>
                    <DrawerBody>
                        <Box d="flex" pb={2}>
                            <Input
                                placeholder="Search by name or email"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}>Go</Button>
                        </Box>
                        {
                            loading ? (<Chatloading />) :
                                (
                                    searchResult?.map((user) => (
                                        <UserListItem
                                            key={user._id}
                                            user={user}
                                            handleFunction={() => accessChat(user._id)}
                                        />
                                    ))
                                )
                        }
                        {loadingChat && <Spinner ml='auto' d='flex' />}
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Sidedrawer