import React, { useContext } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox','Starred','Send Email', 'Draft']

export const SideBar = () => {

    const { sideMenuOpen, closeSideBar } = useContext(UIContext);

    return (
        <>
            <Drawer
                anchor='left'
                open={sideMenuOpen}
                onClose={closeSideBar}
            >
                <Box sx={{ width: 250 }}>

                    <Box
                        sx={{ padding: '5px 10px'}}
                    >
                        <Typography variant='h4'>Menu</Typography>

                        <List>
                            {
                                menuItems.map((text, idx) => {
                                    return (
                                        <ListItem button key={text}>
                                            <ListItemIcon >
                                                { idx % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItem>
                                    )
                                })
                            }
                        </List>

                        <Divider />
                    </Box>
                </Box>
            </Drawer>
        </>
    )
}