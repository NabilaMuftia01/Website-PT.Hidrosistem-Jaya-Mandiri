import React, { Fragment } from 'react'
import { logout } from '../../../actions/authAction'

import { useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { AiOutlineSetting, AiOutlinePoweroff } from 'react-icons/ai'
import Link from '@mui/material/Link'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const SidebarSupport = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Akun Telah Keluar')
    }

    return (
        <Fragment>
            <div className="support">
                <List>
                    <Link href="/Setting" underline="none">
                        <ListItemButton
                            sx={{
                                color: '#231f20',
                                textDecoration: 'none',
                            }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: '0px',
                                    mr: '10px',
                                }}
                            >
                                <AiOutlineSetting />
                            </ListItemIcon>
                            <ListItemText
                                primary="Setting" />
                        </ListItemButton>
                    </Link>
                    <Link href="/Login" underline="none" onClick={logoutHandler}>
                        <ListItemButton
                            sx={{
                                color: '#231f20',
                                textDecoration: 'none',
                            }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: '0px',
                                    mr: '10px',
                                }}
                            >
                                <AiOutlinePoweroff />
                            </ListItemIcon>
                            <ListItemText
                                primary="Logout" />
                        </ListItemButton>
                    </Link>
                </List>
            </div>
        </Fragment>
    )
}

export default SidebarSupport
