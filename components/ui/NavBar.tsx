import React, { useContext } from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../context/ui/UIContext';

export const NavBar = () => {

    const { openSideBar } = useContext(UIContext);

    return (
        <>
            <AppBar
                position='sticky'
            >
                <Toolbar>
                    <IconButton
                        onClick={openSideBar}
                        size='large'
                        edge='start'
                    >
                        <MenuOutlinedIcon />
                    </IconButton>
                    <Typography variant='h6'>Open Jira</Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}