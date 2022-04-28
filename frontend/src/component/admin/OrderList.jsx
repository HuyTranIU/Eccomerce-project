import React from 'react'
import "./ProductList.css"
import MetaData from './../layout/MetaData';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { deleteOrder, getAllOrder } from '../../actions/orderAction';
import { clearErrors } from './../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';

function OrderList() {
    const dispatch = useDispatch()
    const { error, orders } = useSelector(state => state.allOrders)
    const alert = useAlert()
    const navigate = useNavigate()
    const { error: deleteError, isDeleted } = useSelector(state => state.order)

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success("Order Deleted Successfully")
            navigate("/admin/orders")
            dispatch({ type: DELETE_ORDER_RESET })
        }

        dispatch(getAllOrder())
    }, [error, dispatch, alert, deleteError, isDeleted, navigate])

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 300,
            flex: 1
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor"
            }
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            minWidth: 150,
            flex: 0.4,
            type: "number"
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 150,
            flex: 0.5
        },
        {
            field: "action",
            headerName: "Action",
            minWidth: 150,
            type: "number",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </>
                )
            }
        },
    ]

    const rows = []

    orders && orders.forEach((item) => {
        rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
        })
    })

    return (
        <>
            <MetaData title="ALL ORDERS - ADMIN" />
            <div className="dashboard">
                <Sidebar />

                <div className="productListContainer">
                    <h1 id="productListHeading">All Products</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='productListTable'
                        autoHeight
                    />
                </div>
            </div>
        </>
    )
}

export default OrderList