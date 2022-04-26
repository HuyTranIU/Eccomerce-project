import Backdrop from '@material-ui/core/Backdrop';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonIcon from '@material-ui/icons/Person';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/userAction';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Header.css';

function UserOptions({ user }) {

    const [open, setOpen] = useState(false)
    let navigate = useNavigate()
    const alert = useAlert()
    const { cartItems } = useSelector(state => state.cart)

    const dispatch = useDispatch()

    const options = [
        {
            icon: <ListAltIcon />,
            name: "Orders",
            func: orders
        },
        {
            icon: <PersonIcon />,
            name: "Account",
            func: account
        },
        {
            icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />,
            name: `Cart (${cartItems.length})`,
            func: cart
        },
        {
            icon: <ExitToAppIcon />,
            name: "Logout",
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
        navigate("/admin/dashboard", { replace: true })
    }

    function orders() {
        navigate("/orders", { replace: true })
    }

    function account() {
        navigate("/account", { replace: true })
    }
    function cart() {
        navigate("/cart", { replace: true })
    }

    function logoutUser() {
        dispatch(logout())
        alert.success("Logout Successfully")
    }

    return (
        <>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                className='speedDial'
                ariaLabel="SpeedDial example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                direction="down"
                style={{ zIndex: "11" }}
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