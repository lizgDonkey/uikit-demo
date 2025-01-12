import React, { useState } from 'react'
import './index.css'

import { Menu, MenuItem, Typography } from '@material-ui/core';

import AddFriendDialog from './addFriend'
import SettingsDialog from './settings'
export default function Header() {

    const [addEl, setAddEl] = useState(null)

    const [showAddFriend, setShowAddFriend] = useState(false)
    const [showUserSetting, setShowUserSetting] = useState(false)

    const handleClickMore = (e) => {
        setAddEl(e.currentTarget)
    }

    function handleAddFriendDialogClose() {
        setShowAddFriend(false)
    }

    function addFriend() {
        setShowAddFriend(true)
    }

    return (
        <>
            <div className='chatlist-header'>
                <div className='chatlist-header-avatar'></div>
                <div className='chatlist-header-title'>AgoraChat</div>
                <div className='chatlist-header-more' onClick={handleClickMore}>...</div>

                <Menu
                    id="simple-menu"
                    anchorEl={addEl}
                    keepMounted
                    open={Boolean(addEl)}
                    onClose={() => setAddEl(null)}
                >

                    <MenuItem >
                        <Typography variant="inherit" noWrap>
                            New Chat
                    </Typography>
                    </MenuItem>
                    <MenuItem >
                        <Typography variant="inherit" noWrap>
                            Add a Group Chat
                    </Typography>
                    </MenuItem>
                    <MenuItem onClick={addFriend}>
                        <Typography variant="inherit" noWrap>
                            Add Contact
                    </Typography>
                    </MenuItem>
                    <MenuItem >
                        <Typography variant="inherit" noWrap>
                            Requests
                    </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => setShowUserSetting(true)}>
                        <Typography variant="inherit" noWrap>
                            Settings
                    </Typography>
                    </MenuItem>
                    <MenuItem >
                        <Typography variant="inherit" noWrap>
                            Log out
                    </Typography>
                    </MenuItem>
                </Menu>


            </div>
            <AddFriendDialog
                open={showAddFriend}
                onClose={handleAddFriendDialogClose} />

            <SettingsDialog
                open={showUserSetting}
                onClose={() => setShowUserSetting(false)}
            ></SettingsDialog>
        </>
    )
}