import React, { useState, useEffect, useRef } from 'react'
import './index.css'

import { Menu, MenuItem, Typography, Badge, Avatar } from '@material-ui/core';
import AddFriendDialog from './addFriend'
import ChatGroupDialog from './chatGroup'
import SettingsDialog from './settings'
import WebIM, { initIMSDK } from '../../utils/WebIM'
import initListen from '../../utils/WebIMListen'
import loginChat from '../../api/loginChat/index.js'
import ContactDialog from './contactList'
import RequestDialog from './request'

import newChatIcon from '../../assets/newchat@2x.png'
import groupChatIcon from '../../assets/groupchat@2x.png'
import addContactIcon from '../../assets/addcontact@2x.png'
import requestsIcon from '../../assets/requests@2x.png'
import settingsIcon from '../../assets/settings@2x.png'
import logoutIcon from '../../assets/logout@2x.png'

import avater1 from '../../assets/avatar1.png'
import avater2 from '../../assets/avatar2.png'
import avater3 from '../../assets/avatar3.png'
import store from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setMyUserInfo } from '../../redux/actions'
import { logout } from '../../api/loginChat'

import UserInfoPopover from './userInfo'

const AVATARS = [avater1, avater2, avater3]
export default function Header() {
    const dispatch = useDispatch()
    const [addEl, setAddEl] = useState(null)

    const [showAddFriend, setShowAddFriend] = useState(false)
    const [showChatGroup, setShowChatGroup] = useState(false);
    const [showUserSetting, setShowUserSetting] = useState(false)
    const [showContact, setShowContact] = useState(false)
    const [showRequest, setShowRequest] = useState(false)

    // userInfo
    const [showUserInfoPopover, setShowUserInfoPopover] = useState(false)
    const [userInfoaddEl, setUserInfoAddEl] = useState(null)

    const myUserInfo = useSelector(state => state?.myUserInfo)
    const requests = useSelector(state => state?.requests) || {}
    let unDealRequestsNum = countNum(requests.group) + countNum(requests.contact)
    function countNum(arr) {
        if (!Array.isArray(arr)) return 0
        return arr.reduce((prev, curr) => {
            console.log(prev, curr)
            if (curr.status === 'pedding') {
                prev++
                return prev
            }
            return prev
        }, 0)
    }
    let avatarUrl = null
    if (myUserInfo && myUserInfo.avatarIndex !== null) {
        avatarUrl = AVATARS[myUserInfo.avatarIndex]
    }
    useEffect(() => {
        // initIMSDK();
        // initListen();
        setAvatar()
    }, [])

    // useEffect(() => {
    //     if (WebIM.conn.logOut) {
    //         loginChat()
    //     }
    // }, [WebIM])

    function setAvatar() {
        let avatarIndex = localStorage.getItem('avatarIndex')
        if (avatarIndex !== undefined) {
            dispatch(setMyUserInfo({
                ...myUserInfo,
                avatarIndex: avatarIndex
            }))
        }
    }

    const handleClickMore = (e) => {
        setAddEl(e.currentTarget)
    }

    function handleAddFriendDialogClose() {
        setShowAddFriend(false)
    }

    function addFriend() {
        setShowAddFriend(true)
    }

    function createGroupDialog() {
        setShowChatGroup(true);
    }
    function handleCreateGroupDialogClose() {
        setShowChatGroup(false);
    }

    // TODO userInfo 
    const handleUserInfo = (e) => {
        setUserInfoAddEl(e.currentTarget)
        setShowUserInfoPopover(true);
    }
    // 关闭群组创建选择 member
    const handleUserInfoClose = () => {
        setShowUserInfoPopover(false);
    }

    return (
        <>
            <div className='chatlist-header'>
                {/* <div className='chatlist-header-avatar'></div> */}
                <Avatar style={{ width: 40, height: 40 }} src={avatarUrl} onClick={handleUserInfo}></Avatar>
                <div className='chatlist-header-title'>AgoraChat</div>
                <div className='chatlist-header-more' onClick={handleClickMore}>...</div>

                <Menu
                    id="simple-menu"
                    anchorEl={addEl}
                    keepMounted
                    open={Boolean(addEl)}
                    onClose={() => setAddEl(null)}
                >
                    <MenuItem onClick={() => setShowContact(true)}>
                        <Typography variant="inherit" noWrap style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={newChatIcon} alt='new chat' style={{ width: '30px' }} />
                            New Chat
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={createGroupDialog}>
                        <Typography variant="inherit" noWrap style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={groupChatIcon} alt='new chat' style={{ width: '30px' }} />
                            Add a Group Chat
                    </Typography>
                    </MenuItem>
                    <MenuItem onClick={addFriend}>
                        <Typography variant="inherit" noWrap style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={addContactIcon} alt='new chat' style={{ width: '30px' }} />
                            Add Contact
                    </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => setShowRequest(true)} style={{ justifyContent: 'space-between' }}>
                        <Typography variant="inherit" noWrap style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={requestsIcon} alt='new chat' style={{ width: '30px' }} />
                            Requests
                        </Typography>
                        {unDealRequestsNum > 0 ? <p style={{ width: '12px', height: '12px', background: '#FF14CC', borderRadius: '6px' }}></p> : null}

                    </MenuItem>
                    <MenuItem onClick={() => setShowUserSetting(true)}>
                        <Typography variant="inherit" noWrap style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={settingsIcon} alt='new chat' style={{ width: '30px' }} />
                            Settings
                    </Typography>
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <Typography variant="inherit" noWrap style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={logoutIcon} alt='new chat' style={{ width: '30px' }} />
                            Log out
                    </Typography>
                    </MenuItem>
                </Menu>

            </div>
            <AddFriendDialog
                open={showAddFriend}
                onClose={handleAddFriendDialogClose} />

            <ChatGroupDialog
                open={showChatGroup}
                onClose={handleCreateGroupDialogClose}
            />

            <SettingsDialog
                open={showUserSetting}
                onClose={() => setShowUserSetting(false)}
            ></SettingsDialog>

            <ContactDialog
                open={showContact}
                onClose={() => setShowContact(false)}
            >
            </ContactDialog>

            <RequestDialog
                open={showRequest}
                onClose={() => setShowRequest(false)}
            >
            </RequestDialog>

            <UserInfoPopover 
                open={showUserInfoPopover}
                anchorEl={userInfoaddEl}
                onClose={handleUserInfoClose}
            />
        </>
    )
}