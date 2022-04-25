import { Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import "./OrderSuccess.css"

function OrderSuccess() {
    return (
        <div className='orderSuccess'>
            <CheckCircleIcon />
            <Typography>Your Order has been Placed successfully</Typography>
            <Link to="/orders" >View Order</Link>
        </div>
    )
}

export default OrderSuccess