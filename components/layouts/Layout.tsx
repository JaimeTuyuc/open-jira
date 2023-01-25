import React, { FC } from 'react'
import { Box } from '@mui/material'
import Head from 'next/head'
import { NavBar, SideBar } from '../ui'

interface Props {
    title?: string
    children: React.ReactNode
}

export const Layout: FC<Props> = ({title = 'Open Jira', children}) => {

    return (
        <>
            <Box sx={{
                flexGrow: 1
            }}>
                <Head>
                    <title>{title}</title>
                </Head>
                <NavBar />

                <SideBar />
                <Box
                    sx={{padding: '10px 20px'}}
                >{children}</Box>
            </Box>
        </>
    )
}
