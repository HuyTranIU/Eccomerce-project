import React, { useState } from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './Header.css'
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/userAction';

function UserOptions({ user }) {

    const [open, setOpen] = useState(false)
    let navigate = useNavigate()
    const alert = useAlert()

    const dispatch = useDispatch()

    const options = [
        {
            icon: <ListAltIcon />,
            name: "Orders",
            func: orders
        },
        {
            icon: <PersonIcon />,
            name: "Orders",
            func: account
        },
        {
            icon: <ExitToAppIcon />,
            name: "Orders",
            func: logoutUser
        },

    ]

    if (user.role === 'admin') {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        })
    }

    function dashboard() {
        navigate("/dashboard")
    }

    function orders() {
        navigate("/orders")
    }

    function account() {
        navigate("/account")
    }

    function logoutUser() {
        dispatch(logout())
        alert.success("Logout Successfully")
    }

    return (
        <>
            <SpeedDial
                ariaLabel="SpeedDial example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                direction="down"
                open={open}
                icon={
                    <img
                        className='speedDialIcon'
                        src={user.avatar.url ? user.avatar.url : "Profile.png"}
                        alt='Profile'
                    />
                }
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                    />
                ))}
            </SpeedDial>
        </>
    )
}

export default UserOptions