import React, { useContext } from 'react'
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material'

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { UIContext } from '../../context/ui/UIContext'
import NextLink from 'next/link'

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
                    <NextLink href={'/'}
                        style={{ color: 'white', textDecoration: 'none'}}
                    >
                        <Typography variant='h6'>Open Jira</Typography>
                    </NextLink>
                </Toolbar>
            </AppBar>
        </>
    )
}