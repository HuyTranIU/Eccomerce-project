import React from 'react'
import "./MyOrders.css"
import MetaData from './../layout/MetaData';
import Loader from './../layout/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import { clearErrors, myOrders } from './../../actions/orderAction';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import LaunchIcon from '@material-ui/icons/Launch';

function MyOrders() {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { user } = useSelector(state => state.user)
    const { loading, error, orders } = useSelector(state => state.myOrders)

    const columns = [
        {
            field: "id",
            header: "Order ID",
            minWidth: 300,
            flex: 1
        },
        {
            field: "status",
            header: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor"
            }
        },
        {
            field: "itemsQty",
            header: "Items Qty",
            minWidth: 150,
            flex: 0.3,
            type: "number"
        },
        {
            field: "amount",
            header: "Amount",
            type: "number",
            minWidth: 150,
            flex: 0.5
        },
        {
            field: "action",
            flex: 0.3,
            headerName: "Action",
            type: "number",
            minWidth: 150,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </Link>
                )
            }
        }

    ]

    const rows = []

    orders && orders.forEach((item, index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice
        })
    });

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(myOrders())
    }, [dispatch, error, alert])

    return (
        <>
            <MetaData title={`${user.name} - Orders`} />
            {
                loading ? (<Loader />) : (

                    <div className="myOrdersPage">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className='myOrdersTable'
                            autoHeight
                        />

                        <Typography id='myOrdersHeading'>{user.name}'s' Orders</Typography>
                    </div>
                )
            }
        </>
    )
}

export default MyOrders