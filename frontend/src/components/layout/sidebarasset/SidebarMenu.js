import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import Link from '@mui/material/Link'
import { BsInboxes, BsCartDash, BsCartPlus } from 'react-icons/bs'
import { AiOutlineDashboard } from 'react-icons/ai'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { FiUser, FiUsers, FiPlusCircle } from 'react-icons/fi'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

const SidebarMenu = () => {
    const [openbarang, setOpenBarang] = useState(false)
    const [openvendor, setOpenVendor] = useState(false)
    const [opencustomer, setOpenCustomer] = useState(false)
    const [openuser, setOpenUser] = useState(false)

    const handleClickBarang = () => {
        setOpenBarang(!openbarang)
    }

    const handleClickVendor = () => {
        setOpenVendor(!openvendor)
    }

    const handleClickCustomer = () => {
        setOpenCustomer(!opencustomer)
    }

    const handleClickUser = () => {
        setOpenUser(!openuser)
    }

    const { user, isAuthenticated, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            <div className="menu">
                <List>
                    <Link href="/" underline="none">
                        <ListItemButton
                            sx={{
                                color: '#231f20',
                                textDecoration: 'none',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: '0px',
                                    mr: '10px',
                                }}
                            >
                                < AiOutlineDashboard />
                            </ListItemIcon>
                            <ListItemText
                                sx={{
                                    m: 0,
                                    fontFamily: 'Poppins'
                                }}
                                primary="Dashboard" />
                        </ListItemButton>
                    </Link>
                    <ListItemButton
                        onClick={handleClickBarang}
                        sx={{
                            color: '#231f20',
                            textDecoration: 'none',
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: '0px',
                                mr: '10px',
                            }}
                        >
                            <BsInboxes />
                        </ListItemIcon>
                        <ListItemText
                            sx={{
                                m: 0,
                                fontFamily: 'Poppins'
                            }}
                            primary="Barang" />
                        {openbarang ? <MdExpandLess /> : <MdExpandMore />}
                    </ListItemButton>
                    <Collapse in={openbarang} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link href="/List-Barang" underline="none">
                                <ListItemButton
                                    sx={{
                                        color: '#231f20',
                                        textDecoration: 'none',
                                        pl: 4
                                    }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: '0px',
                                            mr: '10px',
                                        }}
                                    >
                                        <BsInboxes />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="List Barang" />
                                </ListItemButton>
                            </Link>
                            {
                                !loading && (!isAuthenticated || user.role !== "checker") && (
                                    <Link href="/List-Barang/Tambah" underline="none">
                                        <ListItemButton
                                            sx={{
                                                color: '#231f20',
                                                textDecoration: 'none',
                                                pl: 4
                                            }}>
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: '0px',
                                                    mr: '10px',
                                                }}
                                            >
                                                <FiPlusCircle />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Tambah Barang" />
                                        </ListItemButton>
                                    </Link>
                                )
                            }
                        </List>
                    </Collapse>
                    {/* Vendor */}
                    <ListItemButton
                        onClick={handleClickVendor}
                        sx={{
                            color: '#231f20',
                            textDecoration: 'none',
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: '0px',
                                mr: '10px',
                            }}
                        >
                            <FiUsers />
                        </ListItemIcon>
                        <ListItemText
                            sx={{
                                m: 0,
                                fontFamily: 'Poppins'
                            }}
                            primary="Vendor" />
                        {openvendor ? <MdExpandLess /> : <MdExpandMore />}
                    </ListItemButton>
                    <Collapse in={openvendor} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link href="/Vendor" underline="none">
                                <ListItemButton
                                    sx={{
                                        color: '#231f20',
                                        textDecoration: 'none',
                                        pl: 4
                                    }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: '0px',
                                            mr: '10px',
                                        }}
                                    >
                                        <FiUsers />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="List Vendor" />
                                </ListItemButton>
                            </Link>
                            {
                                !loading && (!isAuthenticated || user.role !== "checker") && (
                                    <Link href="/Vendor/Tambah" underline="none">
                                        <ListItemButton
                                            sx={{
                                                color: '#231f20',
                                                textDecoration: 'none',
                                                pl: 4
                                            }}>
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: '0px',
                                                    mr: '10px',
                                                }}
                                            >
                                                <FiPlusCircle />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Tambah Vendor" />
                                        </ListItemButton>
                                    </Link>
                                )
                            }
                        </List>
                    </Collapse>
                    {/* CUSTOMER */}
                    <ListItemButton
                        onClick={handleClickCustomer}
                        sx={{
                            color: '#231f20',
                            textDecoration: 'none',
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: '0px',
                                mr: '10px',
                            }}
                        >
                            <FiUser />
                        </ListItemIcon>
                        <ListItemText
                            sx={{
                                m: 0,
                                fontFamily: 'Poppins'
                            }}
                            primary="Customer" />
                        {opencustomer ? <MdExpandLess /> : <MdExpandMore />}
                    </ListItemButton>
                    <Collapse in={opencustomer} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link href="/Customer" underline="none">
                                <ListItemButton
                                    sx={{
                                        color: '#231f20',
                                        textDecoration: 'none',
                                        pl: 4
                                    }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: '0px',
                                            mr: '10px',
                                        }}
                                    >
                                        <FiUser />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="List Customer" />
                                </ListItemButton>
                            </Link>
                            {
                                !loading && (!isAuthenticated || user.role !== "checker") && (
                                    <Link href="/Customer/Tambah" underline="none">
                                        <ListItemButton
                                            sx={{
                                                color: '#231f20',
                                                textDecoration: 'none',
                                                pl: 4
                                            }}>
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: '0px',
                                                    mr: '10px',
                                                }}
                                            >
                                                <FiPlusCircle />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Tambah Customer" />
                                        </ListItemButton>
                                    </Link>
                                )
                            }
                        </List>
                    </Collapse>
                    {/* User */}
                    {
                        !loading && (!isAuthenticated || (user.role !== "checker" && user.role !== "admin")) && (
                            <Fragment>
                                <ListItemButton
                                    onClick={handleClickUser}
                                    sx={{
                                        color: '#231f20',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: '0px',
                                            mr: '10px',
                                        }}
                                    >
                                        <FiUser />
                                    </ListItemIcon>
                                    <ListItemText
                                        sx={{
                                            m: 0,
                                            fontFamily: 'Poppins'
                                        }}
                                        primary="User" />
                                    {openuser ? <MdExpandLess /> : <MdExpandMore />}
                                </ListItemButton>
                                <Collapse in={openuser} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <Link href="/User" underline="none">
                                            <ListItemButton
                                                sx={{
                                                    color: '#231f20',
                                                    textDecoration: 'none',
                                                    pl: 4
                                                }}>
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: '0px',
                                                        mr: '10px',
                                                    }}
                                                >
                                                    <FiUser />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="List User" />
                                            </ListItemButton>
                                        </Link>
                                        {
                                            (user && user.role === 'superadmin') && (
                                                <Link href="/User/Tambah" underline="none">
                                                    <ListItemButton
                                                        sx={{
                                                            color: '#231f20',
                                                            textDecoration: 'none',
                                                            pl: 4
                                                        }}>
                                                        <ListItemIcon
                                                            sx={{
                                                                minWidth: '0px',
                                                                mr: '10px',
                                                            }}
                                                        >
                                                            <FiPlusCircle />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary="Tambah User" />
                                                    </ListItemButton>
                                                </Link>
                                            )
                                        }
                                    </List>
                                </Collapse>
                            </Fragment>
                        )
                    }

                    <Link href="/Penjualan" underline="none">
                        <ListItemButton
                            sx={{
                                color: '#231f20',
                                textDecoration: 'none',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: '0px',
                                    mr: '10px',
                                }}
                            >
                                < BsCartDash />
                            </ListItemIcon>
                            <ListItemText
                                sx={{
                                    m: 0,
                                    fontFamily: 'Poppins'
                                }}
                                primary="Penjualan" />
                        </ListItemButton>
                    </Link>
                    <Link href="/Pembelian" underline="none">
                        <ListItemButton
                            sx={{
                                color: '#231f20',
                                textDecoration: 'none',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: '0px',
                                    mr: '10px',
                                }}
                            >
                                < BsCartPlus />
                            </ListItemIcon>
                            <ListItemText
                                sx={{
                                    m: 0,
                                    fontFamily: 'Poppins'
                                }}
                                primary="Pembelian" />
                        </ListItemButton>
                    </Link>
                </List>
            </div>
        </Fragment >
    )
}

export default SidebarMenu